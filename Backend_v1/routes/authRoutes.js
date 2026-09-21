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
const { check } = require("express-validator");

const {
  signInController,
  signUpController,
  verifyOtpController,
  deleteUserController,
  verifyMagicLinkSignInController,
  tokenRefreshController,
  logoutController,
  verifyOtherServiceController,
  resendOtpController,
  forgotPwdOtpController,
  verifyAccountLinkController,
  acceptInvitationController,
  resetPasswordController,
  verificationLinkMailController,
  getAiConsentController,
  updateAiConsentController,
  deleteAiDataController,
  exportAiDataController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  authValidator,
  verifyOtpValidator,
  emailValidator,
} = require("../helpers/Validator");

/**
 * Authentication Router
 *
 * Defines all authentication-related routes including:
 * - Magic link sign-in and verification
 * - Token refresh and logout
 * - Resending magic link emails
 *
 * Applies appropriate validation and authentication middleware where necessary.
 */

const router = express.Router();

// Routes

// REGISTER | POST | LOGIN - SIGNIN
router.post("/signin/magic-link", authValidator, signInController);

// Send OTP route | POST | SIGNUP - SEND-OTP
router.post("/signup/send-otp", authValidator, signUpController);

// Send OTP route | POST | FORGOT-PASSWORD - SEND-OTP
router.post(
  "/forgot-password/send-otp",
  emailValidator,
  forgotPwdOtpController,
);

//  Resend OTP route | POST | RESEND-OTP
router.post("/signup/resend-otp", emailValidator, resendOtpController);

//  Verify OTP route | POST | VERIFY-OTP
router.post("/signup/verify-otp", verifyOtpValidator, verifyOtpController);

// Reset Password | POST
router.post("/reset-password", authValidator, resetPasswordController);

// MAGIC-LINK VERIFY | POST
router.post(
  "/magic-link/verify",
  [check("token", "Please provide token").trim().notEmpty()],
  verifyMagicLinkSignInController,
);

// REFRESH TOKEN | POST
router.post("/token-refresh", tokenRefreshController);

// LOGOUT | POST
router.post("/logout", authMiddleware, logoutController);

// Account creation for other services provider
router.post(
  "/verify/other-service",
  authMiddleware,
  verifyOtherServiceController,
);





// Accept Invitation
router.post("/accept-invitation", acceptInvitationController);

// send email verification link for password reset
router.post("/send-verification-link", verificationLinkMailController);

// forget password | POST | LINK
router.post("/verify-account", verifyAccountLinkController);

/**
 * DELETE /delete-team/:team_id
 * Delete a team by team_id.
 */
// Route to delete an account by ID (DELETE /delete-account/:id)
router.delete("/delete-user/:id", authMiddleware, deleteUserController);

// --- GDPR AI Routes ---
router.get("/ai/consent", authMiddleware, getAiConsentController);

router.patch("/ai/consent", authMiddleware, updateAiConsentController);

router.delete("/ai/erasure", authMiddleware, deleteAiDataController);

// Route to trigger user data export 
router.get(
  "/user-data/export",
  authMiddleware,
  exportAiDataController,
);

module.exports = router;
