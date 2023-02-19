const missionService = require('./mission.service');

exports.addMission = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday, responsibleDepartment_id, relatedDepartment_id } = req.body;
    try {
        const addMission = await missionService.addMission(name, unit_id, description, quantity, kpiValue, startTime, endTime, manday);
        const findResponsibleDepartment = await missionService.getDepartmentById(responsibleDepartment_id);
        const findRelatedDepartment = await missionService.getDepartmentById(relatedDepartment_id);
        if (findResponsibleDepartment) {
            await addMission.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
        }
        if (findRelatedDepartment) {
            await addMission.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
        }
        return res.status(200).json({ msg: 'Success!', data: addMission });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.getMission = async (req, res) => {
    try {
        const getAllMission = await missionService.getAllMission(req.query);
        return res.status(200).json(getAllMission);
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.getDetailMission = async (req, res) => {
    try {
        const getDetailMission = await missionService.getMissionDetail(req.params.id);
        return res.status(200).json({ msg: 'Success!', data: getDetailMission });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.updateMission = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday, responsibleDepartment_id, relatedDepartment_id } = req.body;
    try {
        const getMissionById = await missionService.getMissionById(req.params.id);
        const updateMission = await missionService.updateMission(getMissionById.id, name, unit_id, description, quantity, kpiValue, startTime, endTime, manday);
        if (responsibleDepartment_id) {
            const findResponsibleDepartment = await missionService.getDepartmentById(responsibleDepartment_id);
            await missionService.deleteDepartmentMissionWithResponsible(getMissionById.id, true);
            await getMissionById.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
        }
        if (relatedDepartment_id) {
            const findRelatedDepartment = await missionService.getDepartmentById(relatedDepartment_id);
            await missionService.deleteDepartmentMissionWithResponsible(getMissionById.id, false);
            await getMissionById.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
        }
        const getNewMission = await missionService.getMissionDetail(req.params.id);
        return res.status(200).json({ msg: 'Success!', data: getNewMission });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteMission = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteMissionById = await missionService.deleteMission(id);
            return res.status(200).json({ msg: 'Success!', data: deleteMissionById });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};
