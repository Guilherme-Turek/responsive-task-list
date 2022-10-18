// Elementos Registro
const register = document.getElementById('form-register');
const loginPage = document.getElementById('login-page');
const username = document.getElementById('inputUsernameRegister');
const password = document.getElementById('inputPasswordRegister');
const confirmP = document.getElementById('inputConfirm');
const alertMessage = document.querySelector('.alert-register');

// Elementos login
const login = document.getElementById('form-login');
const buttonRegister = document.getElementById('register-page');
const alertLogin = document.querySelector('.alert-login');
const usernameLogin = document.getElementById('inputUsername');
const passwordLogin = document.getElementById('inputPassword');

buttonRegister.addEventListener('click', () => {
    login.classList.replace('d-flex', 'd-none');
    register.classList.replace('d-none', 'd-flex');
})

loginPage.addEventListener('click', goToLoginPage)

function goToLoginPage(){
    login.classList.replace('d-none', 'd-flex');
    register.classList.replace('d-flex', 'd-none');
    alertMessage.classList.replace('d-flex', 'd-none');
}

function errorAlert() {

    alertMessage.classList.replace('d-none', 'd-flex');
    alertMessage.classList.add('alert-danger')
};

function successAlert(){
    alertMessage.classList.replace('d-none', 'd-flex');
    alertMessage.classList.add('alert-success')
    alertMessage.innerHTML = 'Conta criada com sucesso!';
    username.value = '';
    password.value = '';
    confirmP.value = '';
};

function errorLogin(){
    alertLogin.classList.replace('d-none', 'd-flex');
    alertLogin.classList.add('alert-danger');
}

// Cadastro de usuários
register.addEventListener('submit', (e) => {
    e.preventDefault();
    let usersList = getUsers();

    if(!username.value || !password.value || !confirmP.value){
        errorAlert()
        alertMessage.innerHTML = 'Por favor, confira todos os campos!'
        return
    } else if (password.value != confirmP.value){
        alertMessage.innerHTML = 'As senhas precisam coincidir!'
        errorAlert()
        return
    }
        const newUser = {
            username : username.value,
            password : password.value,
            tasks    : [],
        };

        usersList.push(newUser);
        localStorage.setItem('users-list', JSON.stringify(usersList));

        successAlert();
        alertMessage.classList.replace('alert-danger', 'alert-success');

        setTimeout(goToLoginPage, 2000);   
});

function getUsers (){
    return JSON.parse(localStorage.getItem('users-list')) || [];
};

// Login do usuário

login.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const accounts = getUsers();

    if(!accounts){
        errorLogin();
        alertLogin.innerHTML = 'Usuário não encontrado, verifique os dados ou crie uma conta'
        return
    } 
    if(accounts.find(account => account.username == usernameLogin.value && account.password != passwordLogin.value)){
        errorLogin();
        alertLogin.innerHTML = 'Senha incorreta';
        return
    }
    const userExist = accounts.find(account => account.username == usernameLogin.value && account.password == passwordLogin.value);
    if(userExist){
        window.location.href = './tasks-page.html';
        sessionStorage.setItem('user-logged', usernameLogin.value);
        usernameLogin.value = '';
        alertLogin.classList.replace('d-flex', 'd-none');
        alertLogin.classList.remove('alert-danger');
        return
    }
        errorLogin();
        alertLogin.innerHTML = 'Usuário não encontrado, verifique os dados ou crie uma conta'
        return
});