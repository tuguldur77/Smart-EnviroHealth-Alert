import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "Server working fine!" });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
