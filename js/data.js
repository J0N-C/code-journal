/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntries = localStorage.getItem('journal-data');
if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

const $form = document.querySelector('#code-form');
const $entries = document.querySelector('#entrylist');
const $noEntry = document.querySelector('.no-entry');
const $viewEntries = document.querySelector('#visible-entries');
const $showEntries = document.querySelector('.show-entries');
const $newEntry = document.querySelector('#new-entry');
const $viewForm = document.querySelector('#visible-form');

window.addEventListener('DOMContentLoaded', showEntries(event));

$form.addEventListener('submit', submitForm);

$newEntry.addEventListener('click', function (event) {
  $viewEntries.className = 'hidden';
  $viewForm.className = '';
});

$showEntries.addEventListener('click', function (event) {
  $viewEntries.className = '';
  $viewForm.className = 'hidden';
});

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
}

function showEntries() {
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entry';
    return;
  }
  $noEntry.className = 'no-entry hidden';
  for (let i = (data.entries.length - 1); i >= 0; i--) {
    const $item = document.createElement('li');
    const $entryRow = document.createElement('div');
    $entryRow.className = 'row';
    const $entryFrame = document.createElement('div');
    $entryFrame.className = 'column-half img-frame';
    const $image = document.createElement('img');
    $image.setAttribute('src', data.entries[i].photourl);
    const $entryText = document.createElement('div');
    $entryText.classname = 'column-half';
    const $title = document.createElement('h3');
    $title.textContent = data.entries[i].title;
    const $notes = document.createElement('p');
    $notes.textContent = data.entries[i].notes;
    $entryText.appendChild($title);
    $entryText.appendChild($notes);
    $entryFrame.appendChild($image);
    $entryRow.appendChild($entryFrame);
    $entryRow.appendChild($entryText);
    $item.appendChild($entryRow);
    $entries.appendChild($item);
  }
}

/*
    <div id="viewentries" data-view="entries">
      <ul>
        <li>
          <div class="row">
            <div class="column-half img-frame">
              <img src="images/nelson.png" alt="placeholder">
            </div>
            <div class="column-half">
                <h3>Test Title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dolorem excepturi aut!</p>
            </div>

          </div>
        </li>
      </ul>
    </div> */
