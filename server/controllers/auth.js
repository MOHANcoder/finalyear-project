const jwt = require("jsonwebtoken");
const bcrpyt = require("bcryptjs");
const User = require("../models/User");
const createError = require("../utils/createError");

const cookieExpiry = 24 * 60 * 60 * 1000;

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;
            const storedUser = await User.findOne({ email });
            if (storedUser) {
                return next(createError(409, "Email ID is already registered!"));
            }
            const salt = await bcrpyt.genSalt();
            const hash = await bcrpyt.hash(password, salt);
            const user = new User({ name, email, password: hash, role });
            await user.save();
            res.status(200).json({ message: "User registered successfully." });
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const storedUser = await User.findOne({ email });
            if (!storedUser) {
                return next(createError(401, "Invalid credentials."));
            }
            const isMatched = await bcrpyt.compare(password, storedUser.password);
            if (!isMatched) {
                return next(createError(401, "Invalid credentials."));
            }
            const token = jwt.sign({ userId: storedUser._id, email, role: storedUser.role }, process.env.SECRET_KEY, { expiresIn: "24h" });
            res.cookie('token', token, { maxAge: cookieExpiry, httpOnly: false });
            res.status(200).json({ message: "User Logged In successfully.", username: storedUser.name, role: storedUser.role });
            // res.redirect("http://localhost:5173/");
        } catch (error) {
            next(error);
        }
    },

    logout: async (req, res, next) => {
        try {
            res.clearCookie('token');
            res.status(200).json({ message: "User Logged Out Successfully." });
            // res.redirect("http://localhost:5173/");
        } catch (error) {
            next(error);
        }
    },

    authenticate: async (req, res, next) => {
        try {
            const { token } = req.cookies;
            if (!token) {
                return next(createError(401, "User is not authenticated."));
            }
            const user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return next(createError(401, "Invalid Token"));
            } else if (error.name === 'TokenExpiredError') {
                return next(createError(401, "Token has expired."));
            } else {
                next(error);
            }
        }
    },
    authorize: (roles) => async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            next(createError(403, "Forbidden by the server, Insufficient privileges."));
        }
    }
}