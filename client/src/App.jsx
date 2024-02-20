import { useEffect, useState } from 'react'
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import './App.css'
import Auth from './components/Auth';

import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  return (
    <>
      <div className='app'>

        {!authToken && <Auth />}

        {authToken &&
          <>
            <ListHeader />
            {/* <p className='user-email'>Welcome Back {userEmail}</p> */}
            {/* {sortedTasks?.map((task) =>
              <ListItem key={task.id} tasks={task} getData={data} />
            )}
            <p className='copyright'>&copy; Creative LLC</p> */}
          </>}

      </div>

    </>
  )
}

export default App
