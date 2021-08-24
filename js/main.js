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

/* for switching to new form blank entries */
$newEntry.addEventListener('click', function () {
  $viewForm.querySelector('h2').textContent = 'New Entry';
  $form.title.value = '';
  $form.photo.value = '';
  $form.notes.value = '';
  $form.setAttribute('data-view', 'entry-form');
  handleInput();
  $viewEntries.className = 'hidden';
  $viewForm.className = '';
});

/* for switching to viewing entries */
$showEntries.addEventListener('click', function () {
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
});

/* photo preview */
function handleInput() {
  $photo.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

/* submit entry */
function submitForm(event) {
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
  } else {
    const currentEntry = parseInt($form.getAttribute('data-view'));
    data.entries[currentEntry].title = $form.title.value;
    data.entries[currentEntry].photourl = $form.photo.value;
    data.entries[currentEntry].notes = $form.notes.value;
  }
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
    $item.setAttribute('data-entry-id', entryCount);
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

/* edit entry DECLARED AFTER FUNCTION CREATES HTML */
document.addEventListener('click', function (event) {
  if (event.target && event.target.nodeName !== 'I') return;
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

/* Task: navigate to custom ID? or have to set up separate ID for each? */
