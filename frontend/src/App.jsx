
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navebar'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Profile from './components/Profile'


const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/signin',
    element : <Signin/>
  },{
    path : '/signup',
    element : <Signup/>
  },{
    path : '/jobs',
    element : <Jobs/>
  },{
    path : '/profile',
    element : <Profile/>
  }
])

function App() {
  return(
    <div >
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default App
