const { prisma } = require('../prisma/prisma-client');

/**
 * This function retrieves all employees from a database using Prisma and returns them as a JSON
 * response.
 * @param req - req stands for "request" and it is an object that contains information about the HTTP
 * request that was made to the server. It includes information such as the request method (GET, POST,
 * etc.), the request headers, the request URL, and any data that was sent in the request body.
 * @param res - `res` is the response object that is used to send the HTTP response back to the client.
 * It is an object that contains methods for setting the HTTP status code, headers, and body of the
 * response. In this code snippet, `res` is used to send a JSON response with a list
 */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({});

    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong...' });
  }
};

/**
 * This function adds a new employee to the database and returns the employee object if successful,
 * otherwise it returns an error message.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is sent back to the client making the request. It
 * contains information such as the status code, headers, and the response body. In this function,
 * `res` is used to send a response back to the client with either a success status code and the
 * created
 * @returns If the required fields are not filled out, a 400 status code with a message will be
 * returned. If the employee is successfully created, a 201 status code with the employee data will be
 * returned. If there is an error, a 500 status code with a message will be returned.
 */
const addEmployee = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data.firstName ||
      !data.lastName ||
      !data.address ||
      !data.age
    ) {
      return res.status(400).json({
        message: 'Please, fill out required fields!',
      });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong...' });
  }
};

/**
 * This function removes an employee from a database using their ID and returns a success message or an
 * error message if something goes wrong.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request method, headers, and body. It is passed as the first
 * parameter to the removeEmployee function.
 * @param res - `res` is the response object that is used to send a response back to the client who
 * made the request. It is an instance of the `http.ServerResponse` class in Node.js. The `res` object
 * has methods like `res.status()` to set the HTTP status code of the response
 */
const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json({ message: 'OK!' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong...' });
  }
};

/**
 * This function edits an employee's data in a database using the Prisma ORM.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request method, headers, and body. It is typically passed as the
 * first parameter to an Express route handler function.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and response body.
 * In this case, `res` is used to send a response back to the client with a status code of
 */
const editEmployee = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;

    console.log(id);

    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json({ message: 'OK!' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong...' });
  }
};

/**
 * This is an asynchronous function that retrieves an employee by their ID using Prisma ORM and returns
 * it as a JSON response.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as the first
 * parameter to the function.
 * @param res - `res` stands for response and it is an object that represents the HTTP response that an
 * Express.js server sends when it receives an HTTP request. It contains methods and properties that
 * allow the server to send data back to the client, such as the status code, headers, and the response
 * body. In
 */
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong...' });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  removeEmployee,
  editEmployee,
  getEmployeeById,
};
