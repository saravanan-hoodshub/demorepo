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
const authMiddleware = require("../middlewares/authMiddleware");

const {
  marketingController,
  marketingFeedbackController,
  marketingMetricsController,
  marketingHealthController,
  orchestrateController,
  reportFailureController,
  chatGenerateController,  
  aiChatHealthController,
  orchestrateHealthController,
} = require("../controllers/aiServicesController");

const router = express.Router();

router.use(authMiddleware);

// MARKETING
router.post("/marketing", marketingController);
router.post("/marketing/feedback", marketingFeedbackController);
router.get("/marketing/metrics", marketingMetricsController);
router.get("/marketing/health", marketingHealthController);

// ORCHESTRATION
router.post("/orchestrate", orchestrateController);
router.post("/report-failure", reportFailureController);
router.get("/orchestrate/health", orchestrateHealthController);

// CHAT
router.post("/chat", chatGenerateController);
router.get("/chat/health", aiChatHealthController);

module.exports = router;