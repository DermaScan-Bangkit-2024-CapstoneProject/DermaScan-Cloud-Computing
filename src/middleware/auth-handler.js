import jwt from "jsonwebtoken";
import { ResponseError } from "../error/error.js";

const userAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new ResponseError(401, "Unauthorized");
    }

    const token = authorization.split(" ")[1];
    const secret_key = process.env.JWT_SECRET_KEY;

    try {
        const jwtTokenDecode = jwt.verify(token, secret_key);
        if (typeof jwtTokenDecode !== "string") {
            req.userData = jwtTokenDecode;
        }
    } catch (error) {
        throw new ResponseError(500, "Internal Server Error");
    }
    next();
};

export { userAuth };
