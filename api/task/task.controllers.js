const taskService = require('./task.service');

exports.addTask = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id,
            responsibleDepartment_id, relatedDepartment_id, responsibleUser_id, relatedUser_id, kpiNorm_id } = req.body;
    try {
        const addTask = await taskService.addTask(name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id);
        const findResponsibleDepartment = await taskService.getDepartmentById(responsibleDepartment_id);
        const findRelatedDepartment = await taskService.getDepartmentById(relatedDepartment_id);
        const findResponsibleUser = await taskService.getUserById(responsibleUser_id);
        const findRelatedUser = await taskService.getUserById(relatedUser_id);
        if (findResponsibleDepartment) {
            await addTask.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
        }
        if (findRelatedDepartment) {
            await addTask.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
        }
        if (findResponsibleUser) {
            await addTask.addUser(findResponsibleUser, { through: { isResponsible: true } });
        }
        if (findRelatedUser) {
            await addTask.addUser(findRelatedUser, { through: { isResponsible: false } });
        }

        const addKpiNormForTask = async (id) => {
            const findKpiNorm = await taskService.getKpiNormById(id);
            await addTask.addKpiNorm(findKpiNorm);
        };
        if (kpiNorm_id) {
            kpiNorm_id.forEach((element) => {
                addKpiNormForTask(element);
            });
        }
        return res.status(200).json({ msg: 'Success!', data: addTask });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.updateTask = async (req, res) => {
    const { name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id,
            responsibleDepartment_id, relatedDepartment_id, responsibleUser_id, relatedUser_id, kpiNorm_id } = req.body;
    try {
        const getTaskById = await taskService.getTaskById(req.params.id);
        const updateTask = await taskService.updateTask(getTaskById.id, name, unit_id, description, quantity, kpiValue, startDate, deadlineDate, startTime, deadlineTime, manday, status, estimateMD, priority, note, mission_id);
        if (responsibleDepartment_id) {
            const findResponsibleDepartment = await taskService.getDepartmentById(responsibleDepartment_id);
            const findResponsibleTaskDepartment = await taskService.getDepartmentTaskById(getTaskById.id, true);
            if (findResponsibleTaskDepartment) {
                await taskService.deleteDepartmentTask(findResponsibleTaskDepartment.id);
                await getTaskById.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
            } else {
                await getTaskById.addDepartment(findResponsibleDepartment, { through: { isResponsible: true } });
            }
        }
        if (relatedDepartment_id) {
            const findRelatedDepartment = await taskService.getDepartmentById(relatedDepartment_id);
            const findRelatedTaskDepartment = await taskService.getDepartmentTaskById(getTaskById.id, false);
            if (findRelatedTaskDepartment) {
                await taskService.deleteDepartmentTask(findRelatedTaskDepartment.id);
                await getTaskById.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
            } else {
                await getTaskById.addDepartment(findRelatedDepartment, { through: { isResponsible: false } });
            }
        }
        if (responsibleUser_id) {
            const findResponsibleUser = await taskService.getUserById(responsibleUser_id);
            const findResponsibleTaskUser = await taskService.getUserTaskById(getTaskById.id, true);
            if (findResponsibleTaskUser) {
                await taskService.deleteTaskUser(findResponsibleTaskUser.id);
                await getTaskById.addUser(findResponsibleUser, { through: { isResponsible: true } });
            } else {
                await getTaskById.addUser(findResponsibleUser, { through: { isResponsible: true } });
            }
        }
        if (relatedUser_id) {
            const findRelatedUser = await taskService.getUserById(relatedUser_id);
            const findRelatedTaskUser = await taskService.getUserTaskById(getTaskById.id, false);
            if (findRelatedTaskUser) {
                await taskService.deleteTaskUser(findRelatedTaskUser.id);
                await getTaskById.addUser(findRelatedUser, { through: { isResponsible: false } });
            } else {
                await getTaskById.addUser(findRelatedUser, { through: { isResponsible: false } });
            }
        }
        const addKpiNormForTask = async (id) => {
            const findKpiNorm = await taskService.getKpiNormById(id);
            await getTaskById.addKpiNorm(findKpiNorm);
        };
        if (kpiNorm_id) {
            const findKpiNormTask = await taskService.getKpiNormTaskById(getTaskById.id);
            await taskService.deleteKpiNormTaskById(findKpiNormTask.id);
            kpiNorm_id.forEach((element) => {
                addKpiNormForTask(element);
            });
        }
        return res.status(200).json({ msg: 'Success!', data: updateTask });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.getTask = async (req, res) => {
    try {
        const getAllTask = await taskService.getAllTask();
        return res.status(200).json({ msg: 'Success!', data: getAllTask });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.getTaskDetail = async (req, res) => {
    try {
        const getAllDetail = await taskService.getTaskDetail(req.params.id);
        return res.status(200).json({ msg: 'Success!', data: getAllDetail });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.getTaskByUser = async (req, res) => {
    try {
        const getTaskByUser = await taskService.getTaskByUser(req.user.user_id);
        return res.status(200).json({ msg: 'Success!', data: getTaskByUser });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.body;
    try {
        const getTaskById = await taskService.getTaskDetail(id);
        const findTaskUser = await taskService.getUserTask(getTaskById.id);
        await taskService.deleteMultiTaskUsers(findTaskUser.id);
        const findKpiNormTask = await taskService.getKpiNormTaskById(getTaskById.id);
        await taskService.deleteMultiKpiNormTasks(findKpiNormTask.id);
        const findDepartmentTask = await taskService.getDepartmentTaskById(getTaskById.id);
        await taskService.deleteMultiDepartmentTasks(findDepartmentTask.id);
        const deleteTaskById = await taskService.deleteTask(getTaskById.id);
        return res.status(200).json({ msg: 'Success!', data: deleteTaskById });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};
