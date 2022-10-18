const nameUserLogged  = sessionStorage.getItem('user-logged');

if(!nameUserLogged){
    location.href = './tasks-page.html';
};

const usersArray  = JSON.parse(localStorage.getItem('users-list'));
const userLogged  = usersArray.find(user => user.username === nameUserLogged);
let tasksArray    = userLogged.tasks;

const description = document.getElementById('inputDescription');
const detailing   = document.getElementById('inputDetailing');
const formTasks   = document.getElementById('form-task');
const table       = document.getElementById('table');
const accordion   = document.getElementById('accordion');
const message     = document.getElementById('message');

function createTasks(tasksArray){

    table.innerHTML     = '';
    let count = 1;

    tasksArray.forEach(task => {

        table.innerHTML +=
        `
            <tr>
                <td>${count}</td>
                <td>${task.descricao}</td>
                <td>${task.detalhamento}</td>
                <td>
                    <button class="btn btn-success" onclick="editTask(${task.id})">Editar</button>
                    <button class="btn btn-danger" onclick="eraseTask(${task.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Apagar</button>
                </td>
            </tr>
        `
        count++

    });

};

createTasks(tasksArray);

function addTask() {

    task = {
        id           : Math.floor(Date.now() / 1000),
        descricao    : description.value,
        detalhamento : detailing.value,
    };

    tasksArray.push(task);
    localStorage.setItem('users-list', JSON.stringify(usersArray));

    description.value = '';
    detailing.value   = '';

    createTasks(tasksArray);

};

formTasks.addEventListener('submit', (e) => {

    e.preventDefault();

    if(description.value == '' || detailing.value == ''){
        message.classList.replace('d-none', 'd-flex');
        message.textContent = 'Por favor, preenchas os campos';
        return
    };

    addTask();

    message.classList.replace('d-flex', 'd-none');
    message.textContent = '';
    description.value = '';
    detailing.value   = '';

});

function editTask(id){

    const descriptionEdit = document.getElementById('inputDescriptionEdit');
    const detailingEdit   = document.getElementById('inputDetailingEdit');
    const buttonConfirmEdit = document.getElementById('confirmEdit');


    buttonConfirmEdit.addEventListener('click', () => {
        if(descriptionEdit.value == '' || detailingEdit.value == ''){
            alert('Por favor preencha os dois campos')
            return
        }

        let findEdit = tasksArray.findIndex((task) => task.id == id);

        tasksArray[findEdit].descricao = descriptionEdit.value;
        tasksArray[findEdit].detalhamento = detailingEdit.value;

        localStorage.setItem('users-list', JSON.stringify(usersArray));

        createTasks(tasksArray);
        location.reload();
    })

};

function eraseTask(id){

    let findTask = tasksArray.findIndex((task) => task.id === id);

    const newTasksArray = [];

    const confirmErase  = confirm('Deseja excluir o recado?')
    
    if(confirmErase == true){
        if(findTask != -1){
            tasksArray.splice(findTask, 1);
            location.reload();
        };
        localStorage.setItem('users-list', JSON.stringify(usersArray));

        tasksArray = newTasksArray;
        createTasks(tasksArray);
    };

};