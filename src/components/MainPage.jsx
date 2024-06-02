import React from 'react';
import CountersList from './CountersList';
import Header from './Header';
import ModalWindow from './Modals';

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
