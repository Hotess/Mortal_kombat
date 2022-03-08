/** create tag */
export function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

/** create element button for restart game */
export function createReloadButton() {
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