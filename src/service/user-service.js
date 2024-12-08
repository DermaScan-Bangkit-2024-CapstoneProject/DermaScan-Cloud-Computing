import db from "../database/connect-db.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/error.js";
import { getUserData } from "../utils/get-user-by-email.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import admin from "firebase-admin";
import { getDataFromDb } from "../utils/get-data.js";
import { sendEmail } from "../utils/send-email.js";
import { userLoginValidation, userSignUpValidation, userUpdateValidation, validate } from "../utils/joi-validation.js";

const signup = async (req) => {
    const user = await validate(userSignUpValidation, req.body);
    if (!user) {
        throw new ResponseError(400, "Bad Request");
    }
    console.log(user);
    const userId = crypto.randomBytes(10).toString("hex");
    const usersCollection = db.collection("users");
    const userDoc = await getUserData(user.email);
    if (userDoc.email === user.email) {
        throw new ResponseError(400, "User with this email already exist");
    }
    const userPassword = await bcrypt.hash(user.password, 10);

    const userData = {
        user_id: userId,
        name: user.name,
        age: user.age,
        email: user.email,
        password: userPassword,
        phone: user.phone,
        city: user.city,
        country: user.country,
        auth_key: "null",
        created_at: admin.firestore.Timestamp.now(),
    };
    const result = await usersCollection.doc(userId).set(userData);
    return result;
};

const login = async (req) => {
    // const dataLogin = req.body;
    const dataLogin = await validate(userLoginValidation, req.body);
    if (!dataLogin) {
        throw new ResponseError(400, "Bad Request");
    }
    console.log(dataLogin);
    if (!dataLogin || !dataLogin.email || !dataLogin.password) {
        throw new ResponseError(400, "Bad Request");
    }
    const usersCollection = db.collection("users");
    const usersDoc = await usersCollection.where("email", "=", dataLogin.email).get();
    if (usersDoc.empty) {
        throw new ResponseError(404, "Your email or password is incorrect");
    }
    const password = await bcrypt.compare(dataLogin.password, usersDoc.docs.at(0).data().password);
    if (!password) {
        throw new ResponseError(401, "Your email or password is incorrect");
    }

    const result = usersDoc.docs.map((doc) => doc.data())[0];

    const userData = {
        name: result.name,
        age: result.age,
        email: result.email,
        phone: result.phone,
        city: result.city,
        country: result.country,
        user_id: result.user_id,
    };
    const secret_key = process.env.JWT_SECRET_KEY;
    // const expiresIn = 60 * 60 * 5;
    const expiresIn = "1d";
    const authkey = crypto.randomBytes(50).toString("hex");
    const updatedData = await usersCollection.doc(result.user_id).update({
        auth_key: authkey,
    });
    const token = jwt.sign({ user_id: result.user_id, authkey }, secret_key, { expiresIn: expiresIn });
    return {
        userData,
        token,
    };
};

const logout = async (req) => {
    const usersCollection = db.collection("users");
    const result = await usersCollection.doc(req.userData).update({
        auth_key: "null",
    });
    return result;
};

const getUser = async (req) => {
    const userId = req.params.user_id;
    if (userId !== req.userData) {
        throw new ResponseError(401, "Unauthorized");
    }
    const usersCollection = db.collection("users");
    const usersDoc = await usersCollection.where("user_id", "=", userId).get(); //query data user by email
    if (usersDoc.empty) {
        throw new ResponseError(404, "User not found");
    }
    const result = usersDoc.docs.map((doc) => doc.data())[0];
    const date = new Date(result.created_at._seconds * 1000).toLocaleString();
    const userData = {
        name: result.name,
        email: result.email,
        age: result.age,
        phone: result.phone,
        city: result.city,
        country: result.country,
        created_at: date,
    };
    return userData;
};

const resetPassword = async (req) => {
    const data = req.body;
    if (data.user_id !== req.userData) {
        throw new ResponseError(401, "Unauthorized");
    }
    const userData = await getDataFromDb("users", "user_id", data.user_id);
    if (data.user_id !== userData.user_id) {
        throw new ResponseError(404, "User not found");
    }
    const oldPassword = await bcrypt.compare(data.oldPassword, userData.password);
    if (!oldPassword) {
        throw new ResponseError(401, "Password is incorrect");
    }
    if (data.oldPassword === data.newPassword) {
        throw new ResponseError(400, "New password must be different from old password");
    }
    const newPassword = await bcrypt.hash(data.newPassword, 10);
    const result = await db.collection("users").doc(data.user_id).update({ password: newPassword });

    return result;
};

const updateUser = async (req) => {
    const data = await validate(userUpdateValidation, req.body);
    if (!data) {
        throw new ResponseError(400, "Bad Request");
    }
    console.log(data);
    if (req.params.user_id !== req.userData) {
        throw new ResponseError(401, "Unauthorized");
    }
    const userData = await getDataFromDb("users", "user_id", req.params.user_id);
    if (req.userData !== userData.user_id) {
        throw new ResponseError(404, "User not found");
    }
    const updatedData = {
        name: data.name ? data.name : userData.name,
        age: data.age ? data.age : userData.age,
        email: data.email ? data.email : userData.email,
        phone: data.phone ? data.phone : userData.phone,
        city: data.city ? data.city : userData.city,
        country: data.country ? data.country : userData.country,
    };
    const result = await db.collection("users").doc(userData.user_id).update(updatedData);
    return result;
};

const getTokenforgetPassword = async (req) => {
    const { email } = req.body;
    const getUser = await getDataFromDb("users", "email", email);
    if (!getUser) {
        throw new ResponseError(404, "User not found");
    }
    const token = crypto.randomBytes(3).toString("hex");
    const verificationEmailStatus = await sendEmail(email, "Reset Password - Email Verification", token);
    console.log(verificationEmailStatus);
    const data = {
        email: email,
        verification_code: token,
        created_at: admin.firestore.Timestamp.now(),
    };
    const result = await db.collection("email_verification").doc(email).set(data);
    return result;
};

const forgotPassword = async (req) => {
    const { email, password, token } = req.body;
    function isTokenExpired(time) {
        // Convert Firestore timestamp to JavaScript Date
        const tokenIssuedTime = new Date(time._seconds * 1000 + time._nanoseconds / 1e6);
        // Get current time
        const currentTime = new Date();
        // Calculate the time difference in minutes
        const timeDifferenceMinutes = (currentTime - tokenIssuedTime) / (1000 * 60);
        if (timeDifferenceMinutes > 10) {
            return true;
        }
        return false;
    }
    if (!email || !password || !token) {
        throw new ResponseError(400, "Bad Request");
    }
    const emailCollection = await getDataFromDb("email_verification", "email", email);
    if (!emailCollection) {
        throw new ResponseError(404, "User not found");
    }
    const time = emailCollection.created_at;
    if (isTokenExpired(time)) {
        throw new ResponseError(400, "Token expired");
    }
    const newPassword = await bcrypt.hash(password, 10);
    const userData = await getDataFromDb("users", "email", email);
    const userCollection = db.collection("users");
    const userDoc = await userCollection.doc(userData.user_id).update({
        password: newPassword,
    });
    await db.collection("email_verification").doc(email).delete();
    return userDoc;
};

export default { signup, login, logout, getUser, resetPassword, updateUser, forgotPassword, getTokenforgetPassword };
