const express = require("express");
const router = express.Router();
const VoucherController = require('../controllers/VoucherController');
const { authMiddleWare } = require("../middleware/authMiddleware");

// Admin routes
router.post('/create', authMiddleWare, VoucherController.createVoucher);
router.put('/update/:id', authMiddleWare, VoucherController.updateVoucher);
router.delete('/delete/:id', authMiddleWare, VoucherController.deleteVoucher);

// Public/User routes
router.get('/get-all', VoucherController.getAllVoucher);
router.get('/get-details/:id', VoucherController.getDetailsVoucher);

// Checkout validation route
// This is used by the frontend to verify a code before placing an order
router.post('/check-valid', VoucherController.checkVoucherValid);

module.exports = router;