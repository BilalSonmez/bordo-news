Migrations.add({
  version: 3,
  name: 'Creating files and news',
  up: function () {
    const files = JSON.parse(Assets.getText('files.json'));
    files.forEach(file => {
      Files.insert(file);
    });
    const news = JSON.parse(Assets.getText('news.json'));
    news.forEach(data => {
      News.insert(data);
    });
  }
});