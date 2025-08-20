"use client";
import { Transaction } from "@/models/transaction";

type Props = {
  items: Transaction[];
  onSelect: (id: number) => void;
  selectedId: number | null;
};

function currency(n: number) {
  try { return n.toLocaleString(undefined, { style: "currency", currency: "BRL" }); }
  catch { return `R$ ${n.toFixed(2)}`; }
}

export default function TransactionList({ items, onSelect, selectedId }: Props) {
  if (items.length === 0) return <div className="card"><p className="state">No transactions yet.</p></div>;

  return (
    <ul className="card list" aria-label="Transactions">
      {items.map((t) => {
        const isSelected = selectedId === t.id;
        return (
          <li key={t.id} className={`row ${isSelected ? "isSelected" : ""}`}>
            <button className="rowBtn" type="button" onClick={() => onSelect(t.id)}>
                <span className="desc">{t.description}</span>
                <span className="amount">{currency(t.amount)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
