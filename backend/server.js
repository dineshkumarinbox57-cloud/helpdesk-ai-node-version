require("dotenv").config();
const http = require("http");
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const ticketController = require("./controllers/ticketController");
const aiSessionController = require("./controllers/aiSessionController");
const aiController = require("./controllers/aiController");

const PORT = 5000;

const server = http.createServer((req, res) => {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    // ==========================
    // AUTH ROUTES
    // ==========================
    if (req.url.startsWith("/api/auth")) {
        authRoutes(req, res);
        return;
    }

    // ==========================
    // CREATE TICKET
    // ==========================
    if (
        req.method === "POST" &&
        req.url === "/api/tickets/create"
    ) {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                req.body = JSON.parse(body);

                console.log("REQ BODY =", req.body);

                ticketController.createTicket(
                    req,
                    res
                );

            } catch (error) {

                console.log(error);

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(
                    JSON.stringify({
                        success: false,
                        message: "Invalid JSON"
                    })
                );
            }
        });

        return;
    }

    // ==========================
    // GET ALL TICKETS
    // ==========================
    if (
        req.method === "GET" &&
        req.url === "/api/tickets/all"
    ) {

        ticketController.getTickets(
            req,
            res
        );

        return;
    }

    // ==========================
    // GET USER TICKETS
    // ==========================
    if (
        req.method === "GET" &&
        req.url.startsWith("/api/tickets/user/")
    ) {

        const email = req.url.split("/").pop();

        ticketController.getUserTickets(
            req,
            res,
            email
        );

        return;
    }

    //AI SESSIONS GET
    if (
        req.method === "GET" &&
        req.url.startsWith("/api/ai/sessions/")
    ) {

        const email = req.url.split("/").pop();

        aiSessionController.getSessions(
            req,
            res,
            email
        );

        return;
    }

    if (
        req.method === "DELETE" &&
        req.url.startsWith("/api/ai/sessions/")
    ) {

        const id = req.url.split("/").pop();

        aiSessionController.deleteSession(
            req,
            res,
            id
        );

        return;
    }

    // ==========================
    // RESOLVE TICKET
    // ==========================
    if (
        req.method === "PUT" &&
        req.url.startsWith("/api/tickets/resolve/")
    ) {

        const id = req.url.split("/").pop();

        ticketController.resolveTicket(
            req,
            res,
            id
        );

        return;
    }

    // ==========================
    // DELETE TICKET
    // ==========================
    if (
        req.method === "DELETE" &&
        req.url.startsWith("/api/tickets/delete/")
    ) {

        const id = req.url.split("/").pop();

        ticketController.deleteTicket(
            req,
            res,
            id
        );

        return;
    }

        // ==========================
        // AI TROUBLESHOOT
        // ==========================
        if (
            req.method === "POST" &&
            req.url === "/api/ai/troubleshoot"
        ) {

            let body = "";

            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {

                req.body = JSON.parse(body);

                aiController.troubleshoot(
                    req,
                    res
                );
            });

            return;
        }

    // ==========================
    // FEEDBACK 
    // ==========================

       if (
            req.method === "POST" &&
            req.url.startsWith("/api/ai/feedback")
        ) {

            let body = "";

            req.on("data", chunk => {
                body += chunk.toString();
            });

            req.on("end", () => {

                req.body = body ? JSON.parse(body) : {}
                aiController.feedback(
                    req,
                    res
                );
            });

            return;
        }
        
    // ==========================
    // ROUTE NOT FOUND
    // ==========================
    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            success: false,
            message: "Route not found"
        })
    );
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});