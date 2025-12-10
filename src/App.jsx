import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import HowItWorks from './pages/HowItWorks'
import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import ChatBot from './pages/ChatBot'
import AdvocatesPage from './pages/AdvocatePage'
import PricingPage from './pages/Pricingpage'
import BookAdvocatePage from './pages/BookAdvocatePage'
import HomeLayout from './pages/layout/HomeLayout'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path='auth' element={<AuthPage />} />
        <Route path="app" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chat" element={<ChatBot />} />
          <Route path="advocates" element={<AdvocatesPage />} />
          <Route path="advocate/:id" element={<BookAdvocatePage />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="pricing" element={<PricingPage />} />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />

}

export default App