document.addEventListener('DOMContentLoaded',(function () {
  //Global Variables
  var items = new Array();
  var rej_items = new Array();
  //var elements = document.querySelectorAll('div.portfolio-item');
  var myObject = {
      elements: document.querySelector('.portfolio-content').children,
      filters: document.querySelector('.portfolio-sort').children,
      custom_funtion: flex_masonry()
    };

  // code
  var myObjLiteral = {
    sort: function () {
      for (var i = 0; i < items.length; i++) {
        items[i].style.display = 'block';
      }

      for (var i = 0; i < rej_items.length; i++) {
        rej_items[i].style.display = 'none';
      }
      flex_masonry(); // Custom function -------------------
    },

    showAll: function () {
      for (var i = 0; i < myObject.elements.length; i++) {
        myObject.elements[i].style.display = 'block';
      }
      flex_masonry(); // Custom function -------------------
    },

    activate_element: function (ele) {
      //defineAll();
      for (var i = 0; i < myObject.filters.length; i++) {
          myObject.filters[i].classList.remove("active");
      }
      ele.classList.add('active');
    },

    select_or_reject: function(ele) {
      var ka = ele.getAttribute('data-cat');
      var j = 0, k = 0;
      items = [], rej_items = [];
      for (var i = 0; i < myObject.elements.length; i++) {
        if(myObject.elements[i].getAttribute('data-cat') == ka){
          items[j] = myObject.elements[i];
          j++;
        } else {
          rej_items[k] = myObject.elements[i];
          k++;
        }
      }
    }

  };

  for (var i = 0; i < myObject.filters.length; i++) {
    myObject.filters[i].addEventListener("click", function() {
        //Set 'active' class on selected filter tab
        myObjLiteral.activate_element(this);

        //Set initialization
        if (this.getAttribute('data-cat') == "all") {
            myObjLiteral.showAll(this);
        } else {
            myObjLiteral.select_or_reject(this);
            myObjLiteral.sort(items, rej_items);
        }
    });
  }
})() , false);
