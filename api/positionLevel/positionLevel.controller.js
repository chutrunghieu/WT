const ApiError = require('../../utils/ApiError');
const positionLevelService = require('./positionLevel.service');

const getAll = async (req, res) => {
    const { page, limit, text } = req.query;
    try {
        const positionLevels = await positionLevelService.getAllResource(page, limit, text);
        return res.status(200).json(positionLevels);
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const positionLevel = await positionLevelService.getResourceById(id);
        if (!positionLevel) {
            throw new ApiError(404, 'Position Level not found');
        }
        return res.status(200).json({ message: 'Success!', data: positionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Position Level not found!', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const positionLevel = await positionLevelService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: positionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const positionLevel = await positionLevelService.updateResourceById(id, req.body);
        if (positionLevel) {
            const result = await positionLevelService.getResourceById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePositionLevel = await positionLevelService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: deletePositionLevel });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
