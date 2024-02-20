import { useState, useEffect, createContext } from "react"
import Modal from "./Modal";
import { useCookies } from "react-cookie";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ListItem from "./ListItem";

export const TasksContext = createContext("");

const ListHeader = () => {
    const [showModal, setShowModal] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [data, setData] = useState(null);
    const [tabValue, setTabValue] = useState('Daily');
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;


    const signOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');

        window.location.reload();
    }


    const handleChange = async (e, newValue) => {
        setTabValue(newValue);
        console.log(tabValue);

        try {
            const response = await fetch(`http://localhost:8000/goals/${userEmail}?goaltype=${tabValue}`);
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err)
        }
    };

    useEffect((e) => {
        if (authToken) {
            handleChange(e, tabValue)
        }

    }, [tabValue])

    //sort daily task by date
    const sortedTasks = data?.sort((a, b) => new Date(a.date) - new Date(b.date));


    return (
        <>
            <div className="list-header">
                <Box >
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"

                    >
                        <Tab value="Daily" label="Daily Plan" />
                        <Tab value="Monthly" label="Monthly Plan" />
                        <Tab value="Yearly" label="Yearly Plan" />
                    </Tabs >
                </Box>

                <div className="button-container">
                    <button className="create" onClick={() => setShowModal(true)}>ADD NEW</button>
                    <button className="signout" onClick={signOut}>SIGN OUT</button>
                </div>
            </div>
            {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={handleChange} />}

            <p className='user-email'>Welcome Back {userEmail}</p>
            {sortedTasks?.map((task) =>
                <ListItem key={task.id} tasks={task} getData={handleChange} />
            )}
            <p className='copyright'>&copy; Creative LLC</p>
        </>
    )
}

export default ListHeader;