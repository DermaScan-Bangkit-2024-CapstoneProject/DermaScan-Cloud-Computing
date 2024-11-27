import userService from "../service/user-service.js";
const signup = async (req, res, next) => {
    try {
        const result = await userService.signup(req);

        res.status(201).json({
            message: "User Successfully Created",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req);
        res.status(200).json({
            message: "Login Successfully",
            data: result.userData,
            token: result.token,
        });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res, next) => {
    try {
        const result = userService.logout(req);
        res.status(200).json({
            message: "User logged out successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const userData = await userService.getUser(req);

        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const result = await userService.updateUser(req);
        res.status(200).json({
            message: "User data updated successfully.",
            result,
        });
    } catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        const result = await userService.resetPassword(req);
        res.status(200).json({
            message: "Password Reset Successfully",
            result,
        });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const result = await userService.forgotPassword(req);
        res.status(200).json({
            message: "Password Reset Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export default { signup, login, logout, getUser, resetPassword, updateUser, forgotPassword };
