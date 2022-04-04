Template.registerHelper('index_count', function(a,b) {
  return (a+1)+((b.currentPage - 1) * b.pageItems);
});