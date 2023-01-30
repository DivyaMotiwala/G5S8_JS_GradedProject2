//Store credentials in local storage
const userObject = [
    {
        "username": "test1",
        "password": "test1"
    },
    {
        "username": "test2",
        "password": "test2"
    }
]

window.localStorage.setItem('userObjArr', JSON.stringify(userObject));

const loginForm = document.querySelector('.loginform');
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const input_username = document.getElementById("username");
    const input_password = document.getElementById("password");
    const input_username_val = input_username.value;
    const input_password_val = input_password.value;
    const errMsg = document.querySelector('.errormsg');

    //Fetch values from local storage
    const userArr = JSON.parse(window.localStorage.getItem('userObjArr'));
    let found = false;
    userArr.forEach(userObj => {
        if (userObj.username === input_username_val && userObj.password === input_password_val){
            errMsg.style.display = "none";
            found=true;
            window.location.replace('resume.html');
            
        }
    });
    if(!found)
    {
        errMsg.style.display = "block";
        input_password.value="";
        input_username.value="";
    }
       

});



