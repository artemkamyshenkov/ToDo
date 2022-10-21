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

tasktForm.addEventListener("submit", function (event) {
  //Отмена перезагрузки при отправке формы
  event.preventDefault();

  const taskText = taskInput.value;

  const createTaskHTML = ` <li class="task__item">
  <span class="task__title">${taskText}</span>
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
      class="button btn-action"
    >
      <img
        src="./assets/svg/cross.svg"
        alt="Done"
        width="18"
        height="18"
      />
    </button>
  </div>
</li>`;

  tasksList.insertAdjacentHTML("beforeend", createTaskHTML);
});
