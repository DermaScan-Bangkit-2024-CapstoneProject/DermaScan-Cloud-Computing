import db from "../database/connect-db.js";

const register = (req, res) => {
    res.send("Register");
};

const get = async (req, res) => {
    let userData = [];
    const usersCollection = db.collection("users");
    // const usersDoc = await usersCollection.get();
    const usersDoc = await usersCollection.where("college", "=", "UNY").get(); //query data user by college
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
const login = (req, res) => {
    res.send("login");
};
const signup = async (req, res) => {
    try {
        const userEmail = "tes6@gmail.com";
        const userData = await db.collection("users").doc(userEmail).set({
            name: "Putra",
            age: 20,
            college: "UMB",
            email: userEmail,
        });

        res.status(200).send({
            message: "User Success Created",
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const logout = (req, res) => {
    res.send("logout");
};

export default { register, login, signup, logout, get };
