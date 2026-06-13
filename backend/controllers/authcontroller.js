const UserModel = require("../models/usermodel");

const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken")
const AuthController = {
    register: async (userData, callback) => {
        UserModel.getUserByEmail(userData.email, async (err, results) => {
            if (err) {
                return callback(err, null);
            }

            if (results.length > 0) {
                return callback(null, {
                    success: false,
                    message: "Email already exists"
                });
            }

            const hashedPassword = await hashPassword(userData.password);

            UserModel.createUser(
                {
                    username: userData.username,
                    email: userData.email,
                    password: hashedPassword
                },
                (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, {
                        success: true,
                        message: "User Registered Successfully"
                    });
                }
            );
        });
    },

    login: async (email, password, callback) => {
        UserModel.getUserByEmail(email, async (err, results) => {
            if (err) {
                return callback(err, null);
            }

            if (results.length === 0) {
                return callback(null, {
                    success: false,
                    message: "User Not Found"
                });
            }

            const user = results[0];
            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return callback(null, {
                    success: false,
                    message: "Invalid Password"
                });
            }
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                "mysecretkey",
                { expiresIn: "1d" }
                );

            return callback(null, {
                success: true,
                message: "Login Successful",
                token:token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    }
};

module.exports = AuthController;
