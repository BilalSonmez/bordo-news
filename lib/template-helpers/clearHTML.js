Template.registerHelper("clearHTML", function (html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
});
