"use client";
import { Transaction } from "@/models/transaction";

function currency(n: number) {
  try { return n.toLocaleString(undefined, { style: "currency", currency: "BRL" }); }
  catch { return `R$ ${n.toFixed(2)}`; }
}

export default function TransactionDetail({ tx }: { tx: Transaction | null }) {
  if (!tx) return <div className="card"><p className="state">Select a transaction to see details.</p></div>;

  return (
    <div className="card">
      <h2 className="formTitle">Details</h2>
      <div className="detailGrid">
        <div className="kv"><span>ID</span><span>{tx.id}</span></div>
        <div className="kv"><span>Description</span><span>{tx.description}</span></div>
        <div className="kv"><span>Amount</span><span>{currency(tx.amount)}</span></div>
      </div>
    </div>
  );
}
