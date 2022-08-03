const Consult = require('../models/consult')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

//get all consultations
const getAllConsultations = async (req, res) => {
  const consultations = await Consult.find()
  res.status(StatusCodes.OK).json(consultations)
}

// get single consultation
const getSingleConsultation = async (req, res) => {
  const { id } = req.params
  const consultation = await Consult.findById(id)
  if (!consultation) {
    throw new NotFoundError(`The consultation wit id ${id} does not exist`)
  }
  res.status(StatusCodes.OK).json(consultation)
}

// update consultation
const updateConsultation = async (req, res) => {
  const { id } = req.body
  const updatedConsultation = await Consult.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  )
  if (!updatedConsultation) {
    throw new NotFoundError(`The consultation wit id ${id} does not exist`)
  }
  res.status(StatusCodes.CREATED).json(updatedConsultation)
}

// delete consultation
const deleteConsultation = async (req, res) => {
  const { id } = req.params
  await Consult.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({ msg: 'The consultatin has been deleted' })
}

// create consultation
const createConsultation = async (req, res) => {
  await Consult.create(req.body)
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'your consultation detatils have been saved' })
}

module.exports = {
  getAllConsultations,
  getSingleConsultation,
  deleteConsultation,
  updateConsultation,
  createConsultation,
}
