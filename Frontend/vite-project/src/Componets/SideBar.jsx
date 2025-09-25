import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, Search, Plus, User, Bell, Bookmark, Settings } from 'lucide-react';
const SideBar = () => {
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
    // Handle create post action
    console.log('Create post clicked');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Social</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) => `w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 ${
                isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                  />
                  <span className="text-base">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Create Post Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleCreatePost}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          <Plus size={20} className="mr-2" />
          Create Post
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">@johndoe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;