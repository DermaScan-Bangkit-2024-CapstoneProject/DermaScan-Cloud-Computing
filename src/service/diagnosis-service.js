import admin from "firebase-admin";
import db from "../database/connect-db.js";
import { ResponseError } from "../error/error.js";

const addDiagnosisHistory = async (req) => {
    const userId = req.params.user_id;
    const { image, result } = req.body;

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
        throw new ResponseError(404, "User not found");
    }

    const diagnosisData = {
        userId, // Store userId instead of email
        diagId: Date.now().toString(),
        imageUrl: image,
        imagePath: `diagnoses/${userId}/${Date.now()}`,
        result,
        createdAt: admin.firestore.Timestamp.now()
    };

    await db.collection("diagnosis_histories")
        .doc(diagnosisData.diagId)
        .set(diagnosisData);

    return diagnosisData;
};

const getDiagnosisHistories = async (req) => {
    const userId = req.params.user_id;

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
        throw new ResponseError(404, "User not found");
    }

    const diagnosisCollection = db.collection("diagnosis_histories");
    const diagnosisQuery = await diagnosisCollection
        .where("userId", "==", userId)
        .get();

    return diagnosisQuery.docs.map(doc => ({
        userId: doc.data().userId,
        diagId: doc.data().diagId,
        imagePath: doc.data().imagePath,
        result: doc.data().result,
        createdAt: doc.data().createdAt._seconds
    }));
};

const getDiagnosisHistoryById = async (req) => {
    const userId = req.params.user_id;
    const diagId = req.params.diag_id;

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
        throw new ResponseError(404, "User not found");
    }

    const diagDoc = await db.collection("diagnosis_histories").doc(diagId).get();
    if (!diagDoc.exists) {
       throw new ResponseError(404, "Diagnosis history not found");
    }

   return diagDoc.data();
};

const deleteDiagnosisHistory = async (req) => {
    const userId = req.params.user_id;
    const diagId = req.params.diag_id;

   const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
        throw new ResponseError(404, "User not found");
    }

    const diagDoc = await db.collection("diagnosis_histories").doc(diagId).get();
    if (!diagDoc.exists) {
        throw new ResponseError(404, "Diagnosis history not found"); 
    }

   await db.collection("diagnosis_histories").doc(diagId).delete();
};

export default { 
    addDiagnosisHistory, 
    getDiagnosisHistories,
    getDiagnosisHistoryById,
    deleteDiagnosisHistory
};