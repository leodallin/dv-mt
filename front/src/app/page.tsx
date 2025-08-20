"use client";
import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import TransactionDetail from "@/components/TransactionDetail";
import { Transaction } from "@/models/transaction";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/transactions`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Transaction[] = await res.json();
      setTransactions(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAll();
  }, []);

  const handleCreated = (tx: Transaction): void => {
    setTransactions((prev) => [tx, ...prev]);
    setSelectedId(tx.id);
  };

  const selectedTx = transactions.find((t) => t.id === selectedId) ?? null;

  return (
    <main className="container">
      <div className="header">
        <h1 className="h1">Transactions</h1>
        <span className="badge">Total: {transactions.length}</span>
      </div>

      <div className="grid2">
        <TransactionForm onCreated={handleCreated} apiBase={API} />
        <TransactionDetail tx={selectedTx} />
      </div>

      {loading && <p className="state">Loading…</p>}
      {error && <p className="state error">{error}</p>}

      <TransactionList items={transactions} onSelect={setSelectedId} selectedId={selectedId} />
    </main>
  );
}
