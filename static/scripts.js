document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('guestbook-form');
    const entriesDiv = document.getElementById('guestbook-entries');

    // 서버 없이 초기 데이터 배열 생성
    const entries = [

    ];

    // 초기 데이터 렌더링
    entries.forEach(displayEntry);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;
        const timestamp = new Date().toLocaleString();

        const entry = {
            author: author,
            content: content,
            timestamp: timestamp
        };

        displayEntry(entry);

        form.reset();
    });

    function displayEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('guestbook-entry');

        const headerDiv = document.createElement('div');
        headerDiv.classList.add('guestbook-header');

        const authorStrong = document.createElement('strong');
        authorStrong.textContent = entry.author;

        const timestampSpan = document.createElement('span');
        timestampSpan.classList.add('timestamp');
        timestampSpan.textContent = entry.timestamp;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function () {
            entriesDiv.removeChild(entryDiv);
        });

        headerDiv.appendChild(authorStrong);
        headerDiv.appendChild(timestampSpan);
        headerDiv.appendChild(deleteButton);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('guestbook-content');
        contentDiv.textContent = entry.content;

        entryDiv.appendChild(headerDiv);
        entryDiv.appendChild(contentDiv);

        entriesDiv.appendChild(entryDiv);
    }
});

