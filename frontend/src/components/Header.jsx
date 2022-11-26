import React, { useState } from 'react'
import { useUser } from '../context/user/UserContextProvider';

function Header() {
    const { user , authLogout} = useUser();
    const [mouseOver, setMouseOver] = useState(false);

    const handleMouseOver =()=> {
        setMouseOver(true);
    }

    const handleMouseLeave =()=> {
        setMouseOver(false);
    }

  return (
    <header className='px-8 bg-slate-100 shadow-sm'>
        <nav className='center w-full '>
             <div className='center h-16 whitespace-nowrap'>
                word-blog
             </div>
             <div className="w-full flex justify-end">
                <div 
                    className='relative' 
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="w-8 h-8 rounded-full bg-slate-600 cursor-pointer"></div>
                    <div className={`absolute top-[30px] bg-white shadow-md p-8 card right-0 ${mouseOver ? "block": "hidden"}`}>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <div className="bg-slate-600 w-14 h-14 rounded-full">
                            </div>
                            <h3 className='font-medium'>{user?.name}</h3>
                            <p>{user?.email}</p>

                            <button className='btn-white whitespace-nowrap'>Edit Profile</button>
                            <button className='btn-white' onClick={authLogout}>logout</button>
                        </div>
                    </div>
                </div>
             </div>
        </nav>
    </header>
  )
}

export default Header;