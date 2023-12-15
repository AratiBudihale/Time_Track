import './App.css';


import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function Timer() {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timer, setTimer] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
  
    const handleStart = () => {
      setTimerOn(true);
      setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    };
  
    const handlePause = () => {
      setTimerOn(false);
      clearInterval(handleStart);
    };
  
    const handleSave = () => {
      setShowModal(true);
      setTimerOn(false);
    };
  
    const handleClose = () => {
      setShowModal(false);
    };
  
    const handleSaveTask = () => {
      setTasks([...tasks, { title, description, timer }]);
      setTitle("");
      setDescription("");
      setTimer(0);
      setShowModal(false);
    };
  
    const handleEditTask = (index, newDescription) => {
      const newTasks = [...tasks];
      newTasks[index].description = newDescription;
      setTasks(newTasks);
    };
  
    const handleDeleteTask = (index) => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    };
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Timer Section</h2>
            <div className="d-flex justify-content-between align-items-center">
              <h1>{new Date(timer * 1000).toISOString().substr(11, 8)}</h1>
              <div>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={handleStart}
                  disabled={timerOn}
                >
                  Start
                </Button>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={handlePause}
                  disabled={!timerOn}
                >
                  Pause
                </Button>
                <Button
                  variant="success"
                  onClick={handleSave}
                  disabled={!timerOn}
                >
                  Save
                </Button>
              </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task to my Application</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSaveTask}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-md-6">
            <h2>Tasks Section in my Application</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <h4>{task.title}</h4>
                  <p>Time Tracked in Application: {new Date(task.timer * 1000).toISOString().substr(11, 8)}</p>
                  <p>Description in Application: {task.description}</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const newDescription = prompt("Enter new description:");
                      handleEditTask(index, newDescription);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeleteTask(index);
                    }}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
        );
}
export default Timer