const monstersURL = 'http://localhost:3000/monsters';
let page = 1;

document.addEventListener('DOMContentLoaded', () => {

    fetchMonsters(page);
    createMonsterForm();
    switchPage();

})

function fetchMonsters(page) {
    fetch(`${monstersURL}/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(json => json.forEach(monster => {
        createMonsterCard(monster)
    }))
}

function createMonsterCard(monster) {
    const div = document.getElementById('monster-container')
    div.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age</h4>
        <p>${monster.age}</p>
        <h4>Description</h4>
        <p>${monster.description}</p>
        <br>
    `
}

function createMonsterForm() {
    let monsterForm = document.createElement('form')
    monsterForm.id = 'form'
    
    let name = document.createElement('input')
    name.placeholder = 'Monster Name'
    name.id = 'name'

    let age = document.createElement('input')
    age.placeholder = 'Monster Age'
    age.id = 'age'

    let bio = document.createElement('input')
    bio.placeholder = 'Monster Description'
    bio.id = 'description'

    let create = document.createElement('button')
    create.innerHTML = 'Create'
    create.id = 'create'

    monsterForm.append(name, age, bio, create)
    document.getElementById('create-monster').appendChild(monsterForm)
    submitForm()
}

function postMonster(mon) {
    fetch(monstersURL, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(mon)
    })
    .then(resp => resp.json())
    .then(json => createMonsterCard(json))
}

function submitForm() {
    let form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submitted')
        const monster = {
            'name': e.target.name.value,
            'age': e.target.age.value,
            'description': e.target.description.value
        }
        postMonster(monster)

    })
}

function switchPage() {
    let back = document.getElementById('back')
    let forward = document.getElementById('forward')

    back.addEventListener('click', () => {
        if (page > 1) {
        page--
        }
        else {
            alert('Minimun page reached')
        }
        refresh();
        fetchMonsters(page)
    })

    forward.addEventListener('click', () => {
        if (page < 21) {
        page++
        }
        else {
            alert('Maximum page reached')
        }
        refresh();
        fetchMonsters(page)
    })
}

function refresh() {
    const div = document.getElementById('monster-container')

    div.innerHTML = ''
}