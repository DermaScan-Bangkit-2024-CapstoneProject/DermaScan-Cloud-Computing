import readService from "../service/read-service.js";

const addReadHistory = async (req, res, next) => {
    try {
        const result = await readService.addReadHistory(req);
        res.status(201).json({ message: "Read History Successfully Created", data: result });
    } catch (error) {
        next(error);
    }
};
const getReadHistory = async (req, res, next) => {
    try {
        const result = await readService.getReadHistory(req);
        res.status(200).json(result);
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
