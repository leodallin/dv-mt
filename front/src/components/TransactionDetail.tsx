import { Transaction } from "@/models/transaction";
import { useEffect, useState } from "react"



const TransactionDetail = ({transactionId}: {transactionId: number | null}) => {
    const [transaction, setTransaction] = useState<Transaction>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTransactions = async () => { 
            if(!transactionId) {
                setTransaction(undefined);
                return;
            };
            setLoading(true);
            const res = await fetch(process.env.API_URL ?? "http://localhost:3000/api/transactions");

            if (res.ok) {
                const data = res.body;
                setTransaction(data);
                console.log("Transactions fetched:", data);
            } else {
                console.error("Failed to fetch transactions");
            }

            setLoading(false);
        }

        fetchTransactions();

        return () => {
            console.log("Transactions component unmounted");
        }
    }, [transactionId]);


    return <>
        {transaction &&
            <div key={transaction.id}>
                <h3>{transaction.description}</h3>
                <p>Amount: {transaction.amount}</p>
            </div>
        }
    </>
}

export default TransactionDetail