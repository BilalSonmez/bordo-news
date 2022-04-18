Template.registerHelper('strtohtml', function (a, b) {
  var htmlObject = document.createElement('div');
  htmlObject.innerHTML = a;
  return document.getElementById(b).innerHTML=htmlObject.innerHTML;
});