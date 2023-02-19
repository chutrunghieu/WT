const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');

dotenv.config();

exports.createDepartment = async (data) => {
    const result = model.departments.create(data);
    return result;
};

exports.updateDepartmentById = async (id, data) => {
    const update = await model.departments.update(data, {
        where: { id },
    });
    return update;
};

exports.allDepartment = async (query) => {
    const { page = 1, limit, text = '', isActive, organizationLevel } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    // sequelize.where(sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('name'))), 'LIKE', `%${searchValue}%`),
    // sequelize.where(sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('code'))), 'LIKE', `%${searchValue}%`),
    // sequelize.where(sequelize.fn('unaccent', sequelize.fn('LOWER', sequelize.col('description'))), 'LIKE', `%${searchValue}%`),
    const conditions = [{
        [Op.or]: [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${searchValue}%`),
            sequelize.where(sequelize.fn('LOWER', sequelize.col('code')), 'LIKE', `%${searchValue}%`),
        ],
    }];
    if (isActive) conditions.push({ isActive });
    if (organizationLevel) conditions.push({ organizationLevel });
    const total = await model.departments.count();
    const data = await model.departments.findAndCountAll({
        offset: (page - 1) * limit || 0,
        limit,
        order: [
            ['id', 'ASC'],
        ],
        where: {
            [Op.and]: conditions,
        },
    });
    return { data: data.rows, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.rows.length, total } };
};

exports.detailDepartment = async (id) => {
    const detail = await model.departments.findOne({
        where: { id },
    });
    return detail;
};

exports.deleteDepartment = async (id) => {
    const deleteDepartment = await model.departments.destroy({ where: { id } });
    return deleteDepartment;
};
