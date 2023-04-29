const express = require('express');
const { auth } = require('../middleware/auth');
const {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployeeById,
} = require('../controllers/employees');
const router = express.Router();

router
  // get all employee
  .get('/', auth, getAllEmployees)
  // get employee by id
  .get('/:id', auth, getEmployeeById)
  // add employee
  .post('/add', auth, addEmployee)
  // remove by id
  .post('/remove/:id', auth, removeEmployee)
  // edit by id
  .put('/edit/:id', auth, editEmployee);

module.exports = router;
