const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.createKpiNorm = async (data) => {
    const result = model.kpiNorms.create(data);
    return result;
};

exports.updateKpiNormById = async (id, data) => {
    const update = await model.kpiNorms.update(data, {
        where: { id },
    });
    return update;
};

exports.detailKpiNorm = async (id) => {
    const detail = await model.kpiNorms.findOne({
        where: { id },
    });
    return detail;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
exports.allKpiNorm = async ({ userId, query }) => {
    const { page = 1, limit, text = '' } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('kpiNorms.name')), 'LIKE', `%${searchValue}%`),
        ],
    }];

    const data = await model.kpiNorms.findAll({
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
                model: model.units,
                attributes: ['id', 'name', 'code'],
            },
            {
                model: model.departments,
                attributes: ['id', 'name', 'code', 'organizationLevel', 'parent_id'],
            },
            {
                model: model.positions,
                attributes: ['id', 'name', 'code'],
            },
        ],
    });
    return data;
};

exports.getKpiNormByDepartment = async (id) => {
    const data = await model.kpiNorms.findAll({
        where: { department_id: id },
        include: [model.units, model.departments, model.positions],
    });
    return data;
};

exports.deleteById = async (id) => {
    const resource = await model.kpiNorms.findOne({
        where: { id },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};
