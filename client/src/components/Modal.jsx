import { useState } from "react";

import { useCookies } from "react-cookie";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';


const Modal = ({ mode, setShowModal, getData, tasks }) => {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [tabValue, setTabValue] = useState('Daily');

    // const mode = 'create'
    const editMode = mode === 'edit' ? true : false;

    const [data, setData] = useState({
        user_email: editMode ? tasks.user_email : cookies.Email,
        title: editMode ? tasks.title : "",
        progress: editMode ? tasks.progress : 50,
        date: editMode ? tasks.date : new Date(),
        goaltype: editMode ? tasks.goaltype : "Daily"
    })

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/goals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.status === 200) {
                console.log('WORKED');
                setShowModal(false);
                getData(e,tabValue);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const editData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/goals/${tasks.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.status === 200) {
                console.log('WORKED');
                setShowModal(false);
                getData(e,tabValue);
            }
        } catch (err) {
            console.error(err);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        })

        )
    }

    console.log(data);
    return (
        <>
            <div className="overlay">
                <div className="modal">
                    <div className="form-title-container">
                        <h3>Let's {mode} your task</h3>
                        <button onClick={() => setShowModal(false)}>X</button>
                    </div>
                    <form action="">
                        <input
                            required
                            maxLength={30}
                            placeholder=" Your task goes here"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            type="text"
                        />
                        <br />
                        <label htmlFor="range">Drag to select your current progress</label>
                        <input
                            type="range"
                            id="range"
                            required
                            min={0}
                            max={100}
                            name="progress"
                            value={data.progress}
                            onChange={handleChange}
                        />
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Plan type
                        </InputLabel>
                        <NativeSelect
                            onChange={handleChange}
                            value={data.goaltype}
                            inputProps={{
                                name: 'goaltype',
                                id: 'uncontrolled-native'
                            }}
                        >
                            <option value="Daily">Daily</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </NativeSelect>

                        <input className={mode} onClick={editMode ? editData : postData} type="submit" />
                    </form>
                </div>

            </div>

        </>
    )
}

export default Modal