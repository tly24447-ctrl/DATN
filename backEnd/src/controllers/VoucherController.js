const VoucherService = require('../services/VoucherService');

const createVoucher = async (req, res) => {
    try {
        const { code, discountType, discountValue, expirationDate } = req.body;
        if (!code || !discountType || !discountValue || !expirationDate) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const response = await VoucherService.createVoucher(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ message: e.message || e });
    }
};

const updateVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const data = req.body;
        if (!voucherId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The voucherId is required'
            });
        }
        const response = await VoucherService.updateVoucher(voucherId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ message: e.message || e });
    }
};

const deleteVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        if (!voucherId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The voucherId is required'
            });
        }
        const response = await VoucherService.deleteVoucher(voucherId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ message: e.message || e });
    }
};

const getDetailsVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        if (!voucherId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The voucherId is required'
            });
        }
        const response = await VoucherService.getDetailsVoucher(voucherId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ message: e.message || e });
    }
};

const getAllVoucher = async (req, res) => {
    try {
        const { limit, page, filter } = req.query;
        const response = await VoucherService.getAllVoucher(Number(limit) || 8, Number(page) || 0, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ message: e.message || e });
    }
};

const checkVoucherValid = async (req, res) => {
    try {
        const { code, orderTotal } = req.body;
        if (!code || orderTotal === undefined) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Code and Order Total are required'
            });
        }
        const response = await VoucherService.checkVoucherValid(code, orderTotal);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ message: e.message || e });
    }
};

module.exports = {
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getDetailsVoucher,
    getAllVoucher,
    checkVoucherValid
};