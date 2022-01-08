import React, { useState } from "react";
import addIcon from "../../assets/img/addIcon.png";
import axios from "axios";
import "./Tasks.scss";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3004/tasks", obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert("Ошибка q при добавлении задачи!");
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return (
    <div className="tasks__form">
      {visibleForm ? (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="field"
            type="text"
            placeholder="Текст задачи"
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление" : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      ) : (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addIcon} alt="plus icon" />
          <span>Новая задача</span>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
