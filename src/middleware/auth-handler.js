import jwt from "jsonwebtoken";
import { ResponseError } from "../error/error.js";
import db from "../database/connect-db.js";

const userAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new ResponseError(401, "Unauthorized"));
    }
    const token = authorization.split(" ")[1];
    const secret_key = process.env.JWT_SECRET_KEY;
    let jwtTokenDecode;
    try {
        jwtTokenDecode = jwt.verify(token, secret_key);
    } catch (error) {
        return next(new ResponseError(401, "Unauthorized"));
    }
    const usersCollection = db.collection("users");
    const usersDoc = await usersCollection.where("user_id", "=", jwtTokenDecode.user_id).get();
    if (usersDoc.empty) {
        return next(new ResponseError(401, "Unauthorized"));
    }
    if (usersDoc.docs.at(0).data().auth_key !== jwtTokenDecode.authkey) {
        return next(new ResponseError(401, "Unauthorized"));
    }
    req.userData = jwtTokenDecode.user_id;
    next();
};

export { userAuth };
