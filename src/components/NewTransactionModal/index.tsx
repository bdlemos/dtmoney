import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import fechar from '../../assets/fechar.svg';
import entrada from '../../assets/entradas.svg';
import saida from '../../assets/saidas.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isNewTransactionModalOpen: boolean;
    handleCloseNewTransactionModal: () => void;
    }

export function NewTransactionModal( {isNewTransactionModalOpen, handleCloseNewTransactionModal}: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();
    
    const [title, setTitle] = useState('');
    const [amount,setAmount] = useState(0);
    const [category,setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        handleCloseNewTransactionModal();
    }

  return (
    <Modal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className={"react-modal-content"}
    >
        <button type="button" onClick={handleCloseNewTransactionModal} className="react-modal-close">
            <img src={fechar} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>

            <input placeholder="Título" value={title} onChange={event=>setTitle(event.target.value)} />

            <input type="number" placeholder="Valor" value={amount} onChange={event=>setAmount((Number(event.target.value)))}/>

            <TransactionTypeContainer>
                <RadioBox $isActive={type==='deposit'} $activeColor='green' type="button" onClick={()=>{setType('deposit')}} >
                    <img src={entrada} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox $isActive={type==='withdraw'} $activeColor='red' type="button" onClick={()=>{setType('withdraw')}}>
                    <img src={saida} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>

            <input placeholder="Categoria" value={category} onChange={event=>setCategory(event.target.value)} />
            <button type="submit">Cadastrar</button>
        </Container>
    </Modal>
    );
}