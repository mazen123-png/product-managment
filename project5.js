let name = document.getElementById('name')
let money = document.getElementById('money')
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
//creat product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        name: name.value.toLowerCase(),
        money: money.value,
        count: count.value,
    };
    if (mood == 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block'

    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}
//clear inputs
function clearData() {
    name.value = '';
    money.value = '';
    count.value = '';
};

//read
function showData() {

    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].name}</td>
            <td>${dataPro[i].money}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
        `;
    };

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
};
showData()


//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData()
}
//update
function updateData(i) {
    name.value = dataPro[i].name;
    money.value = dataPro[i].money;

    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}
//search
let searchMood = 'name';
function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchName') {
        searchMood = 'name';
        search.placeholder = 'search by Name';
    } else {
        searchMood = 'money';
        search.placeholder = 'search by sallery';
    }
    search.focus()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'name') {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].name.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].name}</td>
                <td>${dataPro[i].money}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            </tr>
                `;
            }


        }
    }

    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].money.includes(value)) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].name}</td>
                <td>${dataPro[i].money}</td>             
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(  ${i}  )" id="delete">delete</button></td>
            </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

var total = document.getElementById('total')

function getTotal() {
        if (money.value != '') {
            let result = (+money.value)
            total.innerHTML = result;
            total.style.background = '#040';
        } else {
            total.innerHTML = ''
            total.style.background = '#a00d02';
        }
    }

getTotal()

//new

//https://www.youtube.com/watch?v=ix5Prxw5r_8
//https://www.youtube.com/watch?v=xi0vhXFPegw



//2new


