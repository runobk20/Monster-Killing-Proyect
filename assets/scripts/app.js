const ATTACK_VALUE = 40; // We use this typo bc is a global value that isn't going to change
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 5;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const monsterReceivedDamage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= monsterReceivedDamage;
    const playerReceivedDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerReceivedDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        setTimeout(() => {
            alert('You slay the monster!');
        },500);
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        setTimeout(() => {
            alert('You have been slain!')
        },500)
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        setTimeout(() => {
            alert('Next round');
        },500);
    }
}

attackBtn.addEventListener('click', attackHandler);