import db from "../database/connect-db.js";

const getDataFromDb = async (collectionName, field, value) => {
    if (!field || !value) {
        return db.collection(collectionName);
    } else {
        const articlesCollection = await db.collection(collectionName).where(field, "==", value).get();
        const result = articlesCollection.docs.map((doc) => doc.data());
        return result[0];
    }
};

export { getDataFromDb };
