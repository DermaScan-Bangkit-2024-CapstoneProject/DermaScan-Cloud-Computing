import db from "../database/connect-db.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/error.js";
import { getUserData } from "../utils/get-user-data.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import admin from "firebase-admin";

const signup = async (req) => {
    const user = req.body;
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
    const dataLogin = req.body;
    if (!dataLogin || !dataLogin.email || !dataLogin.password) {
        throw new ResponseError(400, "Bad Request");
    }
    const usersCollection = db.collection("users");
    const usersDoc = await usersCollection.where("email", "=", dataLogin.email).get();
    if (usersDoc.empty) {
        throw new ResponseError(404, "User not found");
    }
    const password = await bcrypt.compare(dataLogin.password, usersDoc.docs.at(0).data().password);
    if (!password) {
        throw new ResponseError(401, "Unauthorized");
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

export default { signup, login, logout, getUser };
