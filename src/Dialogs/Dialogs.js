import React from 'react'
import Delete from '../Dialogs/Delete'
import Loan from './Loan'
import Message from './Message'
import OTP from './OTP'
import Product from './Product'
import Shop from './Shop'
import Signup from './Signup'

const Dialogs = () => {
  return (
    <>
      <Delete />
      <Message />
      <Signup/>
      <OTP/>
      <Loan/>
      <Product/>
      <Shop/>
    </>
  )
}

export default Dialogs