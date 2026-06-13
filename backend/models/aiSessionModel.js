const db = require("../config/db");

const AiSessionModel = {

    createSession: (
        email,
        title,
        aiResponse,
        callback
    ) => {

        const sql = `
            INSERT INTO ai_sessions
            (
                email,
                title,
                aiResponse,
                status
            )
            VALUES (?, ?, ?, 'OPEN')
        `;

        db.query(
            sql,
            [
                email,
                title,
                aiResponse
            ],
            callback
        );
    },

    getSessionsByEmail: (
        email,
        callback
    ) => {

        const sql = `
            SELECT *
            FROM ai_sessions
            WHERE email = ?
            ORDER BY id DESC
        `;

        db.query(
            sql,
            [email],
            callback
        );
    },

    deleteSession: (
        id,
        callback
    ) => {

        const sql = `
            DELETE FROM ai_sessions
            WHERE id = ?
        `;

        db.query(
            sql,
            [id],
            callback
        );
    },

    markResolved: (
        id,
        callback
    ) => {

        const sql = `
            UPDATE ai_sessions
            SET status = 'RESOLVED'
            WHERE id = ?
        `;

        db.query(
            sql,
            [id],
            callback
        );
    },
    
    getSessionById: (
            id,
            callback
        ) => {

            const sql = `
                SELECT *
                FROM ai_sessions
                WHERE id = ?
            `;

            db.query(
                sql,
                [id],
                callback
            );
        }

};

module.exports = AiSessionModel;