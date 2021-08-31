const inputBtn = document.querySelector('#input-btn');
const inputBtnDelete = document.querySelector('#delete-btn');
const inputEl = document.querySelector('#input-el');
const leadsList = document.querySelector('#ul-el');
const requiredInfo = document.querySelector('#input-el-info');
let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

const renderLeads = () => {
let listItems = "";

for (let i = 0; i < myLeads.length; i++) {
    listItems += `
    <li data-product-id="${myLeads[i]}" class="item">
      <a href="${myLeads[i]}" target="_blank">
        ${myLeads[i]}
       </a>
       <div class="remove">x</div>
    </li>`;
}

leadsList.innerHTML = listItems;

const removeBtns = document.querySelectorAll('.remove');
const item = document.querySelectorAll('.item');

  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener('click', (e) => {
      const clickedButton = event.target;
      const parentButtonClicked = clickedButton.parentElement;
      const clickedId = parentButtonClicked.dataset.productId;
      const found = leadsFromLocalStorage.find(element => element === clickedId);
      parentButtonClicked.remove();
      const id = myLeads.indexOf(found);
      const removedDrink = myLeads.splice(id,  1);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
    });
  });
}

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

inputBtn.addEventListener('click', (event) => {
  if (inputEl.value !== "") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    requiredInfo.classList.remove("show");
    inputEl.classList.remove("required");
    renderLeads();
  } else {
    requiredInfo.classList.add("show");
    inputEl.classList.add("required");
    requiredInfo.textContent = "To pole jest wymagane";
  }
});

inputBtnDelete.addEventListener('click', (event) => {
  localStorage.clear();
  myLeads = [];
  requiredInfo.classList.remove("show");
  inputEl.classList.remove("required");
  renderLeads();
});
