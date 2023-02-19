const ApiError = require('../../utils/ApiError');
const requirementService = require('./requirement.service');

const getAll = async (req, res) => {
    try {
        const requirements = await requirementService.getAllResource(req.query);
        return res.status(200).json(requirements);
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.getResourceById(id);
        if (!requirement) {
            throw new ApiError(400, 'Requirement not found');
        }
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const requirement = await requirementService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.updateResourceById(id, req.body);
        if (requirement) {
            const result = await requirementService.getResourceById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const requirement = await requirementService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: requirement });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
