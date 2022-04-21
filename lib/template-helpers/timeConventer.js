Template.registerHelper('timeConventer', function (a) {
  let today = new Date(a);
  const yyyy = today.getFullYear();
  let mm = today.toLocaleString('default', { month: 'long' }); // Months start at 0!
  let dd = today.getDate();
  let ddn = today.toLocaleString('default', { weekday: 'long' });
  let h = today.getHours();
  let m = today.getMinutes();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  today = dd + ' ' + mm + ' ' + ddn + ' ' + yyyy + ' ' + h + ':' + m;
  return today;
});