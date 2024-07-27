function copyToClipboard() {
  const urlInput = document.getElementById('shorturl');
  urlInput.select();
  urlInput.setSelectionRange(0, 99999); // For mobile devices

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'URL copied to clipboard!' : 'Failed to copy URL';
    showNotification(msg);
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
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
function shorten() {
  var longurl = document.getElementById("longurl");
  var shorturl = document.getElementById("shorturl");
  shorturl.value = longurl.value;
  copyToClipboard();

}

