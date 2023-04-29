const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * This is a login function that checks if the email and password provided by the user match with the
 * ones stored in the database, and returns the user's information if they are correct.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `status` and `json` that are used to set the HTTP status code
 * and send a JSON response, respectively.
 * @returns The `login` function returns a JSON response with the user's id, email, and name if the
 * email and password provided are correct and match a user in the database. If the email or password
 * is incorrect, it returns a JSON response with an error message. If the email and password are not
 * provided, it returns a JSON response with a message asking the user to fill out the required fields.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please, fill out required fields!',
      });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    const isPasswordCorrect =
      user &&
      (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, {
          expiresIn: '15d',
        }),
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Incorrect email or password' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong...' });
  }
};

/**
 * This function registers a new user by checking if required fields are filled, checking if the user
 * already exists, hashing the password, creating a new user in the database, and returning a token.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `status` to set the HTTP status code, `json` to send a JSON
 * response, and `send` to send a plain text response.
 * @returns The function `register` returns a JSON response with the user's id, email, name, and a JWT
 * token if the user was successfully registered. If there was an error during registration, it returns
 * a JSON response with an error message.
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: 'Please, fill out required fields!',
      });
    }

    const registeredUser = await prisma.user.findFirst({
      where: { email },
    });

    if (registeredUser) {
      return res.status(400).json({
        message: 'User already exist!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, {
          expiresIn: '15d',
        }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Can't register user" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Something went wrong...' });
  }
};

/**
 * This function returns the current user as a JSON object with a 200 status code.
 * @param req - req stands for "request" and it is an object that represents the HTTP request made by
 * the client to the server. It contains information about the request such as the URL, headers,
 * parameters, and body.
 * @param res - `res` stands for response and it is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods and properties that allow
 * the app to send data back to the client, such as the status code, headers, and the response body. In
 * the
 * @returns The `current` function is returning a JSON response with a status code of 200 and the
 * `req.user` object as the response body.
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { login, register, current };
