const express = require("express");
require("dotenv").config();

const dbConfig = require("./utils/dbConfig");

const PORT = process.env.PORT || 5000;

const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const corsoptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsoptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
// app.user("/api/story", storyRouter);

app.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT} `);
});
