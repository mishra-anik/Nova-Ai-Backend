import "dotenv/config";
import app from "./src/app.mjs";
import connectDB from "./src/db/db.mjs";
import setupSocketServer from "./src/socket/socket.server.mjs";
import http from "http";

const httpServer = http.createServer(app);

const io = setupSocketServer(httpServer);

connectDB();


const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
