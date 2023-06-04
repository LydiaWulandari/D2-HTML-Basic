window.onload = function () {
  const date = new Date();
  getCards();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  document.getElementById("date-title").innerHTML = `Date: ${currentDate}`;
};

// Validations

const nameInput = document.querySelector("#nameInput");
const submit = document.querySelector("#submit");
const reset = document.getElementById("#reset");
const nameErr = document.querySelector(".nameErr");
const descErr = document.querySelector(".descErr");
const descriptionInput = document.getElementById("descriptionInput");
const assignTo = document.getElementById("assignInput");
const dueDate = document.getElementById("date");
const taskStatus = document.getElementById("status-id");
const form = document.getElementById("myform");

function validateNameInput() {
  if (nameInput.value.length < 8) {
    nameErr.innerText = "Length should be longer than 8";
    nameErr.style.color = "red";
  } else {
    nameErr.innerText = "";
  }
  console.log(nameInput.value);
}

function validateDescriptonInput() {
  if (descriptionInput.value.length < 15) {
    descErr.innerText = "Length should be longer than 15";
    descErr.style.color = "red";
  } else {
    descErr.innerText = "";
  }
}

function isDueDateValid() {
  const dateRaw = document.querySelector("#date").value;
  return !!dateRaw && new Date(dateRaw) > new Date();
}

function inputPlaceholders() {
  nameInput.placeholder = "Type your name";
  descriptionInput.placeholder = "Type your description";
  dueDate.placeholder = "MM/DD/YYY";
}
inputPlaceholders();

function getDate() {
  submit.addEventListener("click", () => {
    const isNameValid = validateNameInput();
    const isDescriptionValid = validateDescriptonInput();
    const dueDateValid = isDueDateValid();

    const dueDateErr = document.querySelector(".date-err");
    if (!dueDateValid) {
      dueDateErr.classList.remove("d-none");
    } else {
      dueDateErr.classList.add("d-none");
    }

    const formValid = isNameValid && isDescriptionValid && dueDateValid;

    if (formValid) {
      // Dodaj novu karticu
    }
    console.log(dueDate.value);
  });
}
getDate();

//Adding a class
// let id = Math.random().toString(16).slice(2);
// console.log(id)
class TaskManager {
  constructor(name, assign, dueDate2, description, status, id) {
    this.name = name;
    this.assign = assign;
    this.dueDate2 = dueDate2;
    this.description = description;
    this.status = status;
    this.id = id;
  }
}
//function to add card on HTML page and to the array
let toarray = [];
let i = 0;

function addItem(item) {
  const itemHTML =
    '<div class="card">\n' +
    '<div class="card-body" id=' +
    item.id +
    ">\n" +
    ' <h5 class="card-name"><strong>Task name:</strong>' +
    item.name +
    "</h5>\n" +
    ' <h6 class="card-date mb-2 text-muted">Due Date: ' +
    item.dueDate2 +
    "</h6>\n" +
    '<p class="task-status output"><strong>Assign to : ' +
    item.assign +
    "</strong></p>\n" +
    '<div class="card-scroll">\n' +
    '<p class="card-description">\n' +
    " <strong>Description:</strong>\n" +
    " " +
    item.description +
    "\n" +
    " </p>\n" +
    "  </div>\n" +
    '<p class="task-status"><strong>Status : ' +
    item.status +
    "</strong></p>\n" +
    '<button type="button" class="btn btn-outline-success">\n' +
    " Done\n" +
    " </button>\n" +
    '<button type="button"  class="btn deleteBtn btn-outline-danger">\n' +
    " Delete\n" +
    " </button>\n" +
    "  </div>\n" +
    "</div>";
  i = item.id;
  const itemsContainer = document.getElementById("additem");
  itemsContainer.innerHTML += itemHTML;

  //  Test Loop
  //   const list=[1,2,3,4];
  //   for (let i = 0; i < list.length; i++) {
  //     list[i]++;
  //     console.log(list)
  // }

  // Delete Cards
  let deleteButtons = document.querySelectorAll(".deleteBtn");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
      const card = e.target.parentElement.parentElement;
      const id = card.firstElementChild.id;

      for (let j = 0; j < toarray.length; j++) {
        if (toarray[j].id == id) {
          toarray.splice(j, 1);
          localStorage.setItem("toarray", JSON.stringify(toarray));
          break;
        }
      }

      card.remove();
    });
  }
}

function createCard() {
  if (
    nameInput.value &&
    nameInput.value.length >= 8 &&
    descriptionInput.value.length >= 15 &&
    dueDate.value &&
    new Date(dueDate.value) > new Date()
  ) {
    let taskName = nameInput.value;
    let assignName = assignTo.value;
    let dueDate2 = dueDate.value;
    let description = descriptionInput.value;
    let optionSelectedText = document.getElementById("status-id").value;

    i += 1;

    let addItemToArray = {
      id: i,
      name: taskName,
      description: description,
      dueDate: dueDate2,
      assign: assignName,
      status: optionSelectedText,
    };

    addItem(addItemToArray);
    let newCard = new TaskManager(
      addItemToArray.name,
      addItemToArray.assign,
      addItemToArray.dueDate,
      addItemToArray.description,
      addItemToArray.status,
      i
    );
    toarray.push(newCard);
    form.reset();
    console.log(addItemToArray);
    console.log(toarray);
    localStorage.setItem("toarray", JSON.stringify(toarray));
  }
}

submit.addEventListener("click", createCard);

function getCards() {
  let lArray = localStorage.getItem("toarray");
  if (lArray !== null) {
    toarray = JSON.parse(lArray);
    console.log(toarray);
    toarray.forEach(addItem);
  }
}