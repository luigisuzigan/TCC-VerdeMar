import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './styles/global.css'
import Home from './pages/Home'

function App() {
  return (
    <Home></Home>
  )
}

export default App