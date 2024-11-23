import db from "../database/connect-db.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/error.js";
import { getUserData } from "../utils/get-user-data.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const signup = async (req) => {
    const user = req.body;

    const usersCollection = db.collection("users");
    const userDoc = await getUserData(user.email);
    if (userDoc.email === user.email) {
        throw new ResponseError(400, "User with this email already exist");
    }
    const userPassword = await bcrypt.hash(user.password, 10);

    const userData = {
        name: user.name,
        age: user.age,
        email: user.email,
        password: userPassword,
        phone: user.phone,
        city: user.city,
        country: user.country,
    };
    const result = await usersCollection.doc(user.email).set(userData);
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
    };
    const secret_key = process.env.JWT_SECRET_KEY;
    const expiresIn = 60 * 60 * 1;
    const authToken = crypto.randomBytes(50).toString("hex");
    const updatedData = await usersCollection.doc(dataLogin.email).update({
        authToken: authToken,
    });
    const token = jwt.sign({ email: result.email, authToken }, secret_key, { expiresIn: expiresIn });
    return {
        userData,
        token,
    };
};

export default { signup, login };
