const TicketController = require("../controllers/ticketController");

module.exports = (req, res) => {

    if (
        req.url === "/api/tickets/create" &&
        req.method === "POST"
    ) {
        TicketController.createTicket(req, res);
    }

    if (
        req.url === "/api/tickets/all" &&
        req.method === "GET"
    ) {
        TicketController.getTickets(req, res);
    }
};