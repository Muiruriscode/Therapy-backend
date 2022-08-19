const express = require('express')
const router = express.Router()

const {
  getAllConsultations,
  getSingleConsultation,
  updateConsultation,
  createConsultation,
  deleteConsultation,
} = require('../controllers/consult')
const { verifyUser, verifyTokenandAdmin } = require('../middleware/auth')

router.get('/', verifyTokenandAdmin, getAllConsultations)
router.get('/:id', verifyUser, getSingleConsultation)
router.patch('/', verifyTokenandAdmin, updateConsultation)
router.post('/',verifyUser, createConsultation)
router.delete('/', verifyTokenandAdmin, deleteConsultation)

module.exports = router
