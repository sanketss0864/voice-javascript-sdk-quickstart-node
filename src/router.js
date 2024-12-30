import { Router } from "express";
import { tokenGenerator, voiceResponse } from "./handler.js";

const router = Router();

router.get("/token", (req, res) => {
  res.send(tokenGenerator());
});

router.post("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(voiceResponse(req.body));
});

export default router;
