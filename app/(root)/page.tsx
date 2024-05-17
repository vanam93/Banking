import React from 'react'
import HeaderBox from './../../components/ui/HeaderBox';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
  const loggedIn={firstName: 'Vanam ', lastName:'Gangireddy',email:'vanam93@gmail.com'}
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
          <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={12345.13}
          />
          </header>
          Recent transcations
        </div>
         <RightSidebar
         user={loggedIn}
         transactions={[]}
         banks={[{currentBalance:124.50},{currentBalance:2312.53}]}
         />
      </section>
   
  )
}

export default Home
