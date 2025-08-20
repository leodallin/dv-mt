"use client";
import { useState } from "react";
import { Transaction } from "@/models/transaction";

type Props = { onCreated: (t: Transaction) => void; apiBase: string };

export default function TransactionForm({ onCreated, apiBase }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setOk(false);

    const parsed = Number(amount);
    if (!description.trim() || Number.isNaN(parsed)) {
      setError("Fill all fields with valid values.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), amount: parsed }),
      });
      if (!res.ok) throw new Error("Error submitting transaction");
      const created: Transaction = await res.json();
      onCreated(created);
      setDescription("");
      setAmount("");
      setOk(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="formTitle">New Transaction</h2>
      <div className="grid">
        <div>
          <label className="label">Description</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. Coffee"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={80}
          />
          <div className="helper">Up to 80 characters</div>
        </div>
        <div>
          <label className="label">Amount</label>
          <input
            className="input"
            inputMode="decimal"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="helper">Positive or negative</div>
        </div>
        {error && <p className="error">{error}</p>}
        {!error && ok && <p className="state ok">Saved successfully</p>}
        <div className="actions">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
