Template.registerHelper('eq1', function (a, b, c, d) {
  if(a==b){
    return true;
  }else if(a==c){
    return true;
  }else if(a==d){
    return true;
  }else{
    return false;
  }
});
