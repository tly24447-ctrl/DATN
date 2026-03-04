const Voucher = require("../models/VoucherModel");

const createVoucher = (newVoucher) => {
    return new Promise(async (resolve, reject) => {
        const { code, discountType, discountValue, minOrderValue, maxUses, expirationDate } = newVoucher;
        try {
            const checkVoucher = await Voucher.findOne({ code: code.toUpperCase() });
            if (checkVoucher !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'The voucher code already exists'
                });
            }
            const createdVoucher = await Voucher.create({
                code: code.toUpperCase(),
                discountType,
                discountValue: Number(discountValue),
                minOrderValue: Number(minOrderValue) || 0,
                maxUses: Number(maxUses) || 1,
                expirationDate
            });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createdVoucher
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateVoucher = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkVoucher = await Voucher.findById(id);
            if (checkVoucher === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The voucher is not defined'
                });
            }
            const updatedVoucher = await Voucher.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedVoucher
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteVoucher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkVoucher = await Voucher.findById(id);
            if (checkVoucher === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The voucher is not defined'
                });
            }
            await Voucher.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Delete voucher success',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsVoucher = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const voucher = await Voucher.findById(id);
            if (voucher === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The voucher is not defined'
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: voucher
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllVoucher = (limit, page, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalVoucher = await Voucher.countDocuments();
            let query = {};
            if (filter) {
                query[filter[0]] = { '$regex': filter[1], '$options': 'i' };
            }
            
            const allVoucher = await Voucher.find(query)
                .limit(limit)
                .skip(page * limit)
                .sort({ createdAt: -1 });

            resolve({
                status: 'OK',
                message: 'Success',
                data: allVoucher,
                total: totalVoucher,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalVoucher / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Logic for applying a voucher at checkout
const checkVoucherValid = (code, orderTotal) => {
    return new Promise(async (resolve, reject) => {
        try {
            const voucher = await Voucher.findOne({ code: code.toUpperCase(), isActive: true });
            
            if (!voucher) {
                return resolve({ status: 'ERR', message: 'Voucher code is invalid or inactive' });
            }

            if (new Date() > voucher.expirationDate) {
                return resolve({ status: 'ERR', message: 'Voucher has expired' });
            }

            if (voucher.usedCount >= voucher.maxUses) {
                return resolve({ status: 'ERR', message: 'Voucher usage limit reached' });
            }

            if (orderTotal < voucher.minOrderValue) {
                return resolve({ 
                    status: 'ERR', 
                    message: `Minimum order value of ${voucher.minOrderValue} required` 
                });
            }

            resolve({
                status: 'OK',
                message: 'Voucher applied successfully',
                data: voucher
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createVoucher,
    updateVoucher,
    deleteVoucher,
    getDetailsVoucher,
    getAllVoucher,
    checkVoucherValid
};