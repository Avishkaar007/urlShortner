function copyToClipboard() {
  const urlInput = document.getElementById('shorturl');
  urlInput.select();
  urlInput.setSelectionRange(0, 99999); // For mobile devices

  try {
      const successful = document.execCommand('copy');
      showNotification(successful ? 'URL copied to clipboard!' : 'Failed to copy URL');
  } catch (err) {
      console.error('Oops, unable to copy', err);
      showNotification('Failed to copy URL');
  }
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');

  // Hide the notification after 3 seconds
  setTimeout(() => notification.classList.remove('show'), 3000);
}

function shorten() {
  const longurl = document.getElementById("longurl").value;
  const shorturl = document.getElementById("shorturl");
  
  fetch('/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original: longurl })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Received Data in shorten.js"+data);
      shorturl.value = data.shortUrl;
      copyToClipboard();
  })
  .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('shorten').addEventListener('click', shorten);

});
