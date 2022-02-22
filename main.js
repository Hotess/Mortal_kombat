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

player1.changeHP = changeHP;
player1.handleElHP = handleElHP;
player1.renderHP = renderHP;
player2.changeHP = changeHP;
player2.handleElHP = handleElHP;
player2.renderHP = renderHP;

player1.createPlayer = createPlayer;
player2.createPlayer = createPlayer;

player1.createPlayer();
player2.createPlayer();

$arenas.append(player1.element);
$arenas.append(player2.element);
$arenas.append(createReloadButton());

const $reloadWrap = document.querySelector('.reloadWrap');
const $restartButton = $reloadWrap.querySelector('.button');
const massivePlayers = [player1, player2];

/** create tag */
function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

/** player wins */
function playerWins(playerObj) {
    const $playerWin = document.createElement('div');

    $playerWin.classList.add('winTitle');

    $playerWin.textContent = `${playerObj.name} wins`;
    $randomButton.disabled = 'disabled';

    $arenas.append($playerWin);
}

/** hp of player */
function changeHP(winner) {
    const hp = Math.floor(Math.random() * 20);

    this.hp -= hp;

    if (this.hp <= 0) {
        manageButtonRestart('');
        playerWins(winner);
    }
    this.renderHP(hp);
}

/** handle hp of current player */
function handleElHP(winner) {
    this.changeHP(winner)
}

/** render current life */
function renderHP() {
    this.life.style.width = `${this.hp}%`

    if (this.hp <= 0) {
        this.life.style.width = `0%`
    }
}

/** manage button restart  */
function manageButtonRestart(prop) {
    $restartButton.disabled = `${prop}`;
}

/** create element button for restart game */
function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button');

    $restartButton.textContent = 'Restart';
    $reloadWrap.append($restartButton);

    return $reloadWrap;
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

manageButtonRestart('disabled');

/** handle click randomButton */
$randomButton.addEventListener('click', () => {
    const idPlayer = Math.floor(Math.random() * massivePlayers.length);

    if (idPlayer === 0) {
        player1.handleElHP(player2);
    } else {
        player2.handleElHP(player1);
    }
});

/** handle click restartButton */
$reloadWrap.addEventListener('click', () => {
    const $playerWin = document.querySelector('.winTitle');

    massivePlayers.forEach((item) => {
        if (item.life.style.width <= '0%') {
            console.log($playerWin);
            item.life.style.width = '100%';
            $playerWin.remove();
            window.location.reload();

        } else {
            manageButtonRestart('disabled');
        }
    });
});