const express = require('express')
const router = express.Router()

const {
  getAllConsultations,
  getSingleConsultation,
  updateConsultation,
  createConsultation,
  deleteConsultation,
} = require('../controllers/consult')

router.get('/', getAllConsultations)
router.get('/:id', getSingleConsultation)
router.get('/', updateConsultation)
router.get('/', createConsultation)
router.get('/', deleteConsultation)

module.exports = router
