const worktrackService = require('./worktrackLog.service');
const ApiError = require('../../utils/ApiError');

const getAll = async (req, res) => {
    try {
        const worktracks = await worktrackService.getAllResource();
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.getResourceById(id);
        if (!worktrack) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error: error.message });
    }
};

const getAllByWorktrackId = async (req, res) => {
    const { workTrack_id } = req.params;
    try {
        const worktracks = await worktrackService.getAllResourceByWorktrackId(workTrack_id);
        if (!worktracks) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const worktrack = await worktrackService.createResource(req.body);
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.updateResourceById(id, req.body);
        if (worktrack) {
            const result = await worktrackService.getResourceById(id);
            return res.status(200).json({ message: 'Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.deleteResourceById(id);
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

module.exports = { getAll, getById, getAllByWorktrackId, create, updateById, deleteById };
