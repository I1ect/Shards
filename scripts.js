'strict mode'

// Variables

const variables = {
  arcanePower: 0,
  arcaneLimit: 500,
  arcaneReset: 0,
  arcaneReinforceLevel: 0,
  arcaneExpansionLevel: 0,
  incrementDelay: 1000
}

const defaults = {
  arcanePower: 0,
  arcaneLimit: 500,
  arcaneReset: 0,
  arcaneReinforceLevel: 0,
  arcaneExpansionLevel: 0,
  incrementDelay: 1000
}

// Buttons
const reinforceButton = document.getElementById('buttonReinforce')
const expansionButton = document.getElementById('buttonExpansion')
const arcaneResetButton = document.getElementById('buttonArcaneReset')

let reinforceUnlock = false
let expansionUnlock = false
let arcaneResetUnlock = false

let arcaneClickVal = 1
let arcaneReinforceCost = 0
let arcaneResetCost = 0
let arcaneExpansionCost = 0

const arcaneTransfer = document.getElementById('arcaneTransferUI')

// Functions

function arcaneClick () {
  if ((arcaneClickVal + variables.arcanePower) < variables.arcaneLimit) {
    variables.arcanePower += arcaneClickVal
  }
  else {
    variables.arcanePower = variables.arcaneLimit
  }
  document.getElementById('arcanePower').innerHTML = Round(variables.arcanePower)
}
// eslint-disable-next-line no-unused-vars
function buyArcaneReinforce () {
  if (variables.arcanePower >= arcaneReinforceCost) {
    variables.arcanePower -= arcaneReinforceCost
    variables.arcaneReinforceLevel++
    Update()
  }
}
// eslint-disable-next-line no-unused-vars
function buyArcaneExpansion () {
  if (variables.arcanePower >= arcaneExpansionCost) {
    variables.arcaneLimit *= 1.2
    variables.arcanePower -= arcaneExpansionCost
    variables.arcaneExpansionLevel++
    Update()
  }
}
// eslint-disable-next-line no-unused-vars
function buyArcaneReset () {
  if (variables.arcanePower >= arcaneResetCost) {
    variables.arcanePower = 0
    variables.arcaneLimit = 500 * (Math.pow(2, variables.arcaneReset + 1))
    variables.arcaneReset++
    variables.arcaneReinforceLevel = 0
    variables.arcaneExpansionLevel = 0
    Update()
  }
}

// Updates Costs/Values for Variables, Called Whenever Purchasing an Upgrade

function Update () {
  // Modify The Cost Values
  arcaneReinforceCost = 25 * Math.pow(1.5, variables.arcaneReinforceLevel)
  arcaneResetCost = 300 * Math.pow(10, variables.arcaneReset)
  arcaneExpansionCost = 75 * Math.pow(1.5, variables.arcaneExpansionLevel)
  arcaneClickVal = 1 + (variables.arcaneReinforceLevel * (1 + variables.arcaneReset))

  // Update Displayed Values

  document.getElementById('arcanePower').innerHTML = Round(variables.arcanePower)
  document.getElementById('arcaneClickValue').innerHTML = Round(arcaneClickVal)
  document.getElementById('arcaneReinforceCost').innerHTML = Round(arcaneReinforceCost)
  document.getElementById('arcaneResetCost').innerHTML = Round(arcaneResetCost)
  document.getElementById('arcaneLimit').innerHTML = Round(variables.arcaneLimit)
  document.getElementById('arcaneExpansionCost').innerHTML = Round(arcaneExpansionCost)
  document.getElementById('arcaneReset').innerHTML = Round(variables.arcaneReset)
  document.getElementById('powerPerClick').innerHTML = Math.pow(2, variables.arcaneReset)
  document.getElementById('compacityMultiplier').innerHTML = Math.pow(1.2, variables.arcaneExpansionLevel)
}

// Rounds down all the values

function Round (toRound) {
  return (Math.floor(toRound))
}

// Resets all values to default

// eslint-disable-next-line no-unused-vars
function Reset () {
  variables.arcanePower = 0
  variables.arcaneLimit = 500
  variables.arcaneReinforceLevel = 0
  variables.arcaneReset = 0
  variables.arcaneExpansionLevel = 0
  reinforceUnlock = false
  expansionUnlock = false
  arcaneResetUnlock = false
  reinforceButton.classList.toggle('hidden')
  expansionButton.classList.toggle('hidden')
  arcaneResetButton.classList.toggle('hidden')
  localStorage.removeItem('save')
  Update()
}

// Checks Button Unlocked

function ButtonUnlock () {
  if (!reinforceUnlock && variables.arcanePower >= 10) {
    reinforceButton.classList.toggle('hidden', !(variables.arcanePower >= 10))
    reinforceUnlock = true
  }
  if (!expansionUnlock && variables.arcanePower >= 10) {
    expansionButton.classList.toggle('hidden', !(variables.arcanePower >= 10))
    expansionUnlock = true
  }
  if (!arcaneResetUnlock && variables.arcanePower >= 100) {
    arcaneResetButton.classList.toggle('hidden', !(variables.arcanePower >= 100))
    arcaneResetUnlock = true
  }

  if (variables.arcanePower >= 10000) {
    
  }
}

// Save Function

function save () {
  localStorage.setItem('save', JSON.stringify(variables))
}

function load () {
  const savegame = JSON.parse(localStorage.getItem('save'))
  for (const key in savegame) {
    if (savegame[key] !== 'undefined') variables[key] = savegame[key] ?? defaults[key]
  }
  Update()
}

load()
setInterval(save, 5000)
setInterval(ButtonUnlock, 100)
setInterval(arcaneClick, variables.incrementDelay)
