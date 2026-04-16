document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.window');
    const shortcuts = document.querySelectorAll('.shortcut');
    let topZ = 100;

    // --- Functionality: Draggable Logic ---
    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');
        
        titleBar.onmousedown = (e) => {
            // Bring to front on click
            topZ++;
            win.style.zIndex = topZ;

            let shiftX = e.clientX - win.getBoundingClientRect().left;
            let shiftY = e.clientY - win.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                win.style.left = pageX - shiftX + 'px';
                win.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(ev) { moveAt(ev.pageX, ev.pageY); }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        };
    });

    // --- Functionality: Shortcuts & Closing ---
    shortcuts.forEach(s => {
        s.onclick = () => {
            const winId = s.getAttribute('data-window');
            const win = document.getElementById(winId);
            win.style.display = 'block';
            topZ++;
            win.style.zIndex = topZ;
        };
    });

    document.querySelectorAll('.close').forEach(btn => {
        btn.onclick = (e) => {
            e.target.closest('.window').style.display = 'none';
        };
    });

    // --- Functionality: Clock ---
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);
});