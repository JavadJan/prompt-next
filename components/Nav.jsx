"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = ({setOpenModal}) => {
  //data to rename session
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response)
      console.log(response)
    }
    setProvider()
  }, [])
  console.log(session)
  return (

    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-2'>
        <Image src="/assets/images/logo.svg" width={30} height={30} className='object-contain' alt='logo' />
        <p className='logo_text'>Promtopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ?
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt</Link>

            <button type='button' className='outline_btn' onClick={signOut}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image src={session?.user.image}
                width={37}
                height={37} alt='profile' className='rounded-full' />
            </Link>
          </div>
          :
          <>

            {
              providers && Object.values(providers).map((provider) => (
                <button type='button'
                  key={provider.name}
                  onClick={() => setOpenModal(true)}
                  className='black_btn'>
                  Sign In
                </button>
                // <Link className='black_btn' href='/login'>
                // Sign In
                // </Link>

              ))}
          </>
        }
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ?
          (<div className="flex">
            <Image src={session?.user.image}
              width={37}
              height={37}
              alt='profile'
              className='rounded-full'
              onClick={() => { setToggleDropDown((prev) => !prev) }}

            />
            {toggleDropDown && <div className='dropdown'>
              <Link className='dropdown_link' href="/profile"
                onClick={() => setToggleDropDown(false)}>
                My Profile
              </Link>
              <Link className='dropdown_link' href="/create-prompt"
                onClick={() => setToggleDropDown(false)}>
                Create Prompt
              </Link>
              <button
                type='button'
                onClick={() => {
                  setToggleDropDown(false);
                  signOut()
                }}
                className='w-full black_btn'>
                Sign Out
              </button>
            </div>}
          </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (
                  <button type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'>
                    Sing In
                  </button>
                ))}
            </>
          )


        }
      </div>
    </nav>
  )
}

export default Nav