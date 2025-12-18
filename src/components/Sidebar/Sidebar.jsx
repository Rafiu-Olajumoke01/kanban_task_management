import React, { useState } from 'react';
import { MdViewColumn, MdToggleOff, MdToggleOn, MdSunny } from "react-icons/md";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa6";
import { LuMoonStar } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import './side.css';

function Sidebar({
  theme,
  setTheme,
  activeBoard,
  setActiveBoard,
  isSidebarHidden,
  setIsSidebarHidden
}) {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [columns, setColumns] = useState(['Todo', 'Doing']);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleAddColumn = () => {
    setColumns([...columns, '']);
  };

  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const handleColumnChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  const handleCreateBoard = () => {
    if (boardName.trim()) {
      console.log('Creating board:', { name: boardName, columns });
      setBoardName('');
      setColumns(['Todo', 'Doing']);
      setShowAddBoardModal(false);
    }
  };

  
  if (isSidebarHidden) {
    return null;
  }

  return (
    <>
      {/* SIDEBAR */}
      <div className="kabContainer">
        <div className="kabLogo">
          <MdViewColumn size={40} className="logo" />
          <h2>Kanban</h2>
        </div>

        <div className="sidebarItems">
          <h3>All Boards (3)</h3>

          <div
            className={`sidebarIcon ${activeBoard === "Platform Launch" ? "button" : ""}`}
            onClick={() => setActiveBoard("Platform Launch")}
          >
            <BsLayoutTextSidebarReverse size={20} />
            <h3>Platform Launch</h3>
          </div>

          <div
            className={`sidebarIcon ${activeBoard === "Marketing Plan" ? "button" : ""}`}
            onClick={() => setActiveBoard("Marketing Plan")}
          >
            <BsLayoutTextSidebarReverse size={20} />
            <h3>Marketing Plan</h3>
          </div>

          <div
            className={`sidebarIcon ${activeBoard === "Roadmap" ? "button" : ""}`}
            onClick={() => setActiveBoard("Roadmap")}
          >
            <BsLayoutTextSidebarReverse size={20} />
            <h3>Roadmap</h3>
          </div>

          <div
            className="sidebarIcon"
            onClick={() => setShowAddBoardModal(true)}
            style={{ cursor: 'pointer' }}
          >
            <BsLayoutTextSidebarReverse size={20} />
            <h3 style={{ color: '#635fc7' }}>+ Create New Board</h3>
          </div>
        </div>

        <div className="kabToggleAndHide">
          <div className="toggling" onClick={toggleTheme}>
            <MdSunny size={20} />

            {theme === "light" ? (
              <MdToggleOff size={40} />
            ) : (
              <MdToggleOn size={40} />
            )}

            <LuMoonStar size={18} />
          </div>

          {/* HIDE SIDEBAR */}
          <div
            className="hide"
            onClick={() => setIsSidebarHidden(true)}
          >
            <FaRegEyeSlash size={20} />
            <h3>Hide Sidebar</h3>
          </div>
        </div>
      </div>

      {/* ADD NEW BOARD MODAL */}
      {showAddBoardModal && (
        <div className="modal-overlay" onClick={() => setShowAddBoardModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-edit">
              <h3>Add New Board</h3>
              <button
                className="close-icon"
                onClick={() => setShowAddBoardModal(false)}
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="edit-modal-body">
              <div className="form-group">
                <label>Board Name</label>
                <input
                  type="text"
                  placeholder="e.g. Web Design"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Board Columns</label>
                <div className="subtasks-edit-list">
                  {columns.map((column, index) => (
                    <div key={index} className="subtask-edit-item">
                      <input
                        type="text"
                        placeholder="e.g. Todo"
                        value={column}
                        onChange={(e) =>
                          handleColumnChange(index, e.target.value)
                        }
                      />
                      <button
                        className="remove-subtask-btn"
                        onClick={() => handleRemoveColumn(index)}
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="add-new-subtask-btn"
                  onClick={handleAddColumn}
                >
                  + Add New Column
                </button>
              </div>

              <button
                className="save-changes-btn"
                onClick={handleCreateBoard}
              >
                Create New Board
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;