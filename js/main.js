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
const $deleteEntry = document.querySelector('#delete-entry');
const deletePopup = document.querySelector('#delete-popup');
const $confirmDelete = document.querySelector('#confirm-delete');
const $cancelDelete = document.querySelector('#cancel-delete');

/* photo preview listener */
$photoUrl.addEventListener('input', handleInput);

/* load all entries */
window.addEventListener('DOMContentLoaded', showEntries());

/*
list of all entries -- leave after showEntries func
nodelist is reversed data array! node.children updates nodes live, unlike querySelectorAll().
*/
const $entryList = $entries.children;

/* submit entry */
$form.addEventListener('submit', submitForm);

/* for switching to new form blank entries */
$newEntry.addEventListener('click', function () {
  $viewForm.querySelector('h2').textContent = 'New Entry';
  $form.reset();
  $form.setAttribute('data-view', 'entry-form');
  handleInput();
  $viewEntries.className = 'hidden';
  $deleteEntry.className = 'hidden';
  $viewForm.className = '';
});

/* for switching to viewing entries */
$showEntries.addEventListener('click', function () {
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
});

/* delete popup */
$deleteEntry.addEventListener('click', function () {
  deletePopup.className = '';
});

/* cancel delete */
$cancelDelete.addEventListener('click', function () {
  deletePopup.className = 'hidden';
});

/* delete entry */
$confirmDelete.addEventListener('click', function () {
  deletePopup.className = 'hidden';
  const currentEntry = parseInt($form.getAttribute('data-view')); /* currentEntry = data-view of current page, set by listener of line 116 */
  data.entries.splice(currentEntry, 1); /* remove object from data.entries */
  let entryListIndex = $entryList.length - (currentEntry + 1); /* Reverse index for $entryList */
  $entryList[entryListIndex].remove(); /* Remove node from $entryList */
  entryCount = data.entries.length; /* reset entryCount */
  entryListIndex--; /* subtract 1 for deleted element */
  while (entryListIndex >= 0) {
    const newCount = parseInt($entryList[entryListIndex].getAttribute('data-entry-id')) - 1;
    $entryList[entryListIndex].setAttribute('data-entry-id', newCount);
    $entryList[entryListIndex].setAttribute('id', newCount);
    entryListIndex--;
  } /* loop to update all data-entry-id */
  data.nextEntryId--; /* subtract 1 from nextEntryId */
  let dataEntryNum = currentEntry; /* for looping all entryID */
  while (dataEntryNum < data.nextEntryId - 1) {
    data.entries[dataEntryNum].entryID--;
    dataEntryNum++;
  } /* loop to update all entryID property values in data.entries */
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
  if (currentEntry) {
    document.getElementById(currentEntry - 1).scrollIntoView();
  }
});

/* photo preview func */
function handleInput() {
  $photo.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

/* submit or edit entry func */
function submitForm(event) {
  let currentEntry = null;
  event.preventDefault();
  if ($form.getAttribute('data-view') === 'entry-form') {
    const filledForm = {};
    filledForm.entryID = data.nextEntryId;
    filledForm.title = $form.title.value;
    filledForm.photourl = $form.photo.value;
    filledForm.notes = $form.notes.value;
    data.nextEntryId++;
    $form.reset();
    data.entries.push(filledForm);
    document.querySelector('#photo').setAttribute('src', 'images/placeholder-image-square.jpg');
    showEntries();
  } else {
    currentEntry = parseInt($form.getAttribute('data-view'));
    data.entries[currentEntry].title = $form.title.value;
    data.entries[currentEntry].photourl = $form.photo.value;
    data.entries[currentEntry].notes = $form.notes.value;
    const entryListIndex = $entryList.length - (currentEntry + 1); /* nodelist is reversed data array! */
    $entryList[entryListIndex].querySelector('h3').textContent = $form.title.value;
    $entryList[entryListIndex].querySelector('img').setAttribute('src', $form.photo.value);
    $entryList[entryListIndex].querySelector('p').textContent = $form.notes.value;
  }
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
  if (currentEntry !== null) {
    document.getElementById(currentEntry).scrollIntoView();
  }
}

/* edit entry DECLARE AFTER FUNCTION CREATES HTML */
document.addEventListener('click', function (event) {
  if (event.target && event.target.nodeName !== 'I') return;
  $deleteEntry.className = '';
  const currentEntry = event.target.closest('li').getAttribute('data-entry-id');
  $viewEntries.className = 'hidden';
  $viewForm.className = '';
  $viewForm.querySelector('h2').textContent = 'Edit Entry';
  $photo.setAttribute('src', data.entries[currentEntry].photourl);
  $form.title.value = data.entries[currentEntry].title;
  $form.photo.value = data.entries[currentEntry].photourl;
  $form.notes.value = data.entries[currentEntry].notes;
  $form.setAttribute('data-view', currentEntry);
});

/* show all entries func */
function showEntries() {
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entry';
    return;
  }
  $noEntry.className = 'no-entry hidden';
  while (entryCount < (data.nextEntryId - 1)) {
    const $item = document.createElement('li');
    $item.setAttribute('data-entry-id', entryCount);
    $item.setAttribute('id', entryCount);
    const $entryRow = document.createElement('div');
    $entryRow.className = 'row';
    const $entryFrame = document.createElement('div');
    $entryFrame.className = 'column-half img-frame';
    const $image = document.createElement('img');
    $image.setAttribute('src', data.entries[entryCount].photourl);
    const $entryTitle = document.createElement('div');
    $entryTitle.className = 'row space-bt';
    const $entryText = document.createElement('div');
    $entryText.className = 'column-half';
    const $title = document.createElement('h3');
    $title.textContent = data.entries[entryCount].title;
    const $editIcon = document.createElement('i');
    $editIcon.className = 'fas fa-pen fa-lg purple';
    const $notes = document.createElement('p');
    $notes.textContent = data.entries[entryCount].notes;
    $entryTitle.appendChild($title);
    $entryTitle.appendChild($editIcon);
    $entryText.appendChild($entryTitle);
    $entryText.appendChild($notes);
    $entryFrame.appendChild($image);
    $entryRow.appendChild($entryFrame);
    $entryRow.appendChild($entryText);
    $item.appendChild($entryRow);
    $entries.prepend($item);
    entryCount++;
  }
}
/* CREATED HTML SKELETON
          <li>
            <div class="row">
              <div class="column-half img-frame">
                <img src="images/nelson.png" alt="placeholder">
              </div>
              <div class="column-half">
                <div class="row space-bt">
                  <h3>Test Title</h3>
                  <i id="edit" class="fas fa-pen fa-lg purple"></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem excepturi aut!</p>
              </div>
            </div>
          </li>
*/
