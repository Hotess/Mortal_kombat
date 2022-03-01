const $arenas = document.querySelector('.arenas');
const $formControl = document.querySelector('form.control');
const $fightButton = $formControl.querySelector('.button');
const $formInputs = $formControl.querySelectorAll('input[type=radio]');
const $chat = document.querySelector('.chat ');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

/** date */
function date() {
    const current_datetime = new Date();
    const hours = current_datetime.getHours();
    const minutes = current_datetime.getMinutes();

    return `${hours}:${minutes}`
}

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
    const hit = ATTACK[getRandom(ATTACK.length)];
    const defence = ATTACK[getRandom(ATTACK.length)];

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
});