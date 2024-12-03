import web from "./app/web.js";
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
const PORT = process.env.NODE_ENV !== "production" ? 3000 : 8080;
// const { PORT , HOST } = process.env; // please set port development = 3000; port production = 8080

web.listen(PORT, HOST, () => {
    console.info(`App start on http://${HOST}:${PORT}/api`); //jalankan dengan perintah "npm run start-dev"
});
