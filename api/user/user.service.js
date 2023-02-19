const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.findUser = async (id) => {
    const findUser = await model.users.findOne({
        where: { id },
        include: [model.departments, model.positions],
    });
    return findUser;
};

exports.updateUserById = async (id, data) => {
    const updateUser = await model.users.update(data, { where: { id } });
    return updateUser;
};

exports.changePassword = async (oldPassword, newPassword, newPassword2, id) => {
    const salt = await bcrypt.genSalt();
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    const findUser = await model.users.findOne({ where: { id } });
    if (findUser) {
        const changePassword = await bcrypt.compare(oldPassword, findUser.password);
        if (changePassword === true) {
            if (findUser.password === newPassword) {
                return ('Same old password');
            } if (newPassword.length < 4) {
                return ('Password must be at least 4 characters !!!');
            } if (newPassword !== newPassword2) {
                return ('Confirm password wrong !');
            }
            await model.users.update({ password: hashNewPassword }, { where: { id } });
            return ('Change Password Success !', changePassword);
        }
        if (changePassword === false) {
            return ('Wrong Current Password !');
        }
    }
};

exports.createUser = async (data) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    const newUser = await model.users.create({
        ...data,
        password: hashPassword,
    });
    return newUser;
};

exports.deleteById = async (id) => {
    const resource = await model.users.findOne({
        where: { id },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};

exports.findAll = async ({ userId, query }) => {
    const { page, limit, text } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    const total = await model.users.count();
    const getUserById = await model.users.findOne({ where: { id: userId, isDelete: false } });
    if (getUserById.role === 'admin') {
        const data = await model.users.findAll({
            offset: (page - 1) * limit || 0,
            limit,
            order: [
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.positions,
                },
                {
                    model: model.workTracks,
                },
            ],
            where: {
                isDelete: false,
                [Op.or]: [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('users.name')), 'LIKE', `%${searchValue}%`),
                ],
            },
        });
        return { data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
    }
    if (getUserById.role === 'manager') {
        const data = await model.users.findAll({
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.positions,
                },
                {
                    model: model.workTracks,
                },
            ],
            where: {
                department_id: getUserById.department_id,
                isDelete: false,
                [Op.or]: [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('users.name')), 'LIKE', `%${searchValue}%`),
                ],
            },
        });
        return { data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
    }
    return null;
};
