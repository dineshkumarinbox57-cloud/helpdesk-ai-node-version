const { GoogleGenerativeAI } = require("@google/generative-ai");
const AiSessionModel = require("../models/aiSessionModel");
const TicketModel = require("../models/ticketModel");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const aiController = {

    troubleshoot: async (req, res) => {

        try {

            const {
                email,
                description
            } = req.body;

            if (!email || !description) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Email and description are required"
                }));

                return;
            }

            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash"
            });

            /*console.log("KEY =", process.env.GEMINI_API_KEY);*/

            const result = await model.generateContent(
                `You are an IT Helpdesk Assistant.
                
Issue:
${description}

Provide troubleshooting steps in simple numbered format.`
            );

            const aiResponse =
                result.response.text();
            console.log("SESSION SAVED FOR EMAIL =", email);
            AiSessionModel.createSession(
                email,
                description,
                aiResponse,
                (err, dbResult) => {

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
                        sessionId: dbResult.insertId,
                        aiResponse
                    }));
                }
            );

        } catch (error) {

            console.log(error);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: error.message
            }));
        }
    },
    
    feedback: (req, res) => {
    console.log("FEEDBACK BODY =", req.body);
    const { sessionId, resolved } = req.body;

    if (resolved) {

        AiSessionModel.markResolved(
            sessionId,
            (err) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false
                    }));

                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true,
                    message: "Issue marked as resolved"
                }));
            }
        );

    } else {

        AiSessionModel.getSessionById(
            sessionId,
            (err, results) => {

                if (err || results.length === 0) {

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false
                    }));

                    return;
                }

                const session = results[0];

                TicketModel.createTicket(
                    session.email,
                    session.title,
                    session.aiResponse,
                    "Technical",
                    "Medium",
                    (err, result) => {

                        if (err) {

                            res.writeHead(500, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                success: false
                            }));

                            return;
                        }

                        res.writeHead(200, {
                            "Content-Type": "application/json"
                        });

                        res.end(JSON.stringify({
                            success: true,
                            message: "Ticket created successfully"
                        }));
                    }
                );
            }
        );
    }
}
};

module.exports = aiController;