
import Sidebar from './components/Sidebar.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Sidebar />
    </>
  )
}

export default App
