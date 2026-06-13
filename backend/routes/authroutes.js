const AuthController = require("../controllers/authcontroller");
const authRoutes = (req, res) => {
const auth = require("../middleware/auth");
   if (req.url === "/api/auth/register" && req.method === "POST") {

    console.log("REGISTER API HIT");

    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {

        try {

            console.log("BODY:", body);

            const data = JSON.parse(body);

            AuthController.register(data, (err, result) => {

                if (err) {
                    console.log(err);

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    return res.end(JSON.stringify({
                        success: false,
                        message: err.message
                    }));
                }

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(result));
            });

        } catch (error) {

            console.log("JSON ERROR:", error);

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: error.message
            }));
        }
    });

    return;
}

    if (req.url === "/api/auth/login" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const data = JSON.parse(body);
                console.log("BODY RECEIVED:",body)

            AuthController.login(
                data.email,
                data.password,
                (err, result) => {

                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify(result));
                }
            );
        });
    }

    if (
            req.url === "/api/auth/profile" &&
            req.method === "GET"
        ) {

            auth(req, res, () => {

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true,
                    user: req.user
                }));

            });

            return;
        }
};
module.exports = authRoutes;