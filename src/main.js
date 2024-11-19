import web from "./app/web.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.DEV_PORT; //port development = 3000; port production = 8080

web.listen(PORT, () => {
    console.info(`App start on http://localhost:${PORT}/api`); //jalankan dengan perintah "npm run start-dev"
});
