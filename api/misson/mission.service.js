const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');

exports.addMission = async (name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    const addMission = await model.missions.create({ name, unit_id, description, quantity, kpiValue, startTime, endTime, manday });
    return addMission;
};

exports.getAllMission = async (query) => {
    const { page = 1, limit, text } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    else searchValue = '';

    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('missions.name')), 'LIKE', `%${searchValue}%`),
            sequelize.where(sequelize.fn('LOWER', sequelize.col('missions.description')), 'LIKE', `%${searchValue}%`),
        ],
    }];

    const total = await model.missions.count();
    const data = await model.missions.findAll({
        offset: (page - 1) * limit || 0,
        limit,
        order: [
            ['id', 'ASC'],
        ],
        where: {
            [Op.and]: conditions,
        },
        include: [
            {
                model: model.departments,
            },
            {
                model: model.units,
                attributes: ['id', 'name', 'code'],
            },
        ],
    });
    return { data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
};

exports.updateMission = async (id, name, unit_id, description, quantity, kpiValue, startTime, endTime, manday) => {
    const updateMission = await model.missions.update(
        { name, unit_id, description, quantity, kpiValue, startTime, endTime, manday },
        {
            where: {
                id,
            },
        },
    );
    return updateMission;
};

exports.getMissionById = async (id) => {
    const getMissionById = await model.missions.findOne(
        {
            where: { id },
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.units,
                    attributes: ['id', 'name', 'code'],
                },
            ],
        },
    );
    return getMissionById;
};

exports.getMissionDetail = async (id) => {
    const getMissionDetail = await model.missions.findOne({
        where: { id },
        include: [
            {
                model: model.departments,
            },
            {
                model: model.units,
                attributes: ['id', 'name', 'code'],
            },
        ],
    });
    return getMissionDetail;
};

exports.getDepartmentById = async (id) => {
    const detail = await model.departments.findOne({
        where: { id },
    });
    return detail;
};

exports.getDepartmentMissionById = async (id, isResponsible) => {
    const getMissionById = await model.missionDepartments.findOne({
        where: { missionId: id, isResponsible },
    });
    return getMissionById;
};

exports.deleteDepartmentMissionWithResponsible = async (id, isResponsible) => {
    const deleteMission = await model.missionDepartments.destroy({ where: { missionId: id, isResponsible } });
    return deleteMission;
};

exports.deleteMission = async (id) => {
    const getMissionById = await model.missions.findOne(
        {
            where: { id },
        },
    );
    const deleteMissionById = await model.missions.destroy({ where: { id: getMissionById.id } });
    return deleteMissionById;
};
