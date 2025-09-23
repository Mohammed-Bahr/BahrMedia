import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Componets/SideBar';

const MainLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full">
        <SideBar />
        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;




