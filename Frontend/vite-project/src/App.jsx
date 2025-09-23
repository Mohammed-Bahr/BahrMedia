import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}> 
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App