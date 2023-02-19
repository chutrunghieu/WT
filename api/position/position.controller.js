const positionService = require('./position.service');
const requirementService = require('../requirement/requirement.service');
const ApiError = require('../../utils/ApiError');

exports.addPosition = async (req, res) => {
    try {
        const addPosition = await positionService.createPosition(req.body);
        const addRequirementForPosition = async (id) => {
            const findRequirement = await requirementService.getResourceById(id);
            await addPosition.addRequirement(findRequirement);
        };
        if (req.body.requirement_id) {
            req.body.requirement_id.forEach((element) => {
                addRequirementForPosition(element);
            });
        }
        return res.status(200).json({ message: 'Create Position Success!', data: addPosition });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.updatePosition = async (req, res) => {
    const { requirement_id } = req.body;
    try {
        const getPosition = await positionService.getPositionById(req.params.id);
        const updateItem = await positionService.updateById(getPosition.id, req.body);
        const addRequirementForPosition = async (id) => {
            const findRequirement = await requirementService.getResourceById(id);
            await getPosition.addRequirement(findRequirement);
        };
        if (requirement_id) {
            // const getPositionRequirement = await positionService.getPositionRequirement(getPosition.id);
            await positionService.deletePositionRequirement(getPosition.id);
            requirement_id.forEach((element) => {
                addRequirementForPosition(element);
            });
        }
        if (updateItem) {
            const result = await positionService.getPositionById(getPosition.id);
            return res.status(200).json({ message: 'Update Position Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllPosition = async (req, res) => {
    try {
        const result = await positionService.allPosition(req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getPositionDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const detail = await positionService.getPositionById(id);
        return res.status(200).json({ message: 'Get Detail Position Success!!', data: detail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.deletePosition = async (req, res) => {
    try {
        const deleteP = await positionService.deletePosition(req.params.id);
        return res.status(200).json({ message: 'Delete Position Success!!', data: deleteP });
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};
