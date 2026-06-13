const TicketModel = require("../models/ticketModel");

const TicketController = {

    createTicket: (req, res) => {

        console.log(req.body);

        const {
            title,
            description,
            category,
            priority,
            email
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !priority ||
            !email
        ) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: "All fields are required"
            }));

            return;
        }

        console.log("REQ BODY =", req.body);
        console.log("EMAIL =", req.body.email);

        TicketModel.createTicket(
            email,
            title,
            description,
            category,
            priority,
            (err, result) => {

                if (err) {

                    console.log(err);

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
                    message: "Ticket created successfully",
                    ticketId: result.insertId
                }));
            }
        );
    },

    getTickets: (req, res) => {

        TicketModel.getTickets((err, results) => {

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
        });
    },

    getUserTickets: (req, res, email) => {

        TicketModel.getUserTickets(
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

    resolveTicket: (req, res, id) => {

    TicketModel.resolveTicket(
        id,
        (err, result) => {

            if (res.headersSent) {
                return;
            }

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
                message: "Ticket resolved"
            }));
        }
    );
},

        deleteTicket: (req, res, id) => {

    TicketModel.deleteTicket(
        id,
        (err, result) => {

            if (res.headersSent) {
                return;
            }

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
                message: "Ticket deleted"
            }));
        }
    );
},
}
module.exports = TicketController;