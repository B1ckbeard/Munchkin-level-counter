import React from 'react';
import CountersList from '../components/CountersList';
import Header from '../components/Header';
import ModalWindow from '../components/Modals';

const MainPage = () => {
  return (
    <>
      <section className='section__main'>
        <Header />
        <ModalWindow />
        <CountersList />
      </section>
    </>
  );
}

export default MainPage;
