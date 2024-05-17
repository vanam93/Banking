'use client'
import CountUp from 'react-countup'
import React from 'react'
import { formatAmount } from './../lib/utils';

const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div className="w-full">
         <CountUp end={amount} decimals={2} duration={1.6} prefix='$' />
    </div>
  )
}

export default AnimatedCounter
