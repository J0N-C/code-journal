/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-data', dataJSON);
});

var previousEntries = localStorage.getItem('journal-data');
if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}
