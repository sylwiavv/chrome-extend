const inputBtn = document.querySelector('#input-btn');
const inputBtnDelete = document.querySelector('#delete-btn');
const inputEl = document.querySelector('#input-el');
const leadsList = document.querySelector('#ul-el');
const requiredInfo = document.querySelector('#input-el-info');
let myLeads = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

const render = (leads) => {
let listItems = "";

for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li data-product-id="${leads[i]}" class="item">
      <a href="${leads[i]}" target="_blank">
        ${leads[i]}
       </a>
    </li>`;
}

leadsList.innerHTML = listItems;
}

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', (event) => {
  if (inputEl.value !== "") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    requiredInfo.classList.remove("show");
    inputEl.classList.remove("required");
    render(myLeads);
  } else {
    requiredInfo.classList.add("show");
    inputEl.classList.add("required");
    requiredInfo.teleadstContent = "To pole jest wymagane";
  }
});

inputBtnDelete.addEventListener('click', (event) => {
  localStorage.clear();
  myLeads = [];
  requiredInfo.classList.remove("show");
  inputEl.classList.remove("required");
  render(myLeads);
});
