import React from 'react';
// import Sidebar from '../components/Sidebar/Livraria/Sidebar';
// import Topbar from '../components/Common/Topbar';

const Layout = ({ children }) => {
  return (
    <main className='md:w-full md:flex md:relative md:bg-[#f5f5f5] md:h-screen md:overflow-x-hidden'>
      <section className='flex flex-col  fixed '>
        {/* <Sidebar /> */}
      </section>
      <section className='md:w-full md:ml-[20vw] hidden md:block'>
        {/* <Topbar title={'Painel'} date={'8, March 2024'} /> */}
        {children}
      </section>

    </main>
  );
};

export default Layout;
