import { GlobalStyle } from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';
import { useState } from 'react';
import Modal from 'react-modal';
import { TransactionsProvider } from '../src/hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setisNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setisNewTransactionModalOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setisNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionModal isNewTransactionModalOpen={isNewTransactionModalOpen} handleCloseNewTransactionModal={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

