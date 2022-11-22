const headerTime = document.querySelector(".header__time-time"); // Блок HTML с временем;
const headerDate = document.querySelector(".header__time-date"); // Блок HTML с датой;
const greetingText = document.querySelector(".greeting__text"); // Input с приветствием;
const greetingName = document.querySelector(".greeting__name"); // Input с именем пользователем;

// Показать время и дату
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

    //Медиа-запрос для изменения фррмата времени и даты на планшетах;
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    function handleTabletChange(e) {
      if (e.matches) {
        (options.weekday = "short"), (options.month = "short");
      }
    }
    mediaQuery.addListener(handleTabletChange);
    handleTabletChange(mediaQuery);

    const currentDate = date.toLocaleDateString("ru-RU", options);
    headerDate.textContent = currentDate;

    //Обновляем функцию каждую секунду для работы времени
    setTimeout(showTime, 1000);
  }

  showDate();
}
showTime();

// Функция вывода приветствия в зависимости от времени суток;
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

// Сохраняем имя пользователя перед перезагрузкой страницы;
function setLocalStorage() {
  localStorage.setItem("greeting__name", greetingName.value);
}
window.addEventListener("beforeunload", setLocalStorage);

// Получаем имя пользователя после перезагрузки страницы;
function getLocalStorage() {
  if (localStorage.getItem("greeting__name")) {
    greetingName.value = localStorage.getItem("greeting__name");
  }
}
window.addEventListener("load", getLocalStorage);

const tasktForm = document.querySelector(".create-task-block"); // Форма создания задач;
const taskInput = document.querySelector(".create-task-block__input"); // Инпут создания задач;
const tasksList = document.querySelector(".tasks__list"); // ul блок списка задач;
const tasksContainer = document.querySelector(".tasks__container"); // div блок списка задач;
const taskCompleted = document.querySelector(".tasks__completed");

let tasks = []; // Пустой массив, где хранятся задачи;
loadTasksToLocalStorage(); // Получаем из local storage список задач;

// Перебираем массив задач и выводим все в HTML;
tasks.forEach((task) => {
  renderTasks(task);
});
checkEmptyList(); // Проверяем массим на наличие задач;

tasktForm.addEventListener("submit", addTask); // Вызов функции добавление задачи при отправке формы;
tasksList.addEventListener("click", deleteTask); // Вызов функции удаление задачи при клике на кнопку;
tasksList.addEventListener("click", doneTask); // Вызов функции выполненные задачи при клике на кнопку;
//Стили для кнопки добавления задач

//Функция добавления задач;
function addTask(event) {
  //Отмена перезагрузки при отправке формы
  event.preventDefault();

  const taskText = taskInput.value; // Выводим значение input в HTML в виде названия задачи;

  // Создаем  объект с новой задачей;
  const newTask = {
    id: Date.now(), // Id задачи в форме милисекунд для придания уникальности;
    text: taskText, // Текст задачи;
    done: false, // Проверяем выполнена задача или нет, если выполнена, то применить стиль done, задачу зачеркнуть;
  };

  tasks.push(newTask); // Объект с задачей пушим в массив задач;

  renderTasks(newTask); // Вызов функции отображения задач в разметке HTML;

  taskInput.value = ""; // Удаляем значение input после каждой добавленной задачи;
  taskInput.focus(); // Оставляем фокус на input после добаленной задачи;

  saveTasksToLocalStorage(); // При добавлении задачи сохраняем ее в local storage;
  checkEmptyList(); // Проверяем массив на наличие задач;
}

// Функция удаления задач;
function deleteTask(event) {
  if (event.target.dataset.action !== "delete") {
    return;
  }
  const parentNode = event.target.closest(".task__item");
  const taskId = Number(parentNode.id);

  //Фильтрация массива и удаление задачи с целевым индексом
  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasksToLocalStorage();
  parentNode.remove();
  checkEmptyList();
}

// Функция ометки задачи как выполненная;
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

  saveTasksToLocalStorage(); // При добавлении задачи сохраняем ее в local storage;
}

// Сохранение задач в local storage;
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Получение массива задач из local storage;
function loadTasksToLocalStorage() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
}

// Отображаем задачи в разметке HTML;
function renderTasks(task) {
  const cssClassTask = task.done
    ? "task__title tasks__title_done"
    : "task__title";

  const createTaskHTML = ` <li id="${task.id}" class="task__item">
<span class="${cssClassTask}">${task.text}</span>
<div class="task__buttons">
  <button
    type="button"
    data-action="done"
    class="button btn-action btn-done"
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

// Проверка массива на наличие задач для отображаения блок пустого списка задач;
function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<div class="tasks__empty">
    <img
      src="./assets/image/task-empty.png"
      alt="Empty list"
      class="empty__img"
    />
    <div class="empty__text">Список дел пуст</div>
  </div>`;
    tasksContainer.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListElement = document.querySelector(".tasks__empty");
    emptyListElement ? emptyListElement.remove() : null;
  }
}
