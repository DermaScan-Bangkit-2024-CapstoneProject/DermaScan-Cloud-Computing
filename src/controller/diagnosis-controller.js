import diagnosisService from "../service/diagnosis-service.js";

const addDiagnosisHistory = async (req, res, next) => {
    try {
        const result = await diagnosisService.addDiagnosisHistory(req, res);
        res.status(201).json({
            message: "Diagnosis history has successfully added.",
            result: result,
        });
    } catch (error) {
        next(error);
    }
};

const getDiagnosisHistories = async (req, res, next) => {
    try {
        const results = await diagnosisService.getDiagnosisHistories(req);
        if (results.length === 0) {
            res.status(200).json({ message: "No diagnosis history found." });
            return;
        }
        res.status(200).json(results);
        return;
    } catch (error) {
        next(error);
    }
};

const getDiagnosisHistoryById = async (req, res, next) => {
    try {
        const result = await diagnosisService.getDiagnosisHistoryById(req);
        res.status(200).json(result);
        return;
    } catch (error) {
        next(error);
    }
};

const deleteDiagnosisHistory = async (req, res, next) => {
    try {
        await diagnosisService.deleteDiagnosisHistory(req);
        res.status(200).json({
            message: "Diagnosis history deleted successfully.",
        });
        return;
    } catch (error) {
        next(error);
    }
};

export default {
    addDiagnosisHistory,
    getDiagnosisHistories,
    getDiagnosisHistoryById,
    deleteDiagnosisHistory,
};
