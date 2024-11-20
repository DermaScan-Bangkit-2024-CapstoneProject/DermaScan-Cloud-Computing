import db from "../database/connect-db.js";
const userEmail = "user1@gmail.com";
const signup = async (req, res) => {
    try {
        if (userEmail === "user2@gmail.com") {
            res.status(400).send({
                message: "User already exists",
            });
            return;
        }
        const userData = await db.collection("users").doc(userEmail).set({
            name: "Udin Purwantio",
            age: 22,
            college: "UMB",
            email: userEmail,
            password: "123456",
        });

        res.status(201).send({
            message: "User Successfully Created",
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const dataLogin = {
            email: userEmail,
            password: "123456",
        };
        const usersCollection = db.collection("users");
        const usersDoc = await usersCollection.where("email", "=", dataLogin.email).get();
        if (usersDoc.empty) {
            res.status(404).json({
                message: "Data not found",
            });
            return;
        }
        res.status(200).json({
            message: "Login Successfully",
            token: "xyahs7236",
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const get = async (req, res) => {
    let userData = [];
    const usersCollection = db.collection("users");
    // const usersDoc = await usersCollection.get();
    const usersDoc = await usersCollection.where("email", "=", userEmail).get(); //query data user by college
    if (usersDoc.empty) {
        res.status(404).json({
            message: "Data not found",
        });
        return;
    } else {
        usersDoc.forEach((doc) => {
            userData.push(doc.data());
        });
        res.json({
            userData,
        });
    }
};

const update = async (req, res) => {
    let data = [];
    try {
        const usersCollection = db.collection("users");
        const userData = await usersCollection.doc(userEmail).update({
            age: 30,
        });
        const updatedData = await usersCollection.where("email", "=", userEmail).get();
        updatedData.forEach((doc) => {
            data.push(doc.data());
        });
        res.status(201).json({
            message: "User Successfully Updated",
            data: data.at(0),
        });
    } catch (error) {
        res.status(500).send({
            message: {
                error: error.message,
            },
        });
    }
};

const logout = (req, res) => {
    res.send("logout");
};

export default { update, login, signup, logout, get };
