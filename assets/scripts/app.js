const ATTACK_VALUE = 10; // We use this typo bc is a global value that isn't going to change
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const monsterReceivedDamage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= monsterReceivedDamage;
    const playerReceivedDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerReceivedDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 ) {
        alert('You slay the monster!');
    }
}

attackBtn.addEventListener('click', attackHandler);