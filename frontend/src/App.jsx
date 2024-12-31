
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navebar'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import AdminHome from './components/admin/AdminHome'
import AdminJobDescription from './components/admin/AdminJobDescription'


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
  },{
    path : '/jobdescription/:id',
    element : <JobDescription />
  },{
    path : '/admin/jobs',
    element : <AdminHome/>
  },{
    path : '/adminjobdescription/:id',
    element : <AdminJobDescription/>
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
