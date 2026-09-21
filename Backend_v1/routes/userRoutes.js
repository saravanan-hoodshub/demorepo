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
const multer = require("../shared-libs/middlewares/multerMiddleware"); // Import the multer configuration
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getUserController,
  updateUserController,
  updateUsernameController,
  GetUserAccountController,
  deleteUserAccountController,
  removeUserAccountController,
  checkUserController,
  createUserController,
  updateUserOrgController,
  updateOtpController,
  feedbackController,
  inviteUserController,
  getFeedbackController,
  updateUserServicesController,
  getUserServicesController,
  getUserEmailController,
} = require("../controllers/userController");
const { verifyFeedbackValidator, updateUserServicesValidator } = require("../helpers/Validator");

/**
 * User Router
 *
 * Defines routes to manage user data including:
 * - Retrieving user data by account ID
 * - Retrieving user details with account information
 * - Deleting user account
 * - Updating username or full profile including profile picture
 * - Checking user existence by ID (service-to-service)
 * - Creating new users
 * - Updating mail marketing OTP information
 * - Updating feed back information
 *
 * All routes are secured with authentication middleware.
 */

const router = express.Router();

// // Apply authentication middleware to all routes
// router.use(authMiddleware);

// GET USER by account ID
router.get("/account/:accountId/getuser", authMiddleware, getUserController);

// Get User details with account information
router.get("/get-user-details", authMiddleware, GetUserAccountController);

// Delete user account
router.delete("/delete-user", authMiddleware, deleteUserAccountController);

// Remove user account
router.delete("/delete-user/:id", authMiddleware, removeUserAccountController);

// Profile update (username only)
router.patch("/profile-update", authMiddleware, updateUsernameController);

// Profile update with profile picture upload
router.patch(
  "/account/:accountId/profile-update",
  authMiddleware,
  multer.single("profile_picture"),
  updateUserController,
);

// Service to service API to check user existence by ID
router.get("/check-user/:id", checkUserController);

// Service to service API to check user existence by ID
router.get("/get-email/:id", getUserEmailController);

// Create new user
router.post("/create-user", createUserController);

// Create new user
router.patch("/update-user",authMiddleware, updateUserOrgController);

// Update mail marketing OTP
router.post("/update-otp", authMiddleware, updateOtpController);

// Feed Back
router.post(
  "/feedback",
  authMiddleware,
  verifyFeedbackValidator,
  feedbackController,
);

//Invite User
router.post("/invite-user", authMiddleware, inviteUserController);

// Update user services list
router.patch(
  "/update-services",
  authMiddleware,
  updateUserServicesValidator,
  updateUserServicesController,
);

// Update user services list
router.get(
  "/organization-users",
  authMiddleware,
  getUserServicesController,
);

//Get feedback
router.get("/feedbacks", getFeedbackController);

module.exports = router;
