import {createElement} from "../../utils/createElement.js";
import {ATTACK, HIT} from "../../constants/propsOfPlayer.js";
import getRandom from "../../utils/getRandom.js";
import {$formInputs} from "../../constants/constants.js";

/** class player */
export default class Player {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.rootSelector = props.rootSelector;
    }

    /** change hp of current player */
    changeHP = function (value) {
            this.hp -= value;

        if (this.hp <= 0) {
            this.hp = 0;
        }
    };

    /** render player */
    renderHP() {
        this.elHP().style.width = `${this.hp}%`
    }

    /** choose hp of current player */
    elHP() {
        return this.rootSelector.querySelector(`.player${this.id} .life`);
    }

    /** attack of enemy*/
    enemyAttack() {
        const hit = ATTACK[getRandom(ATTACK.length)];
        const defence = ATTACK[getRandom(ATTACK.length)];

        return {
            value: getRandom(HIT[hit]), hit, defence,
        };
    }

    /** attack of enemy*/
    playerAttack() {
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

        return valuesPlayer1;
    }

    /** create player */
    createPlayer() {
        const $player = createElement('div', `player${this.id}`);
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

        this.rootSelector.append($player);
    }
}