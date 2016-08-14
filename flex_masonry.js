flex_masonry = function (flex_ele) {
  var element = document.querySelector(flex_ele);
  element.style.position = "relative";
  var gutter_h = 20;
  //var gutter_v = 20;

  Array.max = function(array){
 	    return Math.max.apply(Math, array);
 	}

  flex_magic = {

  render: function() {
      //var child_e = new Array();

      var kk = document.querySelectorAll(flex_ele)[0].children;

      var child_e = [].slice.call(kk);
      //console.log(array);
      for (var i = 0; i < child_e.length; i++) {
        if (child_e[i].style.display != "none") {
          child_e.slice(i, 1);
        }
      }


      var childInfo = childElementInfo(child_e[0]);
      var width = childInfo['width'];
      //console.log(width);
      var columns = childInfo['num'];
      column_matrix = initialRange(columns);

      for (var i = 0, len = child_e.length; i < len; i++) {
        var height = child_e[i].clientHeight;
        var col = 0;
        var addToCol = minIndex(column_matrix);
        //console.log(addToCol);

        if(addToCol<0){var addToCol = 0;}
        var leftPos = (((addToCol * width) * 10) / 10)+((childInfo['gutter_v'])*(addToCol+1));
        if(leftPos<0){var leftPos = 0;}


        child_e[i].style.position = 'absolute';
        child_e[i].style.top = column_matrix[addToCol] + 'px';
        child_e[i].style.left = leftPos + 'px';
        child_e[i].style.marginRight = childInfo['gutter_v'] + 'px';

        if (height != 0) {
          column_matrix[addToCol] = column_matrix[addToCol]+height+gutter_h;
        }
      }

      for (var i = 0; i < child_e.length; i++) {
        child_e[i].style.overflow = 'hidden';
        child_e[i].style.zoom = '1';
      }

      //element.style.position = "relative";
      element.style.height = Array.max(column_matrix) + 'px';
    }

  };

  window.addEventListener('resize', flex_magic.render);
  element.classList.add('sm-loaded');
  flex_magic.render();

  function childElementInfo(elem) {
 		var width_e = elem.offsetWidth;
 		var parentWidth = elem.parentElement.offsetWidth;

    var num = Math.floor((parentWidth+1) / (width_e)); // Here +(gutter_v/2)
    var gutter_v = (parentWidth-(width_e*num))/(num+1);
    if(gutter_v<=0) { var gutter_v = 0; }
    //console.log(gutter_v);
 		return {
 			'width' : width_e,
 			'num'   : num,
      'gutter_v' : gutter_v
 		};
 	}


  function initialRange(num) {
 		var arry = [];
 		for ( var i=0; i < num; i++ )
 			arry.push(0);
 		return arry;
 	}

  function minIndex(arry) {
 		var minValue = Math.min.apply(Math, arry);
 		return arry.indexOf(minValue,arry);
 	}

}


function imag_init() {
  var element = document.querySelector('.masonry');
  //var $element = $(element);
  var images = document.querySelectorAll('img');
  console.log(images);
  //var $images = $(images);
  var numImages = images.length;
  var imgLoadCount = 0;


  if ( images.length > 0 )
  element.classList.add('sm-images-waiting');
  element.classList.remove('sm-images-loaded');

  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('load', function(i) {
    imgLoadCount++;

    if ( imgLoadCount == numImages ) {
    flex_masonry(".masonry");
    element.classList.remove('sm-images-waiting');
    element.classList.add('sm-images-loaded');
    }
    });
  }

}

imag_init();
