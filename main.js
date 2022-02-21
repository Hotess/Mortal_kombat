const $arenas = document.querySelector('.arenas');

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

/** create element div */
function createDiv() {
    return document.createElement('div');
}

/** create element Img */
function createImg() {
    return document.createElement('Img');
}

/** create element player & insert in DOM */
function createPlayer(player, hp) {
    const $player = createDiv();
    const $progressbar = createDiv();
    const $character = createDiv();
    const $life = createDiv();
    const $name = createDiv();
    const $img = createImg();

    $player.classList.add(`player${player.player}`);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $name.classList.add('name');
    $name.textContent = player.name;
    $img.src = player.img;
    $img.alt = player.name;

    $life.style.width = hp;

    $player.append($progressbar);
    $player.append($character);
    $progressbar.append($life);
    $progressbar.append($name);
    $character.append($img);
    $arenas.append($player);
}

createPlayer(player1,50);
createPlayer(player2,80);