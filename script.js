const inputExpense = document.getElementById('exp-amt');
const inputDescription = document.getElementById('desc');
const inputCategory = document.getElementById('expense-cat');
const userList = document.getElementById('users');
const form = document.getElementById('form');
const msg = document.querySelector('.msg');

form.addEventListener('submit', addUser);
userList.addEventListener('click', removeUser);
userList.addEventListener('click', editUser);

function addUser(e) {
    e.preventDefault();

    if (inputExpense.value === '' || inputDescription.value === '' || inputCategory.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        console.log(1);

        setTimeout(() => msg.remove(), 2000);
    } else {
        //Creating different elements to be added in DOM
        const li = document.createElement('li');
        const delBtn = document.createElement('input');
        const editBtn = document.createElement('input');

        //Creating Delete button
        delBtn.className = 'del float-right';
        delBtn.setAttribute('type', "button");
        delBtn.setAttribute('value', "DELETE");

        //Creating Edit button
        editBtn.className = 'edit float-right';
        editBtn.setAttribute('type', "button");
        editBtn.setAttribute('value', "EDIT");

        //Appending all above 3 elements
        li.appendChild(document.createTextNode(`${inputExpense.value} - ${inputDescription.value} - ${inputCategory.value}`));
        li.appendChild(delBtn); 
        li.appendChild(editBtn);
  

        //appendimg the li to ul inside DOM
        userList.appendChild(li);
    
        //Storing user Data as an object
        const expenseList = {
            inputExpense: `${inputExpense.value}`,
            inputDescription: `${inputDescription.value}`,
            inputCategory: `${inputCategory.value}`
        }

        //setting localStorage with userData
        localStorage.setItem(inputCategory.value, JSON.stringify(expenseList));

        inputExpense.value = '';
        inputDescription.value = '';
        inputCategory.value = '';

    }
}

function removeUser(e) {
    if(e.target.classList.contains('del')) {
        if(confirm('Are you sure!')) {
        //spliting li text, returns an array
        partsString = e.target.parentElement.innerText.split('-');
        food_category = partsString[2].trim();
        console.log(food_category);
        userList.removeChild(e.target.parentElement);
        localStorage.removeItem(food_category);
        }
    }
}

function editUser(e) {
    if(e.target.classList.contains('edit')) {
        if(confirm('Are you sure')) {
            partsString = e.target.parentElement.innerText.split('-');
            inputExpense.value = partsString[0].trim();
            inputDescription.value = partsString[1].trim();
            inputCategory.value = partsString[2].trim();
            localStorage.removeItem(partsString[2].trim());
            userList.removeChild(e.target.parentElement);
        }
    }
}