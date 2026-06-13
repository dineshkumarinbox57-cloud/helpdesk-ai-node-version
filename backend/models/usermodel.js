const db = require("../config/db");

const UserModel = {

    getUserByEmail: (email, callback) => {

        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], callback);
    },

    createUser: (userData, callback) => {

        const sql =
        `INSERT INTO users
        (username,email,password)
        VALUES (?,?,?)`;

        db.query(
            sql,
            [
                userData.username,
                userData.email,
                userData.password
            ],
            callback
        );
    }
};
module.exports = UserModel;