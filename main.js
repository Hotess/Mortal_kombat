const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button ');

const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [],
    attack: () => {
        console.log(`${name} fight`);
    },
}

const player2 = {
    player: 2,
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: [],
    attack: () => {
        console.log(`${name} fight`);
    },
}

const massivePlayers = [player1, player2];

/** create tag */
function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

/** player lose */
function playerWins(playerObj) {
    const $playerWin = document.createElement('div');
    $playerWin.classList.add('winTitle');

    $playerWin.textContent = `${playerObj.name} wins`;
    $randomButton.disabled = 'disabled';

    $arenas.append($playerWin);
}

/** hp of player */
function changeHp(playerObj, hp) {
    playerObj.hp -= hp;
    console.log(playerObj.hp);
    playerObj.life.style.width = `${playerObj.hp}%`
}

/** create element player & insert in DOM */
function createPlayer() {
    const $player = createElement('div', `player${this.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $name.textContent = this.name;
    $img.src = this.img;
    $img.alt = this.name;

    $life.style.width = `100%`;

    $player.append($progressbar);
    $player.append($character);
    $progressbar.append($life);
    $progressbar.append($name);
    $character.append($img);

    this.life = $life;
    this.element = $player;
}

/** handle click randomButton */
$randomButton.addEventListener('click', () => {
    const idPlayer = Math.floor(Math.random() * massivePlayers.length);
    const hp = Math.floor(Math.random() * 20);

    if (idPlayer === 0) {
        changeHp(player1, hp);
    } else {
        changeHp(player2, hp);
    }

    if (player1.hp < 0) {
        playerWins(player2);
    } else if (player2.hp < 0) {
        playerWins(player1);
    }
});

player1.createPlayer = createPlayer;
player2.createPlayer = createPlayer;

player1.createPlayer();
player2.createPlayer();

$arenas.append(player1.element);
$arenas.append(player2.element);