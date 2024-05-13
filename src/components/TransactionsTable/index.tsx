import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";
import fechar from '../../assets/fechar.svg';


export function TransactionsTable(){
    const {transactions, removeTransaction} = useTransactions();

    async function handleRemoveTransaction(id: number){
        await removeTransaction(id);
    }

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createdAt)
                                )}
                            </td>
                            <td>
                                <button>
                                    <img src={fechar} alt="Remover transação" onClick={() => handleRemoveTransaction(transaction.id)}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}