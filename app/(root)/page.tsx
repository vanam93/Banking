import React from 'react'
import HeaderBox from './../../components/ui/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn={firstName: 'Vanam ', lastName:'Gangireddy'}
  return (
   
      <section className="home">
        <div className='home-content'>
          <header className="home-header">
             <HeaderBox
             type="greeting"
             title="Welcome"
             user={loggedIn?.firstName||"Guest"}
             subtext="Access and manage you transcations and bank account"
             />
          </header>

          <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={12345.13}
          />
        </div>
      </section>
   
  )
}

export default Home
