import React from "react";
import axios from "axios";
import "./Tasks.scss";
import editIcon from "../../assets/img/editIcon.png";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Введите новое название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3004/lists/" + list.id, { name: newTitle })
        .catch(() => {
          alert("Не удалось соединиться(");
        });
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name} <img onClick={editTitle} src={editIcon} alt="edit icon" />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
