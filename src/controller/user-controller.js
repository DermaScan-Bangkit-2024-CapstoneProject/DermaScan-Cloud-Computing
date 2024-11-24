import db from "../database/connect-db.js";

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
    // let userData = [];
    // const usersCollection = db.collection("users");
    // const usersDoc = await usersCollection.where("email", "=", userEmail).get(); //query data user by college
    // if (usersDoc.empty) {
    //     res.status(404).json({
    //         message: "Data not found",
    //     });
    //     return;
    // } else {
    //     usersDoc.forEach((doc) => {
    //         userData.push(doc.data());
    //     });
    //     res.json({
    //         userData,
    //     });
    // }

    try {
        const userData = await userService.getUser(req);

        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    // let data = [];
    try {
        //     const usersCollection = db.collection("users");
        //     const userData = await usersCollection.doc(userEmail).update({
        //         age: 30,
        //     });
        //     const updatedData = await usersCollection.where("email", "=", userEmail).get();
        //     updatedData.forEach((doc) => {
        //         data.push(doc.data());
        //     });
        res.status(200).json({
            message: "User Successfully Updated",
            data: req.userData,
        });
    } catch (error) {
        next(error);
    }
};

export default { signup, login, logout, getUser, update };
