const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

const getAllResource = async () => {
    const data = await model.workTrackLogs.findAll({});
    return data;
};

const getResourceById = async (id) => {
    const data = await model.workTrackLogs.findOne({
        where: {
            id,
        },
    });
    return data;
};

const getAllResourceByWorktrackId = async (workTrack_id) => {
    const worktrack = await model.workTrackLogs.findOne({
        id: workTrack_id,
    });
    if (!worktrack) {
        throw new ApiError(404, 'Worktrack not found!');
    }
    const data = await model.workTrackLogs.findAll({
        where: {
            workTrack_id,
        },
    });
    return data;
};

const createResource = async (data) => {
    const result = model.workTrackLogs.create(data);
    return result;
};

const updateResourceById = async (id, data) => {
    const result = await model.workTrackLogs.update(data, {
        where: {
            id,
        },
    });
    return result;
};

const deleteResourceById = async (id) => {
    const resource = await model.workTrackLogs.findOne({
        where:
        {
            id,
        },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};

module.exports = { getAllResource, getResourceById, getAllResourceByWorktrackId, createResource, updateResourceById, deleteResourceById };
