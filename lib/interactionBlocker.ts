let blocker: HTMLDivElement | null = null;

export function addInteractionBlocker(): void {
    if (blocker) return;

    blocker = document.createElement('div');
    Object.assign(blocker.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '9999',
        pointerEvents: 'auto',
        background: 'transparent',
        touchAction: 'none',
        userSelect: 'none',
    });

    document.body.appendChild(blocker);
}

export function removeInteractionBlocker(): void {
    if (blocker) {
        blocker.remove();
        blocker = null;
    }
}
