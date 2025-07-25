const list = document.getElementById('list');
const input = document.getElementById('itemInput');
let saved = JSON.parse(localStorage.getItem('shoppingList')) || [];

function renderList() {
  list.innerHTML = '';
  saved.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item} <button onclick="removeItem(${index})">X</button>`;
    list.appendChild(li);
  });
}

function addItem() {
  const value = input.value.trim();
  if (value) {
    saved.push(value);
    localStorage.setItem('shoppingList', JSON.stringify(saved));
    renderList();
    input.value = '';
  }
}

function removeItem(index) {
  saved.splice(index, 1);
  localStorage.setItem('shoppingList', JSON.stringify(saved));
  renderList();
}

renderList();