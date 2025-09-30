// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import SideBar from "../Componets/SideBar";
// import BlurText from "../Componets/BlurText";
// const MainLayout = () => {

//   const handleAnimationComplete = () => {
//     console.log("Animation completed!");
//   };

//   const [intro , setIntro] = useState(1);

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-gray-50">
//       <div className="flex h-full">
//         <SideBar />
//         <main className="flex-1 h-full overflow-y-auto">
//           <div className="max-w-3xl mx-auto p-6">
//             <Outlet />
//             {
//               intro == 1 ?
//                 <BlurText
//                 text="Isn't this so cool?!"
//                 delay={150}
//                 animateBy="words"
//                 direction="top"
//                 onAnimationComplete={handleAnimationComplete}
//                 className="text-2xl mb-8 h-screen justify-center items-center"
//               />
//               :

            
//             }
            
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;



import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Componets/SideBar";
import BlurText from "../Componets/BlurText";

const MainLayout = () => {
  const [intro, setIntro] = useState(true);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
    // Hide the intro after animation completes
    setIntro(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full">
        <SideBar />
        <main className="flex-1 h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            {intro ? (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-50 z-50">
                <BlurText
                  text="Isn't this so cool?!"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl"
                />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;