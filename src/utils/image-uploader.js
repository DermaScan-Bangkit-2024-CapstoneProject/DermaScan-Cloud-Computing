const { Storage } = require("@google-cloud/storage");
const { response } = require("express");
const { ResponseError } = require("../error/error.js");

const storage = new Storage({
    keyFilename: process.env.KEY_FILENAME,
    projectId: process.env.PROJECT_ID,
});
const bucketName = process.env.BUCKET_NAME;

async function upload(bucket, filePath, fileName) {
    try {
        // const customMetadata = {
        //     contentType: "image/jpeg",
        //     metadata: {
        //         type: "image/jpeg",
        //     },
        // };

        const optionsUploadObject = {
            destination: fileName,
            preconditionOpts: { ifGenerationMatch: 0 },
            metadata: customMetadata,
        };

        await storage.bucket(bucketName).upload(filePath, optionsUploadObject);
        console.log(`${filePath} uploaded to ${bucketName} bucket`);
    } catch (uploadError) {
        // console.error(`Gagal mengupload ${filePath}:`, uploadError.message);
        throw new ResponseError(500, uploadError.message);
    }
}

export { upload };
