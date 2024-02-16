const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorHandler, Success } = require('../utils/responseHandler');

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return errorHandler(res, 400, 'Isi Semua Input!');
        }

        const hashPassword = await bcrypt.hash(password, 8);

        const existingUsername = await User.findOne({ username }).exec();
        const existingEmail = await User.findOne({ email }).exec();

        if (existingUsername || existingEmail) {
            return errorHandler(res, 400, existingUsername ? 'Username Sudah Terdaftar' : 'Email Sudah Terdaftar');

        }
        const newUser = await User.create({ username, email, password: hashPassword });

        const { password: pass, ...rest } = newUser._doc;

        return Success(res, 201, 'Register Berhasil', { ...rest });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorHandler(res, 400, 'Isi Semua Input!');
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return errorHandler(res, 404, 'User Tidak Terdaftar');
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return errorHandler(res, 401, 'Password Salah!');
        }

        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET_KEY
        )

        const { password: pass, ...rest } = existingUser._doc;

        return Success(res, 200, 'Login Berhasil', { ...rest, token });
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}

module.exports = {
    signUp,
    signIn
}
