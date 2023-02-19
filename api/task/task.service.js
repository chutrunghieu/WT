const model = require('../../models/index');

exports.addTask = async (name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id) => {
    try {
        const addTask = await model.taskModel.create({ name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id });
        return addTask;
    } catch (error) {
        return error;
    }
};

exports.getAllTask = async () => {
    try {
        const getAllTask = await model.taskModel.findAll({ include: [model.departmentModel, model.kpiNormModel, model.userModel] });
        return getAllTask;
    } catch (error) {
        return error;
    }
};

exports.updateTask = async (id, name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id) => {
    try {
        const updateTask = await model.taskModel.update(
            { name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id },
            {
                where: {
                    id,
                },
            },
        );
        return updateTask;
    } catch (error) {
        return error;
    }
};

exports.getTaskDetail = async (id) => {
    try {
        const getTaskById = await model.taskModel.findOne(
        { include: [model.departmentModel, model.kpiNormModel, model.userModel] },
        {
            where: { id },
        },
        );
        return getTaskById;
    } catch (error) {
        return error;
    }
};

exports.getTaskById = async (id) => {
    try {
        const getTaskDetail = await model.taskModel.findOne(
        {
            where: { id },
        },
        );
        return getTaskDetail;
    } catch (error) {
        return error;
    }
};

exports.deleteTask = async (id) => {
    try {
        const getTaskById = await model.taskModel.findOne(
        {
            where: { id },
        },
        );
        const deleteTaskById = await model.taskModel.destroy({ where: { id: getTaskById.id } });
        return deleteTaskById;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentById = async (id) => {
    try {
        const detail = await model.departmentModel.findOne({
            where: { id },
        });
        return detail;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentTaskById = async (id, isResponsible) => {
    try {
        const getTaskById = await model.taskDepartment.findOne({
            where: { taskId: id, isResponsible },
        });
        return getTaskById;
    } catch (error) {
        return error;
    }
};

exports.getDepartmentTask = async (id) => {
    try {
        const getTaskById = await model.taskDepartment.findOne({
            where: { taskId: id },
        });
        return getTaskById;
    } catch (error) {
        return error;
    }
};

exports.deleteDepartmentTask = async (id) => {
    try {
        const deleteTask = await model.taskDepartment.destroy({ where: { id } });
        return deleteTask;
    } catch (error) {
        return error;
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await model.userModel.findOne({
            where: { id },
        });
        return user;
    } catch (error) {
        return error;
    }
};

exports.getKpiNormById = async (id) => {
    try {
        const kpiNorm = await model.kpiNormModel.findOne({
            where: { id },
        });
        return kpiNorm;
    } catch (error) {
        return error;
    }
};

exports.getTaskByUser = async (id) => {
    try {
        const getTaskByUser = await model.userModel.findOne(
            { include: [model.departmentModel, model.taskModel] },
            {
                where: { id },
            },
        );
        return getTaskByUser;
    } catch (error) {
        return error;
    }
};

exports.getUserTaskById = async (id, isResponsible) => {
    try {
        const getUserTaskById = await model.userTask.findOne({
            where: { taskId: id, isResponsible },
        });
        return getUserTaskById;
    } catch (error) {
        return error;
    }
};

exports.getUserTask = async (id) => {
    try {
        const getUserTaskById = await model.userTask.findOne({
            where: { taskId: id },
        });
        return getUserTaskById;
    } catch (error) {
        return error;
    }
};

exports.deleteTaskUser = async (id) => {
    try {
        const deleteTaskUser = await model.userTask.destroy({ where: { id } });
        return deleteTaskUser;
    } catch (error) {
        return error;
    }
};

exports.deleteMultiTaskUsers = async (id) => {
    try {
        const deleteMultiTaskUsers = await model.userTask.destroy({ where: { id } });
        return deleteMultiTaskUsers;
    } catch (error) {
        return error;
    }
};

exports.getKpiNormTaskById = async (id) => {
    try {
        const getKpiNormTaskById = await model.kpiNormTask.findOne({
            where: { taskId: id },
        });
        return getKpiNormTaskById;
    } catch (error) {
        return error;
    }
};

exports.deleteKpiNormTaskById = async (id) => {
    try {
        const deleteKpiNormTaskById = await model.kpiNormTask.destroy({ where: { id } });
        return deleteKpiNormTaskById;
    } catch (error) {
        return error;
    }
};

exports.deleteMultiDepartmentTasks = async (id) => {
    try {
        const deleteMultiDepartmentTasks = await model.taskDepartment.destroy({ where: { id } });
        return deleteMultiDepartmentTasks;
    } catch (error) {
        return error;
    }
};

exports.deleteMultiKpiNormTasks = async (id) => {
    try {
        const deleteMultiKpiNormTasks = await model.kpiNormTask.destroy({ where: { id } });
        return deleteMultiKpiNormTasks;
    } catch (error) {
        return error;
    }
};
