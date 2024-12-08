import readService from "../service/read-service.js";

const addReadHistory = async (req, res, next) => {
    try {
        const result = await readService.addReadHistory(req);
        res.status(201).json({ message: "Read History Successfully Created" });
    } catch (error) {
        next(error);
    }
};
const getReadHistory = async (req, res, next) => {
    try {
        const results = await readService.getReadHistory(req);
        if (results.length === 0) {
            res.status(200).json({ message: "No read histories found." });
            return;
        }
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};
const deleteReadHistory = async (req, res, next) => {
    try {
        const result = await readService.deleteReadHistory(req);
        res.status(200).json({
            message: "Read History deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

export default { addReadHistory, getReadHistory, deleteReadHistory };
