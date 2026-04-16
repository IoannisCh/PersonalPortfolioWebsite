import 'style.css';

document.addEventListener('DOMContentLoaded', () => {
    const windowEl = document.getElementById('bio-window');
    const titleBar = windowEl.querySelector('.title-bar');

    // 1. Draggable Logic
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offset.x = e.clientX - windowEl.offsetLeft;
        offset.y = e.clientY - windowEl.offsetTop;
        windowEl.style.zIndex = 1000; // Bring to front
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        windowEl.style.left = `${e.clientX - offset.x}px`;
        windowEl.style.top = `${e.clientY - offset.y}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 2. Taskbar Clock
    const updateClock = () => {
        const now = new Date();
        const clock = document.getElementById('clock');
        clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    setInterval(updateClock, 1000);
    updateClock();
});