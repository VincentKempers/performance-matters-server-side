(function(){
  const searchItem = document.createElement('input');
  const container = document.querySelector('#myUL');

  searchItem.placeholder ="Zoek een poster";

  container.prepend(searchItem);


  searchItem.addEventListener('keyup', function(e) {
      let filter, ul, li, a, i;

      filter = searchItem.value.toLowerCase();
      li = container.getElementsByTagName('li');

      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    });

}())
