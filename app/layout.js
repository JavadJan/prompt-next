"use client"
import React, { Children, useState } from 'react'
import "@/style/globals.css"
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { useSession } from 'next-auth/react'
import Modal from '@components/Modal'

export const metadata = {
  title: "prompts",
  description: "discover & share prompt AI"
}
const RootLayout = ({ children }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <Provider>
          {openModal && <Modal setOpenModal={setOpenModal}/>}
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav setOpenModal={setOpenModal} />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout