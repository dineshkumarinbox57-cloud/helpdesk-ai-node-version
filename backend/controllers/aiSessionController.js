const AiSessionModel = require("../models/aiSessionModel");

const AiSessionController = {

    getSessions: (req, res, email) => {

        AiSessionModel.getSessionsByEmail(
            email,
            (err, results) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: err.message
                    }));

                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(results));
            }
        );
    },

    deleteSession: (req, res, id) => {

        AiSessionModel.deleteSession(
            id,
            (err, result) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: err.message
                    }));

                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true,
                    message: "Session deleted"
                }));
            }
        );
    },

    markResolved: (req, res, id) => {

        AiSessionModel.markResolved(
            id,
            (err, result) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: err.message
                    }));

                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true,
                    message: "Session marked as resolved"
                }));
            }
        );
    }
};

module.exports = AiSessionController;