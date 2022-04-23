Migrations.add({
  version: 3,
  name: 'Creating Categories + News + New Pictures',
  up: function () {
    const categories = JSON.parse(Assets.getText('categories.json'));
    const files = JSON.parse(Assets.getText('newsPictures.json'));
    const news = JSON.parse(Assets.getText('newsDatas.json'));

    categories.forEach((category) => {
      Categories.insert(category);
    });

    files.forEach((file) => {
      Files.insert(file);
    });

    news.forEach((data) => {
      News.insert(data);
    });
  },
});
