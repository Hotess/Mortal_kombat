import date from './utils/date.js';
import getRandom from './utils/getRandom.js';
import {
    enemyAttack,
    playerAttack,
} from './utils/attack.js';
import {
    createElement, createReloadButton,
} from './utils/createElement.js';
import {
    $arenas, $formControl, $fightButton, $chat,
} from './constants/constants.js';

import {
    logs,
} from './constants/propsOfPlayer.js';

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

            generateLogs('hit', this.name, winner.name);

            if (this.hp <= 0) {
                generateLogs('end', winner.name, this.name);
            } else if (this.hp === 0 && winner.hp === 0) {
                generateLogs('draw');
            }
        } else if (me.defence === enemy.hit) {
            generateLogs('defence', winner.name, this.name);
        }

        this.renderHP(winner);
    };

    /** render player */
    this.renderHP = function (winner) {
        this.life.style.width = `${this.hp}%`

        if (player1.hp === 0 && player2.hp === 0) {
            this.playerWins('draw');


        } else if (this.hp <= 0) {
            this.life.style.width = `0%`;
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

const start = logs.start.replace('[time]', date).replace('[player1]', player1.name).replace('[player2]', player2.name);

$chat.innerHTML = `<p>${start}</p>`;

/** log */
function generateLogs(action, playerKicks, playerDefences) {
    let text;

    switch (action) {
        case 'hit':
            text = logs[action][getRandom(logs[action].length)].replace('[playerKick]', playerKicks).replace('[playerDefence]', playerDefences);
            break;
        case 'defence':
            text = logs[action][getRandom(logs[action].length)].replace('[playerKick]', playerKicks).replace('[playerDefence]', playerDefences);
            break;
        case 'end':
            text = logs[action][getRandom(logs[action].length)].replace('[playerWins]', playerKicks).replace('[playerLose]', playerDefences);
            break;
        default:
            text = logs[action];
    }

    $chat.innerHTML += `<p>${text}</p>`;
}


/** handle click fightButton */
$formControl.addEventListener('submit', (event) => {
    event.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack;

    player1.elHP(enemy, player, player2);
    player2.elHP(player, enemy, player1);
});