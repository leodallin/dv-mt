import { Dispatch, SetStateAction, useState } from "react";

const TransactionForm = ({setTransaction}: {setTransaction: Dispatch<SetStateAction<number | null>>}) => {
    const [transactionDescription, setTransactionDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTransaction = {
            description: transactionDescription,
            amount: transactionAmount
        };

        fetch(process.env.API_URL ?? "http://localhost:3000/api/transactions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTransaction)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Transaction created:", data);
            setTransactionDescription('');
            setTransactionAmount(0);
            setTransaction(data.id);
        })
        .catch(error => {
            console.error("Error creating transaction:", error);
        });
    };


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={transactionDescription} placeholder="Transaction Name" onChange={(e) => setTransactionDescription(e.target.value)} />
      <input type="number" value={transactionAmount} placeholder="Amount" onChange={(e) => setTransactionAmount(Number(e.target.value))} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;