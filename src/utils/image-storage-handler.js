import { Storage } from "@google-cloud/storage";
import { ResponseError } from "../error/error.js";
import crypto from "crypto";
import { response } from "express";
const storage = new Storage({
    keyFilename: process.env.KEY_FILENAME,
    projectId: process.env.PROJECT_ID,
});

async function upload(imageFile, userId) {
    try {
        const bucketName = process.env.BUCKET_NAME;
        const bucket = storage.bucket(bucketName);
        const cryptoId = crypto.randomBytes(3).toString("hex");
        const imageId = `${imageFile.originalname.split(".")[0]}_${cryptoId}_${Date.now()}`;
        // const imageFileName = `users_histories/${userId}/${imageId}.${imageFile.originalname.split(".")[1]}`;
        const imageFileName = `${imageId}.${imageFile.originalname.split(".")[1]}`;
        const blob = bucket.file(imageFileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: imageFile.mimetype,
            },
        });
        await new Promise((resolve, reject) => {
            blobStream.on("error", (err) => {
                reject(new ResponseError(500, err.message));
            });

            blobStream.on("finish", () => {
                resolve("File uploaded successfully");
            });

            blobStream.end(imageFile.buffer);
        });
        return {
            image: `https://storage.googleapis.com/dermascan-storage/${imageFileName}`,
            id: cryptoId,
        };
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
}

async function deleteImage(imageUrl, diagId) {
    const bucketName = process.env.BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const parts = imageUrl.split("/");
    imageUrl = parts[parts.length - 1];
    console.log(imageUrl);
    const deleteResult = await bucket.file(imageUrl).delete();
    return deleteResult;
}
export { upload, deleteImage };
