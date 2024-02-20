import { useEffect, useState } from 'react'
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

import './App.css'
import Auth from './components/Auth';

import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [data, setData] = useState(null);
  const [tabValue, setTabValue] = useState('Daily');
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  console.log(data, tabValue);

//   const getData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/goals/${userEmail}?goaltype=${tabValue}`);
//       const jsonData = await response.json();
//       setData(jsonData);
//   } catch (err) {
//       console.error(err)
//   }

// }

// useEffect(() => {
//     if (authToken) {
//         getData()
//     }

// }, [])
  
  console.log(data);

  //sort daily task by date
  // const sortedTasks = data?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className='app'>

        {!authToken && <Auth />}

        {authToken &&
          <>
            <ListHeader />
            <p className='user-email'>Welcome Back {userEmail}</p>
            {sortedTasks?.map((task) =>
              <ListItem key={task.id} tasks={task} getData={data} />
            )}
            <p className='copyright'>&copy; Creative LLC</p>
          </>}

      </div>

    </>
  )
}

export default App
