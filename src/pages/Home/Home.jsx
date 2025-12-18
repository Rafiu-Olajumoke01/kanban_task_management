import React, { useState, useEffect } from 'react';
import Sidebar from './../../components/Sidebar/Sidebar';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdViewColumn } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import './home.css';

function Home() {
    const [theme, setTheme] = useState("light");
    const [activeBoard, setActiveBoard] = useState("Platform Launch");
    const [showSidebar, setShowSidebar] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const [editTaskName, setEditTaskName] = useState("");
    const [editTaskDesc, setEditTaskDesc] = useState("");
    const [editSubtasks, setEditSubtasks] = useState([]);
    const [editStatus, setEditStatus] = useState("");

    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDesc, setNewTaskDesc] = useState("");
    const [newTaskSubtasks, setNewTaskSubtasks] = useState([]);
    const [newTaskStatus, setNewTaskStatus] = useState("TODO");

    const [showEditBoardModal, setShowEditBoardModal] = useState(false);
    const [editBoardColumns, setEditBoardColumns] = useState([]);

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const [boardsData, setBoardsData] = useState({
        "Platform Launch": {
            columns: [
                {
                    id: "todo",
                    title: "TODO",
                    tasks: [
                        { id: "task-1", title: "Build UI for Onboarding flow", subtasks: ["Design Login Screen", "Design Signup Screen", "Design Welcome Screen"], completed: 1 },
                        { id: "task-2", title: "Set up Authentication", subtasks: ["Email Login", "Google Login", "Reset Password"], completed: 0 },
                        { id: "task-3", title: "Design Dashboard", subtasks: ["Add Widgets", "Charts Section", "Notifications Panel"], completed: 2 },
                        { id: "task-4", title: "Create Profile Page", subtasks: ["Profile Info", "Profile Picture Upload", "Settings Options"], completed: 0 }
                    ]
                },
                {
                    id: "doing",
                    title: "DOING",
                    tasks: [
                        { id: "task-5", title: "Design settings and search pages", subtasks: ["Sidebar Layout", "Responsive Sidebar", "Toggle Button"], completed: 2 },
                        { id: "task-6", title: "Add account management endpoints", subtasks: ["GET Users", "POST Tasks", "DELETE Tasks"], completed: 1 },
                        { id: "task-7", title: "Design onboarding flow", subtasks: ["Navigation Links", "Search Bar", "Notifications Icon"], completed: 2 },
                        { id: "task-8", title: "Add search endpoints", subtasks: ["Primary Buttons", "Secondary Buttons", "Hover Effects"], completed: 1 },
                        { id: "task-9", title: "Add authentication endpoints", subtasks: ["Dark Mode CSS", "Toggle Button Logic", "LocalStorage Save"], completed: 0 },
                        { id: "task-10", title: "Research pricing points of various competitors and trial different business models", subtasks: ["Unit Tests", "Integration Tests", "E2E Tests"], completed: 1 }
                    ]
                },
                {
                    id: "done",
                    title: "DONE",
                    tasks: [
                        { id: "task-11", title: "Conduct 5 wireframe tests", subtasks: ["npx create-react-app", "Clean Template", "Install Dependencies"], completed: 3 },
                        { id: "task-12", title: "Create wireframe prototype", subtasks: ["Folder Structure", "Add ESLint", "Add Prettier"], completed: 3 },
                        { id: "task-13", title: "Review results of usability texts and iterate", subtasks: ["Primary Colors", "Text Colors", "Background Colors"], completed: 3 },
                        { id: "task-14", title: "Create paper prototypes and conduct 10 usability tests", subtasks: ["Routing Setup", "Layout Component", "Fallback Loading"], completed: 3 },
                        { id: "task-15", title: "Market discovery", subtasks: ["React Router DOM", "Pages Folder", "404 Page"], completed: 3 },
                        { id: "task-16", title: "Competitor analysis", subtasks: ["Logo Section", "Menu Items", "Toggle Dark Mode"], completed: 3 },
                        { id: "task-17", title: "Research the market", subtasks: ["Grid Columns", "Cards Layout", "Responsive Styles"], completed: 3 }
                    ]
                },
                { id: "new-column", title: "+ New Column", tasks: [] }
            ]
        },
        "Marketing Plan": {
            columns: [
                {
                    id: "todo-marketing",
                    title: "TODO",
                    tasks: [
                        { id: "task-m1", title: "Draft Marketing Strategy", subtasks: ["Email Campaign", "Social Media Plan"], completed: 0 },
                        { id: "task-m2", title: "Create Marketing Assets", subtasks: ["Banner", "Flyers", "Videos"], completed: 1 },
                        { id: "task-m3", title: "Plan Launch Campaign", subtasks: ["Timeline", "Budget Allocation"], completed: 0 }
                    ]
                },
                { id: "doing-marketing", title: "DOING", tasks: [] },
                { id: "done-marketing", title: "DONE", tasks: [] }
            ]
        },
        "Roadmap": {
            columns: [
                {
                    id: "now-roadmap",
                    title: "Now",
                    tasks: [
                        { id: "task-r1", title: "Define MVP Features", subtasks: ["List Core Features", "Prioritize Tasks"], completed: 0 },
                        { id: "task-r2", title: "Set up Project Repo", subtasks: ["Initialize Repo", "Install Dependencies"], completed: 1 }
                    ]
                },
                { id: "next-roadmap", title: "NEXT", tasks: [] },
                { id: "later-roadmap", title: "LATER", tasks: [] }
            ]
        }
    });

    const columns = boardsData[activeBoard].columns;

    const handleOnDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceColIndex = columns.findIndex(col => col.id === source.droppableId);
        const destColIndex = columns.findIndex(col => col.id === destination.droppableId);

        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];

        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = source.droppableId === destination.droppableId
            ? sourceTasks
            : Array.from(destCol.tasks);

        const [movedTask] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, movedTask);

        const newColumns = [...columns];
        newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };

        if (source.droppableId !== destination.droppableId) {
            newColumns[destColIndex] = { ...destCol, tasks: destTasks };
        }

        setBoardsData({
            ...boardsData,
            [activeBoard]: {
                ...boardsData[activeBoard],
                columns: newColumns
            }
        });
    };

    const handleOpenEdit = () => {
        setEditTaskName(selectedTask.title);
        setEditTaskDesc(selectedTask.description || "");
        setEditSubtasks([...selectedTask.subtasks]);
        setEditStatus(selectedColumn);
        setShowEditModal(true);
        setShowModal(false);
        setShowOptions(false);
    };

    const handleAddSubtask = () => {
        if (editSubtasks.length < 10) {
            setEditSubtasks([...editSubtasks, ""]);
        }
    };

    const handleRemoveSubtask = (index) => {
        const newSubs = editSubtasks.filter((_, i) => i !== index);
        setEditSubtasks(newSubs);
    };

    const handleDeleteTask = () => {
        setShowDeleteModal(true);
        setShowModal(false);
        setShowOptions(false);
    };

    const confirmDelete = () => {
        alert('Task deleted!');
        setShowDeleteModal(false);
    };

    const handleOpenAddTask = () => {
        setNewTaskName("");
        setNewTaskDesc("");
        setNewTaskSubtasks([]);
        setNewTaskStatus("TODO");
        setShowAddTaskModal(true);
    };

    const handleAddNewSubtask = () => {
        setNewTaskSubtasks([...newTaskSubtasks, ""]);
    };

    const handleRemoveNewSubtask = (index) => {
        setNewTaskSubtasks(newTaskSubtasks.filter((_, i) => i !== index));
    };

    const handleNewSubtaskChange = (index, value) => {
        const updated = [...newTaskSubtasks];
        updated[index] = value;
        setNewTaskSubtasks(updated);
    };

    const handleCreateTask = () => {
        if (newTaskName.trim()) {
            const newTask = {
                id: `task-${Date.now()}`,
                title: newTaskName,
                description: newTaskDesc,
                subtasks: newTaskSubtasks.filter(s => s.trim() !== ""),
                completed: 0
            };

            const targetColumn = columns.find(col => col.title === newTaskStatus);
            if (targetColumn) {
                const updatedColumns = columns.map(col => {
                    if (col.id === targetColumn.id) {
                        return {
                            ...col,
                            tasks: [...col.tasks, newTask]
                        };
                    }
                    return col;
                });

                setBoardsData({
                    ...boardsData,
                    [activeBoard]: {
                        ...boardsData[activeBoard],
                        columns: updatedColumns
                    }
                });
            }

            setShowAddTaskModal(false);
            setNewTaskName("");
            setNewTaskDesc("");
            setNewTaskSubtasks([]);
        }
    };

    const handleOpenEditBoard = () => {
        const currentColumns = columns
            .filter(col => col.title !== "+ New Column")
            .map(col => col.title);
        setEditBoardColumns(currentColumns);
        setShowEditBoardModal(true);
    };

    const handleAddBoardColumn = () => {
        setEditBoardColumns([...editBoardColumns, ""]);
    };

    const handleRemoveBoardColumn = (index) => {
        setEditBoardColumns(editBoardColumns.filter((_, i) => i !== index));
    };

    const handleBoardColumnChange = (index, value) => {
        const updated = [...editBoardColumns];
        updated[index] = value;
        setEditBoardColumns(updated);
    };

    const handleSaveBoardChanges = () => {
        alert('Board changes saved!');
        setShowEditBoardModal(false);
    };

    return (
        <div className='kanbanTask'>
            <div className="mobile-header">
                <div className="mobile-header-left">
                    <div className="logo">
                        <MdViewColumn size={40} className='logo' />
                    </div>
                    <h2>{activeBoard}</h2>
                    <button
                        className="dropdown-toggle"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? '▲' : '▼'}
                    </button>
                </div>
                <button className='button mobile-add-button' onClick={handleOpenAddTask}>
                    +
                </button>
            </div>

            {showSidebar && (
                <div className="mobile-sidebar-dropdown">
                    <div className="sidebar-content">
                        <Sidebar
                            theme={theme}
                            setTheme={setTheme}
                            activeBoard={activeBoard}
                            setActiveBoard={setActiveBoard}
                            isSidebarHidden={isSidebarHidden}
                            setIsSidebarHidden={setIsSidebarHidden}
                        />
                    </div>
                    <div
                        className="sidebar-overlay"
                        onClick={() => setShowSidebar(false)}
                    />
                </div>
            )}

            <div className={`side desktop-only ${isSidebarHidden ? 'hidden' : ''}`}>
                <Sidebar
                    theme={theme}
                    setTheme={setTheme}
                    activeBoard={activeBoard}
                    setActiveBoard={setActiveBoard}
                    isSidebarHidden={isSidebarHidden}
                    setIsSidebarHidden={setIsSidebarHidden}
                />
            </div>

            {isSidebarHidden && (
                <button 
                    className="show-sidebar-btn desktop-only"
                    onClick={() => setIsSidebarHidden(false)}
                >
                    <FaRegEye size={20} />
                </button>
            )}

            <div className={`board ${isSidebarHidden ? 'expanded' : ''}`}>
                <div className="header desktop-only">
                    <h2>{activeBoard}</h2>
                    <button className='button' onClick={handleOpenAddTask}>
                        + Add New Task
                    </button>
                </div>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="columns">
                        {columns.map((col) => (
                            <div
                                key={col.id}
                                className={`column ${col.title === "+ New Column" ? "new-column" : ""}`}
                                onClick={col.title === "+ New Column" ? handleOpenEditBoard : undefined}
                            >
                                <h4>
                                    {col.title}
                                    {col.tasks.length > 0 ? ` (${col.tasks.length})` : ""}
                                </h4>

                                {col.title !== "+ New Column" ? (
                                    <Droppable droppableId={col.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={`droppable-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                            >
                                                {col.tasks.map((task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                                onClick={() => {
                                                                    setSelectedTask(task);
                                                                    setSelectedColumn(col.title);
                                                                    setShowModal(true);
                                                                    setShowOptions(false);
                                                                }}
                                                            >
                                                                <p>{task.title}</p>
                                                                {task.subtasks && (
                                                                    <small>
                                                                        {task.completed} of {task.subtasks.length} subtasks
                                                                    </small>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </div>

            {showAddTaskModal && (
                <div className="modal-overlay" onClick={() => setShowAddTaskModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-edit">
                            <h3>Add New Task</h3>
                            <button className="close-icon" onClick={() => setShowAddTaskModal(false)}>
                                <MdClose size={24} />
                            </button>
                        </div>

                        <div className="edit-modal-body">
                            <div className="form-group">
                                <label>Task Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Take coffee break"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                                    rows="4"
                                    value={newTaskDesc}
                                    onChange={(e) => setNewTaskDesc(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Subtasks</label>
                                <div className="subtasks-edit-list">
                                    {newTaskSubtasks.map((subtask, index) => (
                                        <div key={index} className="subtask-edit-item">
                                            <input
                                                type="text"
                                                placeholder="e.g. Make coffee"
                                                value={subtask}
                                                onChange={(e) => handleNewSubtaskChange(index, e.target.value)}
                                            />
                                            <button
                                                className="remove-subtask-btn"
                                                onClick={() => handleRemoveNewSubtask(index)}
                                            >
                                                <MdClose size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="add-new-subtask-btn" onClick={handleAddNewSubtask}>
                                    + Add New Subtask
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Current Status</label>
                                <select value={newTaskStatus} onChange={(e) => setNewTaskStatus(e.target.value)}>
                                    {columns.filter(c => c.title !== "+ New Column").map(c => (
                                        <option key={c.title} value={c.title}>{c.title}</option>
                                    ))}
                                </select>
                            </div>

                            <button className="save-changes-btn" onClick={handleCreateTask}>
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && selectedTask && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); setShowOptions(false); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedTask.title}</h3>
                            <div className="options-wrapper">
                                <button
                                    className="options-icon"
                                    onClick={() => setShowOptions(!showOptions)}
                                >
                                    <BsThreeDotsVertical size={20} />
                                </button>
                                {showOptions && (
                                    <div className="task-options-dropdown">
                                        <button onClick={handleOpenEdit}>Edit Task</button>
                                        <button onClick={handleDeleteTask} className="delete-btn">Delete Task</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {selectedTask.subtasks && (
                            <div className="subtasks">
                                <h4>Subtasks ({selectedTask.completed} of {selectedTask.subtasks.length})</h4>
                                <div className="subtasks-list">
                                    {selectedTask.subtasks.map((sub, index) => (
                                        <label key={index} className="subtask-item">
                                            <input
                                                type="checkbox"
                                                checked={index < selectedTask.completed}
                                                onChange={(e) => {
                                                    const newCompleted = e.target.checked ? selectedTask.completed + 1 : selectedTask.completed - 1;
                                                    setSelectedTask({ ...selectedTask, completed: newCompleted });
                                                }}
                                            />
                                            <span className={index < selectedTask.completed ? 'completed' : ''}>{sub}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="current-status">
                            <h4>Current Status</h4>
                            <select
                                value={selectedColumn}
                                onChange={(e) => setSelectedColumn(e.target.value)}
                            >
                                {columns.filter(c => c.title !== "+ New Column").map(c => (
                                    <option key={c.title} value={c.title}>{c.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-edit">
                            <h3>Edit Task</h3>
                            <button className="close-icon" onClick={() => setShowEditModal(false)}>
                                <MdClose size={24} />
                            </button>
                        </div>

                        <div className="edit-modal-body">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={editTaskName}
                                    onChange={(e) => setEditTaskName(e.target.value)}
                                    placeholder="e.g. Take coffee break"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={editTaskDesc}
                                    onChange={(e) => setEditTaskDesc(e.target.value)}
                                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Subtasks</label>
                                <div className="subtasks-edit-list">
                                    {editSubtasks.map((sub, idx) => (
                                        <div key={idx} className="subtask-edit-item">
                                            <input
                                                type="text"
                                                value={sub}
                                                onChange={(e) => {
                                                    const newSubs = [...editSubtasks];
                                                    newSubs[idx] = e.target.value;
                                                    setEditSubtasks(newSubs);
                                                }}
                                                placeholder="e.g. Make coffee"
                                            />
                                            <button
                                                className="remove-subtask-btn"
                                                onClick={() => handleRemoveSubtask(idx)}
                                            >
                                                <MdClose size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="add-new-subtask-btn" onClick={handleAddSubtask}>
                                    + Add New Subtask
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                                    {columns.filter(c => c.title !== "+ New Column").map(c => (
                                        <option key={c.title} value={c.title}>{c.title}</option>
                                    ))}
                                </select>
                            </div>

                            <button className="save-changes-btn" onClick={() => {
                                alert('Changes saved!');
                                setShowEditModal(false);
                            }}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && selectedTask && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Delete this task?</h3>
                        <p>
                            Are you sure you want to delete the '<strong>{selectedTask.title}</strong>' task and its subtasks?
                            This action cannot be reversed.
                        </p>
                        <div className="delete-modal-actions">
                            <button className="delete-confirm-btn" onClick={confirmDelete}>
                                Delete
                            </button>
                            <button className="delete-cancel-btn" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditBoardModal && (
                <div className="modal-overlay" onClick={() => setShowEditBoardModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-edit">
                            <h3>Edit Board</h3>
                            <button className="close-icon" onClick={() => setShowEditBoardModal(false)}>
                                <MdClose size={24} />
                            </button>
                        </div>

                        <div className="edit-modal-body">
                            <div className="form-group">
                                <label>Board Name</label>
                                <input
                                    type="text"
                                    value={activeBoard}
                                    readOnly
                                    style={{ backgroundColor: 'var(--bg-primary, #f4f7fd)', cursor: 'not-allowed' }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Board Columns</label>
                                <div className="subtasks-edit-list">
                                    {editBoardColumns.map((column, index) => (
                                        <div key={index} className="subtask-edit-item">
                                            <input
                                                type="text"
                                                placeholder="e.g. Todo"
                                                value={column}
                                                onChange={(e) => handleBoardColumnChange(index, e.target.value)}
                                            />
                                            <button
                                                className="remove-subtask-btn"
                                                onClick={() => handleRemoveBoardColumn(index)}
                                            >
                                                <MdClose size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="add-new-subtask-btn" onClick={handleAddBoardColumn}>
                                    + Add New Column
                                </button>
                            </div>

                            <button className="save-changes-btn" onClick={handleSaveBoardChanges}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;