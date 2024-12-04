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
            user_id: userId,
            diag_Id: diagId,
            image_url: uploadResult.image,
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
    const { user_id } = req.params;
    if (user_id !== req.userData) {
        throw new ResponseError(401, "Unauthorized");
    }
    const user = await getDataFromDb("users", "user_id", user_id);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }
    const diagCollection = db.collection("test_histories");

    const diagDoc = await diagCollection.where("user_id", "==", user_id).get();
    const results = diagDoc.docs.map((doc) => doc.data());
    results.map((data) => (data.checked_at = new Date(data.checked_at._seconds * 1000).toLocaleString()));
    return results;
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
