import elasticApm from "elastic-apm-node";

elasticApm.start({
  serviceName: "e-commerce-api",
  apiKey: "",
  serverUrl: "http://localhost:8200",
  environment: "production",
});

import dotenv from "dotenv";
import { App } from "./App";

(async () => {
  dotenv.config();
  const port = process.env.SERVER_PORT ?? 3001;
  const app = await new App().run();

  try {
    app.express.listen(port, () => console.log(`api stated on port ${port}`));
  } catch (error) {
    console.log(`error to start api on port ${port}:\n ${error}`);
  }
})();
