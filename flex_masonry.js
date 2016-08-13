window.bind("load", flex_masonry());
function flex_masonry() {
  var element = document.querySelector('.masonry');
  var gutter_h = 0;

  Array.max = function(array){
 	    return Math.max.apply(Math, array);
 	}

  flex_magic = {

  render: function() {
        var child_e = new Array();

        var kk = document.getElementsByClassName("masonry")[0].children;

        //Converting HTMLCollection to array
        var child_ee = [].slice.call(kk);

        //Remove elements from arry which are display:hidden;
        var k = 0;
        for (var i = 0; i < child_ee.length; i++) {
          if (child_ee[i].style.display != "none") {
            //child_e.splice(i, 1);
            child_e[k] = child_ee[i];
            k++;
          }
        }
        //console.log(child_e);
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

        column_matrix[addToCol] = column_matrix[addToCol]+height+gutter_h;
      }

      for (var i = 0; i < child_e.length; i++) {
        child_e[i].style.overflow = 'hidden';
        //child_e[i].style.zoom = '1';
      }

      //element.style.position = "relative";
      element.style.height = Array.max(column_matrix) + 'px';
    }

  };

  var myEfficientFn = debounce(function() {
  	// All the taxing stuff you do
    flex_magic.render();
    console.log('kavan');
  }, 700);

  window.addEventListener('resize', myEfficientFn);

  //window.addEventListener('resize', flex_magic.render);
  //element.classList.add('sm-loaded');
  flex_magic.render();

  function childElementInfo(elem) {
 		var width_e = elem.offsetWidth;
 		var parentWidth = elem.parentElement.offsetWidth;

    var nums_cols = (parentWidth+1) / (width_e);
    var num = Math.round(nums_cols); // Here +(gutter_v/2)
    //var gutter_v = 20;
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

  function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

}
