import db from "../database/connect-db.js";

const getDataFromDb = async (collectionName, field, value) => {
    const articlesCollection = await db.collection(collectionName).where(field, "==", value).get();
    const result = articlesCollection.docs.map((doc) => doc.data());
    return result[0];
};

export { getDataFromDb };
