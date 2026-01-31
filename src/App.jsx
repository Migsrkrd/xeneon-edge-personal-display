
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PasswordGenerator from './pages/passwordGenerator'
import Home from './pages/home'

function App() {
  // on an app error, show a simple message
  console.log('App loaded');
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/password-generator" element={<PasswordGenerator />} />
    </Routes>
  )
}

export default App
