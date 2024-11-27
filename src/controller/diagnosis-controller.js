import diagnosisService from "../service/diagnosis-service.js";

const addDiagnosisHistory = async (req, res, next) => {
    try {
        const result = await diagnosisService.addDiagnosisHistory(req);
        res.status(201).json({ 
            message: "diagnosis history added successfully" 
        });
    } catch (error) {
        next(error);
    }
};

const getDiagnosisHistories = async (req, res, next) => {
    try {
        const results = await diagnosisService.getDiagnosisHistories(req);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};

const getDiagnosisHistoryById = async (req, res, next) => {
   try {
       const result = await diagnosisService.getDiagnosisHistoryById(req);
       res.status(200).json(result);
   } catch (error) {
       next(error);
   }
};

const deleteDiagnosisHistory = async (req, res, next) => {
   try {
       await diagnosisService.deleteDiagnosisHistory(req);
       res.status(200).json({
           message: "Diagnosis history deleted successfully."
       });
   } catch (error) {
       next(error);
   }
};

export default { 
    addDiagnosisHistory, 
    getDiagnosisHistories,
    getDiagnosisHistoryById,
    deleteDiagnosisHistory
};
