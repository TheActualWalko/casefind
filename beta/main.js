function track (action, data) {
  $.post('/api/track', { action, data });
}

let requestAccessClicked = false;

const requestAccessNodes = document.querySelectorAll('.request-access');
const requestAccessNodeArray = [];
// iterate backwards ensuring that length is an UInt32
for (var i = requestAccessNodes.length >>> 0; i--;) {
  requestAccessNodeArray[i] = requestAccessNodes[i];
}

requestAccessNodeArray.forEach((node) => {
  node.addEventListener('click', () => {
    requestAccessClicked = true;
  })
});

function loaded() {
  if (requestAccessClicked || window.location.href.indexOf('#request-beta-access') >= 0) {
    document.cookie = "MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    showPopup();
  }

  requestAccessNodeArray.forEach((node) => {
    node.addEventListener('click', () => {
      document.cookie = "MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      showPopup();
    });
  })
}

document.getElementById('go-to-app-button').addEventListener('click', () => {
  const accessCode = document.getElementById('code-input').value;
  track('goToAppWithCode', accessCode);
  document.cookie = `accessCode=${accessCode}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  window.location.href = '/search';
});

track('load', window.location.href);

$('[data-tracking]').each(function() {
  $(this).click(() => {
    track('landingPageClick', $(this).attr('data-tracking'));
  });
});