Migrations.add({
  version: 3,
  name: 'Creating Categories + News + New Pictures',
  up: function () {
    const categories = JSON.parse(Assets.getText('categories.json'));
    categories.forEach(category => {
      Categories.insert(category);
    });
    const files = JSON.parse(Assets.getText('newsPictures.json'));
    files.forEach(file => {
      Files.insert(file);
    });
    const news = JSON.parse(Assets.getText('newsDatas.json'));
    news.forEach(data => {
      News.insert(data);
    });
  }
});