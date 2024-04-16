import React from 'react';
import CountersList from './CountersList';
import AddCounterModal from './AddCounterModal';
import Header from './Header';

const MainPage = () => {
  return (
    <>
      <section className='section__main'>
        <Header />
        <AddCounterModal />
        <CountersList />
      </section>
    </>
  );
}

export default MainPage;
