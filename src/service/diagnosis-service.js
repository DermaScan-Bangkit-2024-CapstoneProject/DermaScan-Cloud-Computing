import admin from "firebase-admin";
import db from "../database/connect-db.js";
import { ResponseError } from "../error/error.js";
import { upload } from "../utils/image-storage-handler.js";
import { get } from "http";
import { getDataFromDb } from "../utils/get-data.js";
import { CollectionGroup } from "firebase-admin/firestore";

const addDiagnosisHistory = async (req) => {
    try {
        if (req.params.user_id !== req.userData) {
            throw new ResponseError(401, "Unauthorized");
        }
        const userId = req.userData;
        const { result } = req.body;
        const imageFile = req.file;
        const uploadResult = await upload(imageFile, req.userData);
        const diagId = uploadResult.id + userId;
        const diagnosisData = {
            userId: userId,
            diag_Id: diagId,
            imageUrl: uploadResult.image,
            result: result,
            checked_at: admin.firestore.Timestamp.now(),
        };

        const diagnosisCollection = db.collection("test_histories");
        const dbResult = await diagnosisCollection.doc(diagId).set(diagnosisData);
        // const getHistoryUser = await getDataFromDb("test_histories", "diag_Id", diagId); //testing
        return dbResult;
    } catch (error) {
        throw error;
    }
};

const getDiagnosisHistories = async (req) => {
    const userId = req.params.user_id;

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
        throw new ResponseError(404, "User not found");
    }

    const diagnosisCollection = db.collection("diagnosis_histories");
    const diagnosisQuery = await diagnosisCollection.where("userId", "==", userId).get();

    return diagnosisQuery.docs.map((doc) => ({
        userId: doc.data().userId,
        diagId: doc.data().diagId,
        imagePath: doc.data().imagePath,
        result: doc.data().result,
        createdAt: doc.data().createdAt._seconds,
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
    deleteDiagnosisHistory,
};
