const elForm = document.querySelector(".site-form");
const elSecondForm = document.querySelector(".second-form");
const elInput = document.querySelector(".form-input");
const complitedBtn = document.querySelector(".complited");
const unComplitedBtn = document.querySelector(".uncomplited");
const deletedBtn = document.querySelector(".deleted");
const complitedText = document.querySelector(".complited-text");
const unComplitedText = document.querySelector(".uncomplited-text");
const deletedText = document.querySelector(".deleted-text");

let list = [];
let deletedArr = [];
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputVal = elInput.value.trim();
  if (inputVal.length > 0) {
    const obj = {
      id: list.length,
      title: inputVal,
      isCheked: false,
    };
    list.push(obj);
  }
  renderUi(list);
  elInput.value = "";
});

function renderUi(arr) {
  elSecondForm.innerHTML = null;

  arr.forEach((item) => {
    // create element
    const newLabel = document.createElement("label");
    const newIput = document.createElement("input");
    const newP = document.createElement("p");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    // setAtribut
    newP.textContent = item.title;
    newP.style.margin = "0";
    newIput.setAttribute("type", "checkbox");
    newLabel.setAttribute("class", "new-label");
    editBtn.setAttribute("class", "edit-btn");
    delBtn.setAttribute("class", "del-btn");
    span.setAttribute("class", "btn-wrapper");
    delBtn.dataset.delId = item.id;
    newIput.dataset.checkId = item.id;
    newIput.checked = item.isCheked;
    if (item.isCheked) {
      newP.style.textDecoration = "line-through";
    }
    //append
    span.append(editBtn, delBtn);
    newLabel.append(newIput, newP, span);
    elSecondForm.appendChild(newLabel);

    complitedBtn.textContent = list.filter(
      (item) => item.isCheked === true
    ).length;

    unComplitedBtn.textContent = list.filter(
      (item) => item.isCheked === false
    ).length;

    deletedBtn.textContent = deletedArr.length;

    delBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      const delId = evt.target.dataset.delId;
      const indexDeletedItem = list.findIndex((item) => delId == item.id);
      deletedArr.push(arr[indexDeletedItem]);
      list.splice(indexDeletedItem, 1);
      renderUi(list);
    });

    newIput.addEventListener("click", function (evt) {
      evt.preventDefault();

      const checkId = evt.target.dataset.checkId;

      const item = list.find((item) => item.id == checkId);

      item.isCheked = !item.isCheked;
      renderUi(list);
    });

    editBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
    });
  });
}

complitedBtn.addEventListener("click", function (evt) {
  complitedText.innerHTML = "";
  let complitedArr = list.filter((item) => item.isCheked === true);

  complitedArr.forEach((item) => {
    const newP = document.createElement("p");
    newP.textContent = item.title;
    complitedText.appendChild(newP);
  });
});

unComplitedBtn.addEventListener("click", function (evt) {
  unComplitedText.innerHTML = "";
  let unComplitedArr = list.filter((item) => item.isCheked !== true);

  unComplitedArr.forEach((item) => {
    const newP = document.createElement("p");
    newP.textContent = item.title;
    unComplitedText.appendChild(newP);
  });
});

deletedBtn.addEventListener("click", function (evt) {
  deletedText.innerHTML = "";

  if (deletedArr.length > 0) {
    deletedArr.forEach((item) => {
      const newP = document.createElement("p");
      newP.textContent = item.title;
      deletedText.appendChild(newP);
    });
  } else {
    deletedText.textContent = "No deleted item";
  }
});
