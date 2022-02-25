const $arenas = document.querySelector('.arenas');
const $formControl = document.querySelector('form.control');
const $fightButton = $formControl.querySelector('.button');
const $formInputs = $formControl.querySelectorAll('input[type=radio]');
const $chat = document.querySelector('.chat ');

const HIT = {
    head: 30, body: 25, foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

/** create object player */
function Player(player, name, hp, img, weapon) {
    this.player = player;
    this.name = name;
    this.hp = hp;
    this.img = img;
    this.weapon = [].push(weapon);

    /** player attack */
    this.attack = function () {
        console.log(`${this.name} fight`);
    };

    /** change hp of current player */
    this.changeHP = function (enemy, me, winner) {
        if (me.defence !== enemy.hit) {
            this.hp -= enemy.value;
        }
        console.log(winner.name);
        this.renderHP(winner);
    };

    /** render player */
    this.renderHP = function (winner) {
        this.life.style.width = `${this.hp}%`

        if (player1.hp === 0 && player2.hp === 0) {
            this.playerWins(`draw`);

        } else if (this.hp <= 0) {
            this.life.style.width = `0%`
            this.playerWins(`${winner.name} wins`);
        }
    }

    /** choose hp of current player */
    this.elHP = function (enemy, me, winner) {
        this.changeHP(enemy, me, winner);
    }

    /** create player */
    this.createPlayer = function () {
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

    /** player wins */
    this.playerWins = function (winner) {
        const $playerWin = document.createElement('div');

        $playerWin.classList.add('winTitle');
        $playerWin.textContent = `${winner}`;

        $fightButton.disabled = 'disabled';

        $arenas.append($playerWin);
        $arenas.append(createReloadButton());
    }
}

const player1 = new Player(1, 'Scorpion', 100, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif');
const player2 = new Player(2, 'Liu Kang', 100, 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif');

player1.createPlayer();
player2.createPlayer();

$arenas.append(player1.element);
$arenas.append(player2.element);

/** create tag */
function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

/** create element button for restart game */
function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');

    const $restartButton = createElement('button', 'button');

    $restartButton.textContent = 'Restart';
    $reloadWrap.append($restartButton);

    /** handle click restartButton */
    $reloadWrap.addEventListener('click', () => {
        window.location.reload();
    });

    return $reloadWrap;
}

/** get random number */
function getRandom(num) {
    return Math.floor(Math.random() * num);
}

/** attack of enemy*/
function enemyAttack() {
    const hit = ATTACK[getRandom(3)];
    const defence = ATTACK[getRandom(3)];

    return {
        value: getRandom(HIT[hit]), hit, defence,
    };
}

/** handle click fightButton */
$formControl.addEventListener('submit', (event) => {
    event.preventDefault();

    const enemy = enemyAttack();
    const valuesPlayer1 = {};

    $formInputs.forEach(item => {
        if (item.checked) {
            if (item.name === 'hit') {
                valuesPlayer1.value = getRandom(HIT[item.value]);
                valuesPlayer1.hit = item.value;
            } else {
                valuesPlayer1[item.name] = item.value;
            }
        }
        item.checked = '';
    });

    player1.elHP(enemy, valuesPlayer1, player2);
    player2.elHP(valuesPlayer1, enemy, player1);

    $chat.innerHTML += `<p>${player1.name}: life - ${player1.life.style.width}, hit - ${valuesPlayer1.hit}, defence - ${valuesPlayer1.defence}.\n${player2.name}: life - ${player2.life.style.width}, hit - ${enemy.hit}, defence - ${enemy.defence}</p>`
});