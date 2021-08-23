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
