import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Commnets from './pages/Commnets'
import { Login } from './pages/Login'
import { useUser } from '@clerk/clerk-react'
const App = () => {
  const { isLoaded, isSignedIn } = useUser()
  if (!isLoaded) return null
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isSignedIn ? <MainLayout /> : <Login /> } >
              <Route path='/home' element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/comments" element={<Commnets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App