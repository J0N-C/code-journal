/* global data */
/* exported data */

var entryCount = 0;
const $form = document.querySelector('#code-form');
const $entries = document.querySelector('#entrylist');
const $noEntry = document.querySelector('.no-entry');
const $viewEntries = document.querySelector('#visible-entries');
const $showEntries = document.querySelector('.show-entries');
const $newEntry = document.querySelector('#new-entry');
const $viewForm = document.querySelector('#visible-form');
const $photoUrl = document.querySelector('#photolink');
const $photo = document.querySelector('#photo');

/* photo preview */
$photoUrl.addEventListener('input', handleInput);

/* show all entries */
window.addEventListener('DOMContentLoaded', showEntries());

/* submit entry */
$form.addEventListener('submit', submitForm);

/* for switching to new form */
$newEntry.addEventListener('click', function (event) {
  $viewEntries.className = 'hidden';
  $viewForm.className = '';
});

/* for switching to entries */
$showEntries.addEventListener('click', function (event) {
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
});

/* photo preview */
function handleInput(event) {
  $photo.setAttribute('src', $photoUrl.value);
}

/* submit entry */
function submitForm(event) {
  event.preventDefault();
  const filledForm = {};
  filledForm.entryID = data.nextEntryId;
  filledForm.title = $form.title.value;
  filledForm.photourl = $form.photo.value;
  filledForm.notes = $form.notes.value;
  data.nextEntryId++;
  $form.reset();
  data.entries.push(filledForm);
  document.querySelector('#photo').setAttribute('src', 'images/placeholder-image-square.jpg');
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-data', dataJSON);
  showEntries();
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
}

/* show all entries */
function showEntries() {
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entry';
    return;
  }
  $noEntry.className = 'no-entry hidden';
  while (entryCount < (data.nextEntryId - 1)) {
    const $item = document.createElement('li');
    const $entryRow = document.createElement('div');
    $entryRow.className = 'row';
    const $entryFrame = document.createElement('div');
    $entryFrame.className = 'column-half img-frame';
    const $image = document.createElement('img');
    $image.setAttribute('src', data.entries[entryCount].photourl);
    const $entryText = document.createElement('div');
    $entryText.classname = 'column-half';
    const $title = document.createElement('h3');
    $title.textContent = data.entries[entryCount].title;
    const $notes = document.createElement('p');
    $notes.textContent = data.entries[entryCount].notes;
    $entryText.appendChild($title);
    $entryText.appendChild($notes);
    $entryFrame.appendChild($image);
    $entryRow.appendChild($entryFrame);
    $entryRow.appendChild($entryText);
    $item.appendChild($entryRow);
    $entries.prepend($item);
    entryCount++;
  }
}
