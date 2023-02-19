const model = require('../../models/index');

exports.createUnit = async (data) => {
    const createDepartment = await model.units.create(data);
    return createDepartment;
};

exports.updateUnitById = async (id, data) => {
    const update = await model.units.update(data, {
        where: {
            id,
        },
    });
    return update;
};

exports.getUnitById = async (id) => {
    const detail = await model.units.findOne({
        where: { id },
    });
    return detail;
};

exports.deleteUnitById = async (id) => {
    const deleteUnitById = await model.units.destroy({
        where: { id },
    });
    return deleteUnitById;
};
