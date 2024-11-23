import Express from "express";

const app = Express();
app.use(Express.json());

const PORT = 8080;

app.get("/", (request, response) => {
  response.send({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
