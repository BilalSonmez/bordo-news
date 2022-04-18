Migrations.add({
  version: 4,
  name: 'Creating Columns',
  up: function () {
    const files = JSON.parse(Assets.getText('columnsPictures.json'));
    files.forEach(file => {
      Files.insert(file);
    });
    const columns = JSON.parse(Assets.getText('columnsDatas.json'));
    columns.forEach(column => {
      Columns.insert(column);
    });
  }
});