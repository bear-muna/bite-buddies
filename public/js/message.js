// TODO: Query selectors are not made yet

const messageSend = async (e) => {
    e.preventDefault();

    const message = document.querySelector('#message').value.trim();
    
    if (message) {
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Cannot send message');
        }
    }
};

document
    .querySelector('#message-form')
    .addEventListener('submit', messageSend);