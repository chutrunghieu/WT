const { Op } = require('sequelize');
const sequelize = require('sequelize');
const unitService = require('./unit.service');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.addUnit = async (req, res) => {
    try {
        const addUnit = await unitService.createUnit(req.body);
        return res.status(200).json({ msg: 'Create Unit Success!', data: addUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.updateUnit = async (req, res) => {
    const { id } = req.params;
    try {
        const updateUnit = await unitService.updateUnitById(id, req.body);
        if (updateUnit) {
            const result = await unitService.getUnitById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteUnit = async (req, res) => {
    const { id } = req.params;
    try {
            const deleteUnit = await unitService.deleteUnitById(id);
            return res.status(200).json({ msg: 'Delete Unit Success!', data: deleteUnit });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllUnit = async (req, res) => {
    const { page, limit, text } = req.query;
    let searchValue = '';
    if (text) searchValue = text.toString().toLowerCase();
    else searchValue = '';
    const total = await model.units.count();
    try {
        const units = await model.units.findAndCountAll({
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
        return res.status(200).json({ data: units.rows, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: units.rows.length, total } });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};
