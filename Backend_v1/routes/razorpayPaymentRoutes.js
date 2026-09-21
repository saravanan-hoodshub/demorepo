/*
 * WhitePanther™ Proprietary Software License
 * Version 1.0 – Effective 2025
 *
 * Copyright ©2025 HoodsHub Private Limited. All rights reserved.
 *
 * This source code file is part of the WhitePanther™ software suite developed
 * and maintained by HoodsHub Private Limited ("Licensor").
 *
 * You may not use, reproduce, modify, publish, distribute, sublicense
 *
 * Unauthorized use of this file or any part of the WhitePanther™ software is
 * strictly prohibited and may result in legal action.
 *
 * For licensing inquiries, contact: info@hoodshub.com
 */

const express = require("express");

const {
  createOrderController,
  webhookController,
  verifyPaymentController,
} = require("../controllers/razorpayContoller");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  verifyPaymentValidator,
} = require("../helpers/Validator");

/**
 * Authentication Router
 *
 * Defines all authentication-related routes including:
 * - Magic link sign-in and verification
 * - Token refresh and logout
 * - OAuth flows for Google and Microsoft including sign-in and verification
 * - Resending magic link emails
 *
 * Applies appropriate validation and authentication middleware where necessary.
 */

const router = express.Router();

router.post("/razorpay-webhook", webhookController);

// All dashboard routes require authentication
router.use(authMiddleware);

router.post("/create-order", createOrderController);

router.post("/verify-payment", verifyPaymentController);

module.exports = router;
