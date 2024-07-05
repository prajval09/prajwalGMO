import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Firstpage from './Components/Firstpage/Firstpage.tsx'
import Secondpage from './Components/Secondpage/Secondpage.tsx'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Firstpage/>,
    },

    {
      path:"/firstpage",
      element:<Firstpage/>
    },

    {
      path:"/secondpage",
      element:<Secondpage />
    }
  ]
     
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
