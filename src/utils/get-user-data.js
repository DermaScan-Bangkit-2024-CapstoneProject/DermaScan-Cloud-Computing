import db from "../database/connect-db.js";

const getUserData = async (email) => {
    const usersCollection = db.collection("users");
    const usersDoc = await usersCollection.where("email", "=", email).get();
    let userData = [];
    if (usersDoc.empty) {
        return {
            message: "Data not found",
        };
    } else {
        usersDoc.forEach((doc) => {
            userData.push(doc.data());
        });
    }

    return userData.at(0);
};

export { getUserData };
