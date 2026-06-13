const db = require("../config/db");

const TicketModel = {

    createTicket: (
        email,
        title,
        description,
        category,
        priority,
        callback
    ) => {

        const sql = `
            INSERT INTO tickets
            (email, title, description, category, priority)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [email, title, description, category, priority],
            callback
        );
    },

    getTickets: (callback) => {

        const sql = `
            SELECT *
            FROM tickets
            ORDER BY created_at DESC
        `;

        db.query(sql, callback);
    },

    getUserTickets: (email, callback) => {

        const sql = `
            SELECT *
            FROM tickets
            WHERE email = ?
            ORDER BY created_at DESC
        `;

        db.query(sql, [email], callback);
    },

    resolveTicket: (id, callback) => {

        const sql = `
            UPDATE tickets
            SET status = 'RESOLVED'
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    },

    deleteTicket: (id, callback) => {

        const sql = `
            DELETE FROM tickets
            WHERE id = ?
        `;

        db.query(sql, [id], callback);
    }

};

module.exports = TicketModel;