// Update the Taskbar Clock
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Optional: Fetch GitHub Star Count or Repos dynamically
async function fetchRepoCount() {
    try {
        const response = await fetch('https://api.github.com/users/IoannisCh');
        const data = await response.json();
        console.log(`Public Repos: ${data.public_repos}`);
        // You can append this info into the profile window body
    } catch (e) {
        console.error("Failed to load GitHub data");
    }
}
fetchRepoCount();