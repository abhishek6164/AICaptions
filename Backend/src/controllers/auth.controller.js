const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
    const {
        username,
        password
    } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        username
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS
        sameSite: "none", // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(201).json({
        message: "User created successfully",
        user
    })
}

async function loginController(req, res) {
    const {
        username,
        password
    } = req.body;

    const user = await userModel.findOne({
        username
    })
    if (!user) return res.status(400).json({
        message: "User not found"
    })

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({
        message: "Invalid password"
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username
        }
    })
}

module.exports = {
    registerController,
    loginController
}