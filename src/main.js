let topZ = 100;

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initWindowControls(); // Handles Draggable AND Closing
    initTerminal();
    initSystemMonitor();
});

/**
 * WINDOW CONTROLS (Drag, Close, Z-Index)
 */
function initWindowControls() {
    const windows = document.querySelectorAll('.window');

    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');
        const closeBtn = win.querySelector('.close-btn');

        // 1. Dragging Logic
        titleBar.onmousedown = (e) => {
            topZ++;
            win.style.zIndex = topZ;
            
            let shiftX = e.clientX - win.getBoundingClientRect().left;
            let shiftY = e.clientY - win.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                win.style.left = pageX - shiftX + 'px';
                win.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(ev) {
                moveAt(ev.pageX, ev.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        };

        // 2. Closing Logic
        if (closeBtn) {
            closeBtn.onclick = () => {
                win.style.display = 'none';
            };
        }
    });
}

/**
 * TERMINAL SYSTEM
 */
function initTerminal() {
    const input = document.getElementById('term-input');
    const history = document.getElementById('term-history');
    
    if (!input || !history) return;

    // Show initial instructions (The "Boot" look)
    history.innerHTML = `<div style="color: #888;">[OK] Kernel Loaded.<br>[OK] Terminal Initialized.<br><br>Type 'help' to see available commands.</div>`;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.toLowerCase().trim();
            let response = `<br><span style="color: #aaa;">guest@ioannis:~$</span> ${val}<br>`;
            
            if (val === 'ls') {
                response += "bio.txt  projects/  skills.sys";
            } else if (val === 'help') {
                response += "Available commands: <span style='color:#fff'>ls, help, clear, github, whoami</span>";
            } else if (val === 'whoami') {
                response += "IoannisCh - Systems Engineer (C++, OsDev)";
            } else if (val === 'github') {
                response += "Opening GitHub profile...";
                window.open('https://github.com/IoannisCh', '_blank');
            } else if (val === 'clear') {
                history.innerHTML = '';
                input.value = '';
                return;
            } else if (val !== "") {
                response += `bash: ${val}: command not found`;
            }

            history.innerHTML += response;
            input.value = '';
            // Auto-scroll to bottom
            const body = input.closest('.terminal-bg');
            body.scrollTop = body.scrollHeight;
        }
    });
}

/**
 * SYSTEM MONITOR (Fluctuating bars)
 */
function initSystemMonitor() {
    const cpuFill = document.getElementById('cpu-fill');
    const memFill = document.getElementById('mem-fill');

    setInterval(() => {
        if (cpuFill && memFill) {
            const cpu = Math.floor(Math.random() * 15) + 5; // 5-20%
            const mem = 42 + (Math.random() * 2); // Stable around 42%
            cpuFill.style.width = cpu + '%';
            memFill.style.width = mem + '%';
        }
    }, 1500);
}

/**
 * CLOCK
 */
function initClock() {
    const clock = document.getElementById('clock');
    const update = () => {
        if (!clock) return;
        const d = new Date();
        clock.textContent = d.getHours().toString().padStart(2, '0') + ":" + 
                            d.getMinutes().toString().padStart(2, '0') + ":" + 
                            d.getSeconds().toString().padStart(2, '0');
    };
    setInterval(update, 1000);
    update();
}

/**
 * GLOBAL UI HELPERS
 */
window.toggleStartMenu = function(e) {
    e.stopPropagation();
    const menu = document.getElementById('start-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
};

window.openWindow = function(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.display = 'block';
        topZ++;
        win.style.zIndex = topZ;
        
        // Auto-focus terminal if opened
        if (id === 'term-win') {
            setTimeout(() => document.getElementById('term-input').focus(), 10);
        }
    }
    document.getElementById('start-menu').style.display = 'none';
};

// Close menu when clicking desktop
document.addEventListener('click', () => {
    const menu = document.getElementById('start-menu');
    if (menu) menu.style.display = 'none';
});