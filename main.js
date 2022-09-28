const elForm = document.querySelector(".site-form");
const elSecondForm = document.querySelector(".second-form");
const elInput = document.querySelector(".form-input");

let list = [];

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

    delBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      const delId = evt.target.dataset.delId;
      const indexDeletedItem = list.findIndex((item) => delId == item.id);
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
