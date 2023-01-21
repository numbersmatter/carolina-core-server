/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { functions } from "./firebase";
import * as express from "express";
import type { Request, Response, NextFunction } from "express";
import {
  createNewDoc,
  getCollection,
  getDocData,
  setDocData,
  updateDocData,
} from "./db/crud";
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ status: "success" });
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  throw new Error("this is error");
});

app.post("/create", createNewDoc);
app.post("/set", setDocData);
app.post("/update", updateDocData);
app.post("/get", getDocData);
app.post("/collection", getCollection);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const text = err.message;
  res.status(500).json({ error: "from middleware", errorMessage: text });
});

exports.app = functions.https.onRequest(app);
