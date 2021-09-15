const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffet",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Mukesh Ambani",
];

const listItems = [];

let dragStartIndex;

createList();

// insert list items into DOM
function createList() {
  [...richestPeople]
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((person) => person.value)
    .forEach((person, i) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", i);

      listItem.innerHTML = `
        <span class="number">${i + 1}</span>  
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

// Drag events
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(from, to) {
  const fromItem = listItems[from].querySelector(".draggable");
  const toItem = listItems[to].querySelector(".draggable");

  listItems[from].appendChild(toItem);
  listItems[to].appendChild(fromItem);
}

function addEventListeners() {
  const dragListItems = document.querySelectorAll(".draggable-list li");
  const draggables = document.querySelectorAll(".draggable");

  dragListItems.forEach((item) => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);
  });

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
}

check.addEventListener("click", () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.remove("right");
      listItem.classList.add("wrong");
    } else {
      listItem.classList.add("right");
      listItem.classList.remove("wrong");
    }
  });
});
