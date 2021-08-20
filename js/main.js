/* global data */
/* exported data */
const $photoUrl = document.querySelector('#photolink');
const $photo = document.querySelector('#photo');

function handleInput(event) {
  $photo.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', handleInput);
document.addEventListener('submit', function (event) {
  event.preventDefault();
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
});
