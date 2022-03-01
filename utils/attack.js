import getRandom from "./getRandom.js";
import {
    HIT, ATTACK,
} from './../constants/propsOfPlayer.js';
import { $formInputs } from './../constants/constants.js';

/** attack of enemy*/
export function enemyAttack() {
    const hit = ATTACK[getRandom(ATTACK.length)];
    const defence = ATTACK[getRandom(ATTACK.length)];

    return {
        value: getRandom(HIT[hit]), hit, defence,
    };
}

/** attack of enemy*/
export function playerAttack() {
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
