import date from './../../utils/date.js';
import getRandom from './../../utils/getRandom.js';
import {
    createReloadButton,
} from '../../utils/createElement.js';
import {
    $arenas, $formControl, $fightButton, $chat,
} from '../../constants/constants.js';
import Player from './../Player/index.js';
import {LOGS} from '../../constants/propsOfPlayer.js';

/** class game */
export default class Game {
    constructor() {
        this.player1 = new Player({
            id: 1,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            rootSelector: $arenas,
        });

        this.player2 = new Player({
            id: 2,
            name: 'Liu Kang',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
            rootSelector: $arenas,
        });
    }

    /** fight */
    fight(player) {
        if (player.block.defence !== player.attack.hit) {
            player.current.changeHP(player.attack.value);
            player.current.renderHP();

            this.generateLogs('hit', player.enemy, player.current, player.attack.value);

            if (player.current.hp <= 0) {
                const result = `${player.enemy.name} wins`;

                this.generateLogs('end', player.enemy, player.current);
                this.showResult(result);
            }
        } else if (player.block.defence === player.attack.hit) {
            this.generateLogs('defence', player.enemy, player.current);
        } else {
            this.generateLogs('draw');
            this.showResult('draw');
        }
    }

    /** show result */
    showResult(result) {
        const $playerWin = document.createElement('div');

        $playerWin.classList.add('winTitle');
        $playerWin.textContent = result;

        $fightButton.disabled = 'disabled';

        $arenas.append($playerWin);
        $arenas.append(createReloadButton());
    }

    /** log */
    generateLogs(action, playerKicks, playerDefences, hit) {
        let text;

        switch (action) {
            case 'end':
                text = `${date()} ${LOGS[action][getRandom(LOGS[action].length)].replace('[playerWins]', playerKicks.name).replace('[playerLose]', playerDefences.name)}`;
                break;
            case 'hit':
                text = `${date()} ${LOGS[action][getRandom(LOGS[action].length)].replace('[playerKick]', playerKicks.name).replace('[playerDefence]', playerDefences.name)} ${-hit} [${playerDefences.hp}/${100}]`;
                break;
            case 'defence':
                text = `${date()} ${LOGS[action][getRandom(LOGS[action].length)].replace('[playerKick]', playerKicks.name).replace('[playerDefence]', playerDefences.name)}`;
                break;
            case 'start':
                text = LOGS.start.replace('[time]', date).replace('[player1]', this.player1.name).replace('[player2]', this.player2.name);
                break;
            default:
                text = `${date()} ${LOGS[action]}`;
        }

        $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
    }

    /** handle click fightButton */
    handleSubmit() {
        $formControl.addEventListener('submit', (event) => {
            event.preventDefault();

            const enemy = this.player2.enemyAttack();
            const player = this.player1.playerAttack();

            this.fight({block: player, attack: enemy, current: this.player1, enemy: this.player2});
            this.fight({block: enemy, attack: player, current: this.player2, enemy: this.player1});
        });
    }

    /** eventListener */
    eventListener() {
        this.handleSubmit();
    }

    start() {
        this.generateLogs('start');
        this.player1.createPlayer();
        this.player2.createPlayer();
        this.eventListener();
    }
}