import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import setupSocketServer from "./src/socket/socket.server.js";
import http from "http";

const httpServer = http.createServer(app);

const io = setupSocketServer(httpServer);

connectDB();


const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
