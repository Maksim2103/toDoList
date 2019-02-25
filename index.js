let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let unfinishedTasks = document.getElementById('unfinished-tasks');
let finishedTasks = document.getElementById('finished-tasks');

function createNewElement(task, repeat) {
  let listItem = document.createElement('li');
  let checkbox = document.createElement('button');

  if (repeat) {
    checkbox.className = 'material-icons checkbox';
    checkbox.innerHTML = "<i class='material-icons'> check_box</i>";
  } else {
    checkbox.className = 'material-icons checkbox';
    checkbox.innerHTML =
      "<i class='material-icons'> check_box_outline_blank</i>";
  }

  let editButton = document.createElement('button');
  editButton.className = 'material-icons edit';
  editButton.innerHTML = "<i class='material-icons'>edit</i>";
  let deleteButton = document.createElement('button');
  deleteButton.className = 'material-icons delete';
  deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

  let text = document.createElement('p');
  text.className = 'pppp';
  text.innerHTML = task;

  listItem.appendChild(checkbox);
  listItem.appendChild(text);
  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);

  return listItem;
}

function addTask() {
  if (inputTask.value) {
    let listItem = createNewElement(inputTask.value);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvent(listItem, finishTask);
    inputTask.value = '';
  }
  save();
}

addButton.onclick = addTask;

function deleteTask() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
  save();
}

function editTask() {
  let editButton = this;
  let listItem = this.parentNode;
  let p = listItem.querySelector('p');

  let containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    p.innerText = p.value;
    editButton.className = 'material-icons edit';
    editButton.innerHTML = "<i class='material-icons' >edit</i>";
    save();
  } else {
    p.value = p.innerText;
    editButton.className = 'material-icons save';
    editButton.innerHTML = "<i class='material-icons' >save</i>";
  }
  listItem.classList.toggle('editMode');
}

function finishTask() {
  let listItem = this.parentNode;
  let checkbox = listItem.querySelector('button.checkbox');
  checkbox.className = 'material-icons checkbox';
  checkbox.innerHTML = "<i class='material-icons'> check_box</i>";

  finishedTasks.appendChild(listItem);
  bindTaskEvent(listItem, unfinishTask);
  save();
}

function unfinishTask() {
  let listItem = this.parentNode;
  let checkbox = listItem.querySelector('button.checkbox');
  checkbox.className = 'material-icons checkbox';
  checkbox.innerHTML = "<i class='material-icons'> check_box_outline_blank</i>";

  unfinishedTasks.appendChild(listItem);
  bindTaskEvent(listItem, finishTask);
  save();
}

function bindTaskEvent(listItem, checkboxEvent) {
  let checkbox = listItem.querySelector('button.checkbox');
  let editButton = listItem.querySelector('button.edit');
  let deleteButton = listItem.querySelector('button.delete');

  checkbox.onclick = checkboxEvent;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
}

function save() {
  let unfinishedTasksArr = [];
  for (let i = 0; i < unfinishedTasks.children.length; i++) {
    unfinishedTasksArr.push(
      unfinishedTasks.children[i].getElementsByTagName('p')[0].innerText
    );
  }

  let finishedTasksArr = [];
  for (let i = 0; i < finishedTasks.children.length; i++) {
    finishedTasksArr.push(
      finishedTasks.children[i].getElementsByTagName('p')[0].innerText
    );
  }

  localStorage.removeItem('tdlist');
  localStorage.setItem(
    'tdlist',
    JSON.stringify({
      unfinishedTasks: unfinishedTasksArr,
      finishedTasks: finishedTasksArr
    })
  );
}

function load() {
  return JSON.parse(localStorage.getItem('tdlist'));
}

let data = load();

for (let i = 0; i < data.unfinishedTasks.length; i++) {
  let listItem = createNewElement(data.unfinishedTasks[i], false);
  unfinishedTasks.appendChild(listItem);
  bindTaskEvent(listItem, finishTask);
}

for (let i = 0; i < data.finishedTasks.length; i++) {
  let listItem = createNewElement(data.finishedTasks[i], true);
  finishedTasks.appendChild(listItem);
  bindTaskEvent(listItem, unfinishTask);
}
