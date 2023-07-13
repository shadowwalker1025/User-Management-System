import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddUser from './AddUser'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from './userSlice'
import Update from './Update'

function App() {

  const dispatch = useDispatch()

  useEffect(()=> {
    const fetchData = async() => {
        try {
            const response = await axios.get('https://back-end-one-xi.vercel.app/users/');
            dispatch(getUser(response.data));
        } catch(err) {
            console.log(err)
        }
    }
    fetchData();
}, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<AddUser />}></Route>
        <Route path='/edit/:id' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App