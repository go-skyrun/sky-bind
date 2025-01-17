(function () {
  var elements = document.querySelectorAll('[x-bind]'), scope = {};

  elements.forEach(function (element) {
    //execute scope setter

    console.log(element.type);

    if (element.type === 'text' || element.type === 'textarea') {
      var propToBind = element.getAttribute('x-bind');
      addScopeProp(propToBind);
      element.onkeyup = function () {
        scope[propToBind] = element.value;
      }
    } else if (element.type === 'checkbox') {
      var origProp = element.getAttribute('x-bind');
      var propToBind = origProp;
      var propValue = "";
      if (propToBind.includes(".")) {
        let pieces = propToBind.split(".");
        propToBind = pieces[0];
        propValue = pieces[1];
      }

      addScopeProp(propToBind, propValue);
      element.onchange = function () {
        if (origProp.includes(".")) {
          let tempArray = [];
          if (scope[propToBind]) tempArray = scope[propToBind];
          if (element.checked) {
            tempArray.push(propValue);
          } else {
            let index = scope[propToBind].indexOf(propValue);
            tempArray.splice(index, 1);
          }

          scope[propToBind] = tempArray;
        } else {
          scope[propToBind] = element.checked;
        }
      }
    } else if (element.type === 'radio') {
      var propToBind = element.getAttribute('x-bind');
      addScopeProp(propToBind);
      element.onchange = function () {
        scope[propToBind] = element.value;
      }
    } else if (element.type === 'select-one') {
      var propToBind = element.getAttribute('x-bind');
      addScopeProp(propToBind);
      element.onchange = function () {
        scope[propToBind] = element.value;
      }
    }

    //bind prop to elements
    function addScopeProp(prop, val) {
      //add property if needed
      if (!scope.hasOwnProperty(prop)) {
        //value to populate with newvalue
        var value;
        Object.defineProperty(scope, prop, {
          set: function (newValue) {
            value = newValue;
            elements.forEach(function (element) {
              //change value to binded elements
              if (element.getAttribute('x-bind') === prop || element.getAttribute('x-bind').startsWith(prop + ".")) {
                if (element.type && (element.type === 'text' ||
                  element.type === 'textarea' || element.type === 'select-one')) {
                  element.value = newValue;
                }
                else if (element.type && element.type === "checkbox") {
                  var bindName = element.getAttribute('x-bind');
                  var propValue = "";
                  if (bindName.includes(".")) {
                    let pieces = bindName.split(".");
                    if (newValue.includes(pieces[1])) {
                      element.checked = true;
                    }
                    else {
                      element.checked = false;
                    }
                  }
                  else {
                    element.checked = newValue;
                  }
                }
                else if (element.type && element.type === "radio") {
                  if (element.value === newValue)
                    element.checked = newValue;
                }                
                else if (!element.type) {
                  element.innerHTML = newValue;
                }
              }
            });
          },
          get: function () {
            return value;
          },
          enumerable: true
        });
      }
    }
  });

  log = function () {
    console.log(scope);
    console.log(JSON.stringify(scope));
    // Object.keys(scope).forEach(function (key) {
    //   console.log(key + ': ' + scope[key]);
    // });
  }

  setScope = function (newScope) {
    for (const [key, value] of Object.entries(newScope)) {
      if (value)
        scope[key] = value;
    }
  }

  getScope = function () {
    return scope;
  }
})();
