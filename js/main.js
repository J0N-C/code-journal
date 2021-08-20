/* global data */
/* exported data */
const $photoUrl = document.querySelector('#entry-photo');

function handleInput(event) {
  $photoUrl.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', handleInput);
