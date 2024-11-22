import db from "../database/connect-db.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/error.js";
import { getUserData } from "../utils/get-user-data.js";

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

export default { signup };
