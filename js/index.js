const monstersUrl = "http://localhost:3000/monsters"
let startingID = 1
let endingID = 50
let totalMonsters;

document.addEventListener("DOMContentLoaded", (e) => {

    loadMonsters();
    forwardButton();
    backButton();
    handleForm();

});

function loadMonsters() {
    const monsterContainer = document.getElementById("monster-container");
    monsterContainer.innerHTML = ""

    fetch(monstersUrl)
    .then(res => res.json())
    .then(json => {
        totalMonsters = json.length
        renderMonsters(json)
    });
};

function renderMonsters(json) {
    json.forEach(monster => {
         if (monster.id >= startingID && monster.id <= endingID) {
             renderMonster(monster)
         }
    });
};

function renderMonster(monster) {
    const newMonster = document.createElement("div");
    newMonster.style.border = "1px solid black";
    newMonster.style.margin = "10px";
    newMonster.style.padding = "10px";

    const monsterContainer = document.getElementById("monster-container");

    newMonster.innerHTML = `
        <h3>${monster.name}</h3>
        <p>${monster.age}</p>
        <p>${monster.description}</p>
    `
    monsterContainer.appendChild(newMonster);
};

function forwardButton() {
    const button = document.getElementById("forward");
    button.addEventListener("click", (e) => {
        if ((endingID + 50) <= totalMonsters) {
            startingID += 50;
            endingID += 50;
            loadMonsters();
        };
    });
};

function backButton() {
    const button = document.getElementById("back");
    button.addEventListener("click", (e) => {
        if ((startingID - 50) >= 0) {
            startingID -= 50;
            endingID -= 50;
            loadMonsters();
        };
    });
};

function handleForm() {
    const form = document.getElementById("monster-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let formData = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }

        fetch(monstersUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(json => console.log(json))

        form.reset();
    })
}