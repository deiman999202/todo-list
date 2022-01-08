import React from "react";
import editIcon from "../../assets/img/editIcon.png";
import removeIcon from "../../assets/img/removeIcon.png";

const Task = ({ id, text, completed, onRemove, onEdit, list, onComplete }) => {
  const onChangeCheckbox = (e) => {
    onComplete(list.id, id, e.target.checked);
  };

  return (
    <div key={id} className="tasks__items-row">
      <div className="checkbox">
        <input
          onChange={onChangeCheckbox}
          id={`task-${id}`}
          type="checkbox"
          checked={completed}
        />
        <label htmlFor={`task-${id}`}>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </div>
      <p>{text}</p>
      <div className="tasks__items-row-actions">
        <div onClick={() => onEdit(list.id, { id, text })}>
          <img src={editIcon} alt="edit icon" />
        </div>
        <div onClick={() => onRemove(list.id, id)}>
          <img src={removeIcon} alt="remove icon" />
        </div>
      </div>
    </div>
  );
};

export default Task;
