import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Componets/SideBar";
import BlurText from "../Componets/BlurText";
const MainLayout = () => {

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full">
        <SideBar />
        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            <Outlet />

            <BlurText
              text="Isn't this so cool?!"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-8 h-screen justify-center items-center"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
