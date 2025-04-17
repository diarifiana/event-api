import express, { Express, json } from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware";
import { PORT } from "./config";
import { SampleRouter } from "./modules/sample/sample.router";

export class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(json());
  }

  private routes() {
    const sampleRouter = new SampleRouter();
    this.app.use("/samples", sampleRouter.getRouter());
  }

  private handleError() {
    this.app.use(errorMiddleware);
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT: ${PORT}`);
    });
  }
}
