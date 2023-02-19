const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllResource = async (query) => {
    const { page, limit, text } = query;
    let searchValue = '';
    if (text) searchValue = text.toString();
    else searchValue = '';
    const total = await model.requirements.count();
    const data = await model.requirements.findAndCountAll({
        offset: (page - 1) * limit || 0,
        limit,
        order: [
            ['id', 'DESC'],
        ],
        where: {
            [Op.or]: [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${searchValue}%`),
                sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', `%${searchValue}%`),
            ],
        },
    });
    return { data: data.rows, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.rows.length, total } };
};

const getResourceById = async (id) => {
    const data = await model.requirements.findOne({
        where: {
            id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const result = model.requirements.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.requirements.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.requirements.findOne({
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
