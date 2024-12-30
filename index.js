import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./src/router.js";

// Create Express webapp
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log("Express server running on *:" + port);
});
