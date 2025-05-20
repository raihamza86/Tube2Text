
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Tools from './pages/Tools'
import Learn from './pages/Learn'


const MianLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <MianLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/features', element: <Features /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/tools', element: <Tools /> },
      { path: '/learn', element: <Learn /> },
      { path: '*', element: <div>Page not found</div> },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
