const express = require('express');
const router = express.Router();
const journeyPlanController = require('../controllers/journeyPlanController');
const auth = require('../middleware/auth');

// Protected routes (require authentication)
router.get('/', auth, journeyPlanController.getAllPlans);
router.get('/:id', auth, journeyPlanController.getPlanById);
router.post('/', auth, journeyPlanController.createPlan);
router.put('/:id', auth, journeyPlanController.updatePlan);
router.delete('/:id', auth, journeyPlanController.deletePlan);

module.exports = router;