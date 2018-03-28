(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var filterItems = function(){
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

};

filterItems();

module.exports = filterItems;

},{}],2:[function(require,module,exports){
var filter = require('./filter.js');

},{"./filter.js":1}]},{},[2]);
