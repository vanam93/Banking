import { getLoggedInUser, signOut } from '@/lib/actions/user.actions';
import Image from 'next/image'
import Router from 'next/router';
import React from 'react'

const handleLogout = async ()=>{
    const logout=await signOut()
    if(logout) {
      Router.push('/sign-in')
    }
}
const Footer = ({user,type}:FooterProps) => {
 
  return (
    <footer className="footer ">
       <div className={type=="mobile"?'footer_name-mobile':'footer_name'}>
         <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
       </div>

       <div className={type=="mobile"?'footer_email-mobile':'footer_email'}>
         <h1 className="text-16 font-bold text-gray-700">{user.name}</h1>
         <p className="text-14 truncate  font-semibold text-gray-500">{user.email}</p>
       </div>

       <div className="footer_image">
        <Image
         src="/icons/logout.svg"
         fill
         alt="logout"
         onClick={handleLogout}
        />
       </div>
    </footer>
  )
}

export default Footer
