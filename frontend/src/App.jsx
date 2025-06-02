
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Tools from './pages/Tools'


const MianLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <MianLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/tools', element: <Tools /> },
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
