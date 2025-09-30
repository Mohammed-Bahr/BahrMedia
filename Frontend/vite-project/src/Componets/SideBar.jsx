// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Home, MessageCircle, Search, Plus, User, Bell, Bookmark, Settings } from 'lucide-react';
// const SideBar = () => {
//   const menuItems = [
//     { id: 'home', label: 'Home', icon: Home, to: '/home' },
//     { id: 'search', label: 'Search', icon: Search, to: '/search' },
//     { id: 'messages', label: 'Messages', icon: MessageCircle, to: '/messages' },
//     { id: 'notifications', label: 'Notifications', icon: Bell, to: '/notifications' },
//     { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, to: '/bookmarks' },
//     { id: 'profile', label: 'Profile', icon: User, to: '/profile' },
//     { id: 'settings', label: 'Settings', icon: Settings, to: '/settings' },
//   ];

//   const handleCreatePost = () => {
//     // Handle create post action
//     console.log('Create post clicked');
//   };

//   return (
//     <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
//       {/* Logo/Brand Section */}
//       <div className="p-6 border-b border-gray-100">
//         <h1 className="text-2xl font-bold text-gray-900">Social</h1>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 px-4 py-6 space-y-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           return (
//             <NavLink
//               key={item.id}
//               to={item.to}
//               className={({ isActive }) => `w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 ${
//                 isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:text-gray-900'
//               }`}
//             >
//               {({ isActive }) => (
//                 <>
//                   <Icon
//                     size={20}
//                     className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
//                   />
//                   <span className="text-base">{item.label}</span>
//                 </>
//               )}
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* Create Post Button */}
//       <div className="p-4 border-t border-gray-100">
//         <button
//           onClick={handleCreatePost}
//           className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
//         >
//           <Plus size={20} className="mr-2" />
//           Create Post
//         </button>
//       </div>

//       {/* User Profile Section */}
//       <div className="p-4 border-t border-gray-100">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
//             <span className="text-white font-medium text-sm">JD</span>
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-900">John Doe</p>
//             <p className="text-xs text-gray-500">@johndoe</p>
//           </div>
//         </div>
//       </div>



//             {/* Bottom Navigation Bar - Mobile Only */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-bottom">
//         <div className="flex items-center justify-around px-2 py-2">
//           {menuItems.slice(0, 4).map((item) => {
//             const Icon = item.icon;
//             const isActive = activeItem === item.id;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavClick(item.id)}
//                 className="flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors"
//               >
//                 <Icon size={24} className={isActive ? 'text-blue-600' : 'text-gray-600'} />
//                 <span className={`text-xs mt-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
//                   {item.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>



        
//   );
// };

// export default SideBar;




import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, Search, Plus, User, Bell, Bookmark, Settings, Menu, X } from 'lucide-react';

const SideBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, to: '/home' },
    { id: 'search', label: 'Search', icon: Search, to: '/search' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, to: '/messages' },
    { id: 'notifications', label: 'Notifications', icon: Bell, to: '/notifications' },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, to: '/bookmarks' },
    { id: 'profile', label: 'Profile', icon: User, to: '/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, to: '/settings' },
  ];

  const handleCreatePost = () => {
    console.log('Create post clicked');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Bahr</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreatePost}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Create post"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop and Mobile Drawer */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40 m-0 lg:m-2 rounded-none lg:rounded-xl
          h-screen lg:h-[calc(100vh-1rem)] bg-white/80 backdrop-blur-lg border-r
          flex flex-col transition-all duration-300 ease-in-out
          w-64
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-20 lg:hover:w-64
        `}
      >
        {/* Logo/Brand Section */}
        <div className="p-4 lg:p-6 flex items-center justify-center border-b border-gray-100">
          <h1 className={`text-2xl font-bold text-gray-900 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100`}>Bahr</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2 lg:px-4 py-4 lg:py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={closeMobileMenu}
                className={({ isActive }) => `
                  w-full flex items-center p-3 rounded-full text-left transition-all duration-200
                  ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                  lg:justify-center lg:group-hover:justify-start
                `}
              >
                <Icon
                  size={22}
                  className={`transition-all duration-300 lg:mr-0 lg:group-hover:mr-4`}
                />
                <span className={`text-base transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100`}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Create Post Button */}
        <div className={`p-4 border-t border-gray-100`}>
          <button
            onClick={handleCreatePost}
            className={`w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md lg:px-0 lg:group-hover:px-3`}
          >
            <Plus size={20} className={`lg:mr-0 lg:group-hover:mr-2`} />
            <span className={`transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100`}>Post</span>
          </button>
        </div>

        {/* User Profile Section */}
        <div className={`p-2 border-t border-gray-100`}>
          <div className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className={`flex-1 min-w-0 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100`}>
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">@johndoe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-sm border-t border-gray-200 safe-area-bottom">
        <nav className="flex items-center justify-around px-2 py-2">
          {[menuItems[0], menuItems[1], menuItems[2], menuItems[3], menuItems[5]].map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center px-3 py-2 rounded-lg min-w-0 flex-1
                  ${isActive ? 'text-blue-600' : 'text-gray-600'}
                `}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Spacer for mobile content */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default SideBar;