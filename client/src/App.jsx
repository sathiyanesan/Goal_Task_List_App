import { useEffect, useState } from 'react'
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

import './App.css'
import Auth from './components/Auth';

import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [dailyTasks, setDailyTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8000/daily-goals/${userEmail}`);
      const jsonData = await response.json();
      setDailyTasks(jsonData);
    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    if (authToken) {
      getData()
    }

  }, [])

  console.log(dailyTasks);

  //sort daily task by date
  const sortedTasks = dailyTasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className='app'>

        {!authToken && <Auth />}

        {authToken &&
          <>
            <ListHeader listItem={"Daily goal list"} getData={getData} />
            <p className='user-email'>Welcome Back {userEmail}</p>
            {sortedTasks?.map((task) =>
              <ListItem key={task.id} tasks={task} getData={getData} />
            )}
            <p className='copyright'>&copy; Creative LLC</p>
          </>}

      </div>

    </>
  )
}

export default App
