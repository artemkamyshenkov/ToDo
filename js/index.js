const headerTime = document.querySelector(".header__time-time");
const headerDate = document.querySelector(".header__time-date");
const greetingText = document.querySelector(".greeting__text");
const greetingName = document.querySelector(".greeting__name");

function showTime() {
  const date = new Date();
  const hours = date.getHours();
  const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
  headerTime.textContent = currentTime;

  function showDate() {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const currentDate = date.toLocaleDateString("ru-RU", options);
    headerDate.textContent = currentDate;

    setTimeout(showTime, 1000);
  }
  showDate();
}
showTime();

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let message;
  if (hours >= 6 && hours < 12) message = "Доброе утро,";
  if (hours >= 12 && hours < 18) message = "Добрый день, ";
  if (hours >= 18 && hours < 24) message = "Добрый вечер, ";
  if (hours >= 00 && hours < 6) message = "Доброй ночи, ";
  greetingText.textContent = message;
}

getTimeOfDay();

function setLocalStorage() {
  localStorage.setItem("greeting__name", greetingName.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("greeting__name")) {
    greetingName.value = localStorage.getItem("greeting__name");
  }
}
window.addEventListener("load", getLocalStorage);

const tasktForm = document.querySelector(".create-task-block");
const taskInput = document.querySelector(".create-task-block__input");
const tasksList = document.querySelector(".tasks__list");
const tasksContainer = document.querySelector('.tasks__container')

let tasks = [];
loadTasksToLocalStorage();
tasks.forEach((task) => {
  renderTasks(task)
})
checkEmptyList();

tasktForm.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  //Отмена перезагрузки при отправке формы
  event.preventDefault();

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  tasks.push(newTask);

  renderTasks(newTask)

  taskInput.value = "";
  taskInput.focus();

  saveTasksToLocalStorage()
  checkEmptyList()
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") {
    return;
  }
  const parentNode = event.target.closest(".task__item");
  const taskId = Number(parentNode.id);

  //Фильтрация массива и удаление задачи с целевым индексом
  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasksToLocalStorage()
  parentNode.remove();
  checkEmptyList()
 
}
function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".task__item");
  const taskId = Number(parentNode.id);

  // Ищем задачу в массиве и меняем ей статус done на true

  const findTaskDone = tasks.find((task) => task.id === taskId);

  //Нашли задачу в массиве и поменяли ей статус с false на done
  findTaskDone.done = !findTaskDone.done;

  const taskTitle = parentNode.querySelector(".task__title");
  taskTitle.classList.toggle("tasks__title_done");

  saveTasksToLocalStorage()
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasksToLocalStorage() {
  if(localStorage.getItem('tasks'))
  {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
}

function renderTasks(task){
  
    const cssClassTask = task.done
    ? "task__title tasks__title_done"
    : "task__title";

  const createTaskHTML = ` <li id="${task.id}" class="task__item">
<span class="${cssClassTask}">${task.text}</span>
<div class="task__buttons">
  <button
    type="button"
    data-action="done"
    class="button btn-action"
  >
    <img
      src="./assets/svg/tick.svg"
      alt="Done"
      width="18"
      height="18"
    />
  </button>
  <button
    type="button"
    data-action="delete"
    class="button btn-action btn-delete"
  >
    <img
      src="./assets/svg/remove.svg"
      alt="Done"
      width="18"
      height="18"
    />
  </button>
</div>
</li>`;

  tasksList.insertAdjacentHTML("beforeend", createTaskHTML);

}

function checkEmptyList() {
  if(tasks.length === 0){
    const emptyListHTML = `<div class="tasks__empty">
    <img
      src="./assets/image/task-empty.png"
      alt="Empty list"
      class="empty__img"
    />
    <div class="empty__text">Список дел пуст</div>
  </div>`
  tasksContainer.insertAdjacentHTML('afterbegin', emptyListHTML)
  }
  if(tasks.length > 0){
    const emptyListElement = document.querySelector('.tasks__empty');
    emptyListElement ? emptyListElement.remove() : null;
  }
 
}
