
// Variables

const variables = {
    arcanePower : 0,
    arcaneLimit : 500,
    arcaneClickVal: 1,
    arcaneReinforceCost: 25,
    arcaneResetCost: 300,
    arcaneReset: 1,
    arcaneExpansionCost: 75
}

// Buttons
const reinforceButton = document.getElementById("buttonReinforce");
const expansionButton = document.getElementById("buttonExpansion");
const arcaneResetButton = document.getElementById("buttonArcaneReset");

var reinforceUnlock = false;
var expansionUnlock = false;
var arcaneResetUnlock = false;

// Functions

function arcaneClick() {
    if ((variables.arcaneClickVal + variables.arcanePower) < variables.arcaneLimit) {
        variables.arcanePower = variables.arcanePower + variables.arcaneClickVal;
    }
    else {
        variables.arcanePower = variables.arcaneLimit;
    }
    document.getElementById("arcanePower").innerHTML = variables.arcanePower;
}
function buyArcaneReinforce() {
    if (variables.arcanePower >= variables.arcaneReinforceCost) {
        variables.arcaneClickVal += variables.arcaneReset;
        variables.arcanePower -= variables.arcaneReinforceCost;
        variables.arcaneReinforceCost *= 1.5;
        Update();
    }
}
function buyArcaneExpansion() {
    if (variables.arcanePower >= variables.arcaneExpansionCost) {
        variables.arcaneLimit *= 1.2;
        variables.arcanePower -= variables.arcaneExpansionCost;
        variables.arcaneExpansionCost *= 1.4;
        Update();
    }
}
function buyArcaneReset() {
    if (variables.arcanePower >= variables.arcaneResetCost) {
        variables.arcaneClickVal = Math.pow(2, variables.arcaneReset);
        variables.arcaneReinforceCost = 25;
        variables.arcaneExpansionCost = 100;
        variables.arcanePower = 0;
        variables.arcaneLimit = 500 * (Math.pow(2, variables.arcaneReset));
        variables.arcaneReset++;
        variables.arcaneResetCost *= 10;
        Update();
    }
}

// Updates Costs/Values for Variables, Called Whenever Purchasing an Upgrade

function Update() {
    Round(variables);
    document.getElementById("arcanePower").innerHTML = variables.arcanePower;
    document.getElementById("arcaneClickVal").innerHTML = variables.arcaneClickVal;
    document.getElementById("arcaneReinforceCost").innerHTML = variables.arcaneReinforceCost;
    document.getElementById("arcaneResetCost").innerHTML = variables.arcaneResetCost;
    document.getElementById("arcaneLimit").innerHTML = variables.arcaneLimit;
    document.getElementById("arcaneExpansionCost").innerHTML = variables.arcaneExpansionCost;
    document.getElementById("arcaneReset").innerHTML = variables.arcaneReset;

}

// Rounds down all the values

function Round(object) {
    for (let key of Object.keys(object)) {
        object[key] = Math.floor(object[key]);
    }
}

// Resets all values to default

function Reset() {
    variables.arcanePower = 0;
    variables.arcaneClickVal = 1;
    variables.arcaneLimit = 500;
    variables.arcaneReinforceCost = 25;
    variables.arcaneResetCost = 300;
    variables.arcaneReset = 1;
    variables.arcaneExpansionCost = 75;
    localStorage.removeItem("save");
    Update();
}

// Checks Button Unlocked

function ButtonUnlock() {
    if (!reinforceUnlock && variables.arcanePower >= 10) {
        reinforceButton.classList.toggle("hidden", !(variables.arcanePower >= 10));
        reinforceUnlock = true;
    }
    if (!expansionUnlock && variables.arcanePower >= 10) {
        expansionButton.classList.toggle("hidden", !(variables.arcanePower >= 10));
        expansionUnlock = true;
    }
    if (!arcaneResetUnlock && variables.arcanePower >= 100) {
        arcaneResetButton.classList.toggle("hidden", !(variables.arcanePower >= 100));
        arcaneResetUnlock = true;
    }
}

// Save Function

function save() { 
    localStorage.setItem("save", JSON.stringify(variables));
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    for (let key in savegame) {
        if (savegame[key] !== "undefined") variables[key] = savegame[key];
    }
    Update();
}

load();
setInterval(save, 10000)
setInterval(ButtonUnlock, 100)

