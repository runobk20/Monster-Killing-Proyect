const ATTACK_VALUE = 10; // We use this typo bc is a global value that isn't going to change
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';


const enteredValue = prompt('Type how much health will our entities have', '100');

let chosenMaxLife = +enteredValue;
// Look if the data es a valid input
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

// Writing log of the battle
function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry;
    if (event === LOG_EVENT_PLAYER_ATTACK){
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);
}

function resetHealth() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
}

// Reset the party, including a new bonus life if lost in the previous one
function reset() {
    if (hasBonusLife) {
        resetHealth();
        resetGame(chosenMaxLife);
    } else {
        resetHealth()
        resetGame(chosenMaxLife);
        hasBonusLife = true;
        restoreBonusLife();
    }
}

// Function that analize if the player can use a bonus life, or if the game is over
function endRound() {
    const initialPlayerHealth = currentPlayerHealth; // Set player health as the value before monster hits.
    const playerReceivedDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerReceivedDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerReceivedDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You almost die, but the gods gift you with another chance... Chosen One');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        setTimeout(() => {
            alert('You slay the monster!');
        },200);
        writeToLog(LOG_EVENT_GAME_OVER, 'PLAYER WIN', currentMonsterHealth, currentPlayerHealth);
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        setTimeout(() => {
            alert('You have been slain!')
        },200)
        writeToLog(LOG_EVENT_GAME_OVER, 'MONSTER WIN', currentMonsterHealth, currentPlayerHealth);
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        setTimeout(() => {
            alert('Next round');
        },200);
        writeToLog(LOG_EVENT_GAME_OVER, 'IT\'S A DRAW', currentMonsterHealth, currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

// Attack function
function attackMonster(mode) {
    // Using ternary operator to make the code shorter, an IF statment doesn't return a value, but with ternary operator we can store a value in a variable or constant
    let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let eventLog = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
/*     if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        eventLog = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        eventLog = LOG_EVENT_PLAYER_STRONG_ATTACK;
    } */

    const monsterReceivedDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterReceivedDamage;
    writeToLog(eventLog, monsterReceivedDamage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

// Event handlers functions
function attackHandler() {
    attackMonster('ATTACK')
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK')
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal more than your initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

// Event listeners.
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);