import { ResponseError } from "../error/error.js";

const errorHandler = async (error, req, res, next) => {
    if (!error) {
        return next();
    }
    if (error instanceof ResponseError) {
        res.status(error.status).json({ errors: error.message }).end();
    } else {
        res.status(500).json({ errors: error.message }).end();
    }
};

export { errorHandler };
