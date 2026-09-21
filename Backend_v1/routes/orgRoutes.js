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
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOrganization,
  getAllOrganization,
  membersOrganization,
  getOrganizationById,
  setActiveOrganization,
  getOrganizationMembers,
  createOrganizationMember,
  fetchOrganizationMemberByAccountId,
  removeAccountFromOrganization,  
  updateOrgMemberStatus
} = require("../controllers/orgController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("../shared-libs/middlewares/multerMiddleware"); // Import the multer configuration

/**
 * Organization Router
 * 
 * Provides endpoints for organization management including creation,
 * retrieval, update (with optional image upload), deletion, and member listing.
 * 
 * All routes are protected by authentication middleware.
 */

const router = express.Router();

// // Apply authentication middleware to all routes in this router
// router.use(authMiddleware);

// Create a new organization
router.post("/organization",authMiddleware, createOrganization);

// Retrieve organization details for authenticated user
router.get("/account/:accountId/get-organization",authMiddleware, getOrganization);

// Retrieve all organization details for authenticated user
router.get("/account/:accountId/get-all-organization",authMiddleware, getAllOrganization);

// set Active organization
router.post("/account/:accountId/organization/:organizationId",authMiddleware, setActiveOrganization);

// Remove User from organization
router.post("/account/:accountId/organization/:organizationId/remove-account/:userAccountId",authMiddleware, removeAccountFromOrganization);

// Delete the authenticated user's organization
router.delete("/delete-organization",authMiddleware, deleteOrganization);

// Update organization identified by accountId with optional image upload
router.patch(
  "/account/:accountId/update-organization",authMiddleware,
  multer.single("organization_picture"),
  updateOrganization
);

// Get members associated with the organization
router.get("/members",authMiddleware, membersOrganization);

//getting an organization using organizationId
router.get("/:organizationId",authMiddleware,getOrganizationById)

//getting list of members in organization
router.get("/:organizationId/organizationMembers",authMiddleware,getOrganizationMembers)

//getting list of members in organization(strictly this api used only for socket)
router.get("/:organizationId/organizationMember",getOrganizationMembers)


//creating or adding an member to organization
router.post("/:organizationId/createMembers",createOrganizationMember)

router.get("/:organizationId/account/:accountId/member",fetchOrganizationMemberByAccountId)

router.patch("/:organizationId/updateUserStatus",updateOrgMemberStatus)

module.exports = router;
