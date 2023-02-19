const kpiNormService = require('./kpiNorm.service');
const ApiError = require('../../utils/ApiError');

exports.addKpiNorm = async (req, res) => {
    try {
        const kpiNorm = await kpiNormService.createKpiNorm(req.body);
        return res.status(200).json({ message: 'Create KpiNorm Success!', data: kpiNorm });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.updateKpiNorm = async (req, res) => {
    const { id } = req.params;
    try {
        const updateItem = await kpiNormService.updateKpiNormById(id, req.body);
        if (updateItem) {
            const result = await kpiNormService.detailKpiNorm(id);
            return res.status(200).json({ message: 'Update KpiNorm Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllKpiNorm = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const result = await kpiNormService.allKpiNorm({ userId: req.user.id, query: req.query });
            return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
        }
        if (!(req.user.role === 'admin')) {
            const result = await kpiNormService.getKpiNormByDepartment(req.user.department_id);
            return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
        }
        return res.status(401).json({ message: 'Không có quyền truy cập!' });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getKpiNormDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const kpiNormDetail = await kpiNormService.detailKpiNorm(id);
        return res.status(200).json({ message: 'Get Detail KpiNorm Success!!', data: kpiNormDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteKpiNorm = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteKpi = await kpiNormService.deleteById(id);
        return res.status(200).json({ message: 'Success!', data: deleteKpi });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
