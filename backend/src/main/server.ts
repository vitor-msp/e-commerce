import { App } from "./app";
import dotenv from "dotenv";

(() => {
  dotenv.config();
  const port = process.env.SERVER_PORT ?? 3001;
  const app = new App();
  try {
    app.express.listen(port, () => console.log(`Api stated on port ${port}!`));
  } catch (error) {
    console.log(`Error to start api on port ${port}:\n ${error}!`);
  }
})();
