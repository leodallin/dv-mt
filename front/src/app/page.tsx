import TransactionForm from "@/components/TransactionForm";
import styles from "./page.module.css";
import TransactionDetail from "@/components/TransactionDetail";
import { useState } from "react";

export default function Home() {
  const [transactionId, setTransactionId] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TransactionForm setTransaction={setTransactionId}/>
        <TransactionDetail transactionId={transactionId}/>
      </main>
    </div>
  );
}
