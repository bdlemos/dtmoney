import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { rem } from "polished";


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    removeTransaction: (transaction: number) => Promise<void>;
}

interface TransactionsProviderProps {
    children: React.ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(Response => setTransactions(Response.data.transactions),);
    }
    , []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});
        const {transaction} = response.data;

        setTransactions([...transactions, transaction]);
    }

    async function removeTransaction(transactionId: number){
        await api.delete(`/transactions/${transactionId}`);
        const newTransactions = transactions.filter(transaction => transactionId !== transaction.id);
        setTransactions(newTransactions);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction, removeTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}