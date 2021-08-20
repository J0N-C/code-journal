/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const $form = document.querySelector('#code-form');

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
}

$form.addEventListener('submit', submitForm);
