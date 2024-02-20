import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";


const ListItem = ({ tasks, getData }) => {
    const [showModal, setShowModal] = useState(false);
    const [tabValue, setTabValue] = useState('Daily');

    const deleteData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/goals/${tasks.id}`, {
                method: 'DELETE'
            })

            if (response.status === 200) {
                console.log('WORKED');
                getData(e,tabValue);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <li className="list-item">
                <div className="info-container">
                    <TickIcon />
                    <p className="task-title">{tasks.title}</p>
                    <ProgressBar progress={tasks.progress}/>
                </div>

                <div className="button-container">
                    <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
                    <button className="delete" onClick={deleteData}>DELETE</button>
                </div>
                {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} tasks={tasks} />}
            </li>
        </>
    )
}

export default ListItem