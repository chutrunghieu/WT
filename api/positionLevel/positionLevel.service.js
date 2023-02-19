const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllResource = async (page, limit, text) => {
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    else searchValue = '';

    const total = await model.positionLevels.count();

    const data = await model.positionLevels.findAndCountAll({
        offset: (page - 1) * limit || 0,
        limit,
        order: [
            ['id', 'DESC'],
        ],
        where: {
            [Op.or]: [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${searchValue}%`),
                sequelize.where(sequelize.fn('LOWER', sequelize.col('code')), 'LIKE', `%${searchValue}%`),
            ],
        },
    });
    return { data: data.rows, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.rows.length, total } };
};

const getResourceById = async (id) => {
    const data = await model.positionLevels.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const existedEntity = await model.positionLevels.findOne({
        where:
        {
            code: data.code,
        },
    });
    if (existedEntity) {
        return {
            message: 'Mã vị trí đã tồn tại trên hệ thống',
            existed: true,
        };
    }
    const result = model.positionLevels.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.positionLevels.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.positionLevels.findOne({
        where:
        {
            id,
        },
    });
    if (!resource) {
        throw new ApiError(404, 'Position Level not found');
    }
    await resource.destroy();
    return resource;
};

module.exports = { getAllResource, getResourceById, createResource, updateResourceById, deleteResourceById };
