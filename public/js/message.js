// TODO: Query selectors are not made yet

const messageSend = async (e) => {
    e.preventDefault();

    const message = document.querySelector('#message').value.trim();
    const senderID = document.querySelector('#message-form').getAttribute('data-sender-id');
    const recipientID = document.querySelector('#message-form').getAttribute('data-recipient-id');

    if (message) {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: message, sender_id: senderID, recipient_id: recipientID }),
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