const ExcelJs = require('exceljs');
const moment = require('moment');
const model = require('../../models/index');
const userService = require('./user.service');

exports.addUser = async (req, res) => {
    const data = req.body;
    try {
        const user = await model.users.findOne({
            where: {
                email: data.email,
            },
        });
        if (user) {
            return res.status(400).json({ message: 'Email has already existed !' });
        }
        const newUser = await userService.createUser({ ...data });
        return res.status(200).json({ message: 'Register success!', data: newUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const updateInfo = await userService.updateUserById(id, req.body);
        if (updateInfo) {
            const result = await userService.findUser(id);
            return res.status(200).json({ msg: 'Update Profile success!!', data: result });
          }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
exports.updateInformation = async (req, res) => {
    try {
        const updateInfo = await userService.updateUserById(req.user.id, req.body);
        if (updateInfo) {
            const result = await userService.findUser(req.user.id);
            return res.status(200).json({ msg: 'Update Profile success!!', data: result });
          }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, newPassword2 } = req.body;
    try {
        const changePassword = await userService.changePassword(oldPassword, newPassword, newPassword2, req.user.id);
        return res.status(200).json({ msg: 'Success', data: changePassword });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const userDetail = await userService.findUser(id);
        return res.status(200).json({ message: 'Get User Detail Success!!', data: userDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const data = await userService.findAll({ userId: req.user.id, query: req.query });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllUserByDepartmentId = async (req, res) => {
    const { department_id } = req.params;
    try {
        const getUserById = await model.users.findOne({ where: { id: req.user.id, isDelete: false } });
        if (getUserById.role === 'admin') {
            const allUser = await model.users.findAll({
                where: { department_id, isDelete: false },
                include: [
                    {
                        model: model.departments,
                    },
                    {
                        model: model.positions,
                    },
                ],
            });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
        if (getUserById.role !== 'admin') {
            const allUser = await model.users.findAll({ where: { department_id: getUserById.department_id, isDelete: false } });
            return res.status(200).json({ message: 'Get All User Success!', data: allUser });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        const destroyUser = await userService.deleteById(id);
        return res.status(200).json({ message: 'Delete User Success!', data: destroyUser });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.exportExcel = async (req, res) => {
    try {
        const users = await model.users.findAll();
        const department = await model.departments.findAll();
        const showDepartment = (id) => {
            const newData = department.filter((item) => item.id === id);
            return newData[0]?.name;
        };
        const position = await model.positions.findAll();
        const showPosition = (id) => {
            const newData = position.filter((item) => item.id === id);
            return newData[0]?.name;
        };
        const user = users.filter((items) => items.dataValues.role !== 'admin').map((item) => (
            {
                name: item.dataValues.name,
                code: item.dataValues.code,
                email: item.dataValues.email,
                phone: item.dataValues.phone,
                address: item.dataValues.address,
                sex: item.dataValues.sex === 'male' ? 'Nam' : 'Nữ',
                isDelete: item.dataValues.isDelete ? 'Không hoạt động' : 'Hoạt động',
                dateOfBirth: item.dataValues.dateOfBirth ? moment(item.dataValues.dateOfBirth).format('DD/MM/YYYY') : '',
                dateOfJoin: item.dataValues.dateOfJoin ? moment(item.dataValues.dateOfJoin).format('DD/MM/YYYY') : '',
                departmentName: showDepartment(item.department_id),
                positionName: showPosition(item.position_id),
            }));
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('Users');
        worksheet.columns = [
            { header: 'STT', key: 'stt', width: 7 },
            { header: 'Name', key: 'name', width: 22 },
            { header: 'Mã nhân sự', key: 'code', width: 12 },
            { header: 'Email liên hệ', key: 'email', width: 30 },
            { header: 'Phòng ban công tác', key: 'departmentName', width: 30 },
            { header: 'Vị trí làm việc', key: 'positionName', width: 25 },
            { header: 'Số điện thoại', key: 'phone', width: 20 },
            { header: 'Địa chỉ', key: 'address', width: 50 },
            { header: 'Giới tính', key: 'sex', width: 10 },
            { header: 'Ngày sinh', key: 'dateOfBirth', width: 12 },
            { header: 'Ngày tham gia', key: 'dateOfJoin', width: 15 },
            { header: 'Trạng thái', key: 'isDelete', width: 17 },
        ];
        let count = 1;
        user.forEach((e) => {
            e.stt = count;
            worksheet.addRow(e);
            count += 1;
        });
        worksheet.getRow(1).eachCell((cell) => {
            // eslint-disable-next-line no-param-reassign
            cell.font = { bold: true, size: 12 };
        });
        await workbook.xlsx.writeFile('Users.xlsx');
        res.download('Users.xlsx');
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
