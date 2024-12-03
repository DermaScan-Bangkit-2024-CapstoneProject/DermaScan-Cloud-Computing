import { Storage } from "@google-cloud/storage";
import { ResponseError } from "../error/error.js";
import crypto from "crypto";
const storage = new Storage({
    keyFilename: process.env.KEY_FILENAME,
    projectId: process.env.PROJECT_ID,
});
async function upload(imageFile, userId) {
    console.log(imageFile);
    try {
        const bucketName = process.env.BUCKET_NAME;
        const bucket = storage.bucket(bucketName);
        const cryptoId = crypto.randomBytes(3).toString("hex");
        const imageId = `${imageFile.originalname.split(".")[0]}_${cryptoId}_${Date.now()}`;
        const imageFileName = `users_histories/${userId}/${imageId}.${imageFile.originalname.split(".")[1]}`;
        const blob = bucket.file(imageFileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: imageFile.mimetype, // Tetapkan MIME type
            },
        });
        await new Promise((resolve, reject) => {
            blobStream.on("error", (err) => {
                reject(new ResponseError(500, err.message)); // Menangani error stream
            });

            blobStream.on("finish", () => {
                resolve("File uploaded successfully");
            });

            blobStream.end(imageFile.buffer); // Kirim buffer sebagai konten file
        });
        return {
            image: `https://storage.googleapis.com/dermascan-storage/${imageFileName}`,
            id: cryptoId,
        };
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
}

export { upload };