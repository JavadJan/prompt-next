import React from 'react'

const Modal = ({ setOpenModal }) => {
    return (
        <div class="absolute h-full w-full z-40">
            <div class="absolute flex h-full w-full items-center justify-center bg-black opacity-60 ">
                {/* Parent Overlay */}
            </div>

            <div class="absolute inset-52 h-1/2 w-1/2 bg-white text-center indent-1 opacity-100">
                {/* Child Modal */}
                <header class="m-2 flex justify-start gap-[13.5rem] items-center ">
                    <span class="cursor-pointer font-mono text-2xl font-extrabold" onClick={() => setOpenModal(false)}>&times;</span>
                    <h2 className=''>Sign In</h2>
                </header>
                <hr class="my-2" />
                <form class="mt-5 flex flex-col justify-start gap-4">
                    <span class="flex flex-col gap-1 ">
                        <label class="self-start ml-2" for="name">Email</label>
                        <input class="mx-3 px-1 ring-1 ring-gray-300 h-10" type="email" placeholder="email" />
                    </span>
                    <span class="flex flex-col ">
                        <label class="self-start ml-2" for="name">Password</label>
                        <input class="mx-3 px-1 ring-1 ring-gray-300 h-10" type="email" placeholder="email" />
                    </span>
                    <button class="bg-blue-500 text-white  mx-2 py-2 px-2 rounded-md cursor-pointer" type="submit">Sign In</button>
                </form>

                {/* login with social  */}
                <div >

                </div>
            </div>
        </div>
    )
}

export default Modal