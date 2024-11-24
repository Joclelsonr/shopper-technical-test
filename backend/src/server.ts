import { configDotenv } from "dotenv";
import app from "./app";

configDotenv();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
