import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

const PORT = process.env.PORT_NODE || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ status: "sucess" });
});
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
