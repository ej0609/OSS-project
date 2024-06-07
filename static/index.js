document.getElementById('guestbook-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/guestbook/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ author, content })
    });

    const result = await response.json();
    displayEntry(result.entry);

    // Clear the form fields
    document.getElementById('author').value = '';
    document.getElementById('content').value = '';
});

function displayEntry(entry) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'guestbook-entry';
    entryDiv.innerHTML = `
        <div class="guestbook-header">
            <strong>${entry.author}</strong> <span class="timestamp">${new Date(entry.timestamp).toLocaleString()}</span>
        </div>
        <div class="guestbook-content">${entry.content}</div>
    `;
    document.getElementById('guestbook-entries').appendChild(entryDiv);

    // Scroll to the bottom of the guestbook entries
    document.getElementById('guestbook-entries').scrollTop = document.getElementById('guestbook-entries').scrollHeight;
}
