import 'style.css';

// Initialize the Desktop Environment
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    makeDraggable(document.querySelector('.window'));
});

// Function to handle Window Draggability
function makeDraggable(el) {
    if (!el) return;
    const header = el.querySelector('.title-bar');

    header.onmousedown = (e) => {
        // Bring to front
        el.style.zIndex = 100;
        
        let shiftX = e.clientX - el.getBoundingClientRect().left;
        let shiftY = e.clientY - el.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            el.style.left = pageX - shiftX + 'px';
            el.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };
}

// Simple Clock Logic
function initClock() {
    const clockEl = document.getElementById('clock');
    const update = () => {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    setInterval(update, 1000);
    update();
}