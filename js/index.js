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

const tasks = [
  {
    id: "1138465078061",
    completed: false,
    text: "Посмотреть новый урок по JavaScript",
  },
  {
    id: "1138465078062",
    completed: false,
    text: "Выполнить тест после урока",
  },
  {
    id: "1138465078063",
    completed: false,
    text: "Выполнить ДЗ после урока",
  },
];

class Tasks {
  createTask(taskId, taskText) {
    const tasksContainer = document.querySelector(".tasks__container");
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = taskId;
  }
}
