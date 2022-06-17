const ATTACK_VALUE = 10; // We use this typo bc is a global value that isn't going to change
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const enteredValue = prompt('Type how much health will our entities have', '100');

let chosenMaxLife = +enteredValue;
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function resetHealth() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
}

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

function endRound() {
    const initialPlayerHealth = currentPlayerHealth; // Set player health as the value before monster hits.
    const playerReceivedDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerReceivedDamage;

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
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        setTimeout(() => {
            alert('You have been slain!')
        },200)
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        setTimeout(() => {
            alert('Next round');
        },200);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
    } else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const monsterReceivedDamage = dealMonsterDamage(maxDamage);;
    currentMonsterHealth -= monsterReceivedDamage;
    endRound();
}

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
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);