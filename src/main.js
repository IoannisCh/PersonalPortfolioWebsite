document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize all systems
    initDraggable();
    initClock();
    initTerminal();
    initSystemMonitor();
});

/**
 * WINDOW DRAGGING SYSTEM
 */
function initDraggable() {
    const windows = document.querySelectorAll('.window');
    let topZ = 100;

    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');
        
        titleBar.onmousedown = (e) => {
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

    // Handle Close Buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.onclick = (e) => {
            e.target.closest('.window').style.display = 'none';
        };
    });
}

/**
 * TERMINAL / SHELL SYSTEM
 */
function initTerminal() {
    const termInput = document.getElementById('term-input');
    const termHistory = document.getElementById('terminal-history');
    if (!termInput) return;

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.toLowerCase().trim();
            
            // Create output line
            let output = `<br><span class="prompt">guest@ioannis:~$</span> ${cmd}<br>`;
            
            // Logic Switch
            if (cmd === 'ls') {
                output += "OsDev/  CSProject/  Bio.txt  Contact.sh";
            } else if (cmd === 'help') {
                output += "Available commands: ls, whoami, clear, github";
            } else if (cmd === 'whoami') {
                output += "IoannisCh - Systems Engineer & Software Developer";
            } else if (cmd === 'github') {
                output += "Opening GitHub profile...";
                window.open('https://github.com/IoannisCh', '_blank');
            } else if (cmd === 'clear') {
                termHistory.innerHTML = 'Terminal cleared.';
                termInput.value = '';
                return;
            } else if (cmd !== "") {
                output += `bash: ${cmd}: command not found`;
            }

            termHistory.innerHTML += output;
            termInput.value = '';
            termHistory.scrollTop = termHistory.scrollHeight;
        }
    });
}

/**
 * SYSTEM MONITOR (SIMULATED STATS)
 */
function initSystemMonitor() {
    const cpuBar = document.getElementById('cpu-load');
    const memBar = document.getElementById('mem-load');

    setInterval(() => {
        if(cpuBar && memBar) {
            const cpu = Math.floor(Math.random() * 15) + 5; // 5-20%
            const mem = 42 + Math.random(); // Stable 42%
            cpuBar.style.width = cpu + '%';
            memBar.style.width = mem + '%';
        }
    }, 2000);
}

/**
 * TASKBAR CLOCK
 */
function initClock() {
    const clock = document.getElementById('clock');
    const update = () => {
        clock.innerText = new Date().toLocaleTimeString();
    };
    setInterval(update, 1000);
    update();
}