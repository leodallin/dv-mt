const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const transactions = [];

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.get("/transactions/:id", (req, res) => {
  const id = Number(req.params.id);
  const tx = transactions.find((t) => t.id === id);
  if (!tx) return res.status(404).json({ error: "Not found" });
  res.json(tx);
});

app.post("/transactions", (req, res) => {
  const { amount, description } = req.body;
  if (
    typeof amount !== "number" ||
    !isFinite(amount) ||
    !description ||
    typeof description !== "string"
  ) {
    return res.status(400).json({ error: "Invalid transaction data" });
  }
  const transaction = {
    id: Date.now(),
    amount,
    description: description.trim(),
  };
  transactions.unshift(transaction);
  res.status(201).json(transaction);
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

module.exports = app; // exported for tests
