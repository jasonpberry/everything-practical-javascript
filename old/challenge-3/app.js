/* global eq tests */

(function () {
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {
    if (arguments.length > 1) {
      libraryStorage[libraryName] = {
        dependencies: dependencies,
        callback: callback,
        cached: false
      };
    } else {
      var library = libraryStorage[libraryName];
      var loadedDependencies = [];

      if (library.cached === false) {
        var loadedDependencies = library.dependencies.map(function (dependency) {
            return librarySystem(dependency);
        });
        console.log('the loaded depencencies are --> ' , loadedDependencies , ' here its -> ' , libraryName);

        libraryStorage[libraryName].cachedResult = library.callback.apply(this, loadedDependencies);
        libraryStorage[libraryName].cached = true;
      }
      return libraryStorage[libraryName].cachedResult;
    }
  }
  window.librarySystem = librarySystem;
    
    
    tests({
    //   'it should take a library name and a function that returns the library as arguments and store them': function() {
    //     librarySystem('app', [], function() {
    //       return 'app';
    //     });
    //     eq(librarySystem('app'), 'app');
    //   },
    //   'it should handle a library with dependencies when added in order': function() {
    //     librarySystem('dependency', [], function() {
    //       return 'loaded dependency';
    //     });
    //     librarySystem('app', ['dependency'], function(dependency) {
    //       return 'app with ' + dependency;
    //     });
    //     eq(librarySystem('app'), 'app with loaded dependency');
    //   },
    //   'it should handle a library with 0 dependencies': function() {
    //     librarySystem('name', [], function() {
    //       return 'Tiffany';
    //     });
    //     eq(librarySystem('name'), 'Tiffany');
    //   },
    //   'it should handle a library with multiple dependencies': function() {
    //     librarySystem('name', [], function() {
    //       return 'Gordon';
    //     });
    //     librarySystem('company', [], function() {
    //       return 'Watch and Code';
    //     });
    //     librarySystem('workBlurb', ['name', 'company'], function(name, company) {
    //       return name + ' works at ' + company;
    //     });
    //     eq(librarySystem('workBlurb'), 'Gordon works at Watch and Code');
    //   },
      'it should handle adding libraries out of order': function() {

        debugger;
        librarySystem('workBlurb', ['name', 'company'], function(name, company) {
          return name + ' works at ' + company;
        });
        librarySystem('name', [], function() {
          return 'Gordon';
        });
        librarySystem('company', [], function() {
          return 'Watch and Code';
        });
        eq(librarySystem('workBlurb'), 'Gordon works at Watch and Code');
        console.log('library storage is ', libraryStorage);

      },
    //   'it should handle multiple levels of nested dependencies': function() {
    //     librarySystem('dependency', ['app2'], function(app2) {
    //       return 'loaded dependency with ' + app2;
    //     });
    //     librarySystem('app2', ['app3'], function(app3) {
    //       return 'app2 with ' + app3;
    //     });
    //     librarySystem('app3', ['app4', 'app4b'], function(app4, app4b) {
    //       return 'app3 with ' + app4 + ' and ' + app4b;
    //     });
    //     librarySystem('app4', [], function() {
    //       return 'app4';
    //     });
    //     librarySystem('app4b', [], function() {
    //       return 'app4b';
    //     });
    //     librarySystem('app', ['dependency'], function(dependency) {
    //       return 'app with ' + dependency;
    //     });
    //     eq(librarySystem('app'), 'app with loaded dependency with app2 with app3 with app4 and app4b');
    //   },
    //   'it should only run each library\'s callback function once': function() {
    //     var timesCallbackRun = 0;
    //     librarySystem('app1', ['dependency'], function(dependency) {
    //       return 'app with ' + dependency;
    //     });
    //     librarySystem('app2', ['dependency'], function(dependency) {
    //       return 'app2 with ' + dependency;
    //     });
    //     librarySystem('dependency', [], function() {
    //       timesCallbackRun++;
    //       return 'loaded dependency';
    //     });
    //     librarySystem('app1');
    //     librarySystem('app2');
    //     eq(timesCallbackRun, 1);
    //   },
    //   '///////': function() {
    //     eq(true, true);
    //   },
    //   'If only provided a library name it should return it.': function () {
    //     librarySystem('name', [], function () {
    //       return 'Nate';
    //     });
    //     var result = librarySystem('name');
    //     eq('Nate', result);
    //   },
    //   'It should return only run the callback for each library item once.': function () {
    //     var runCount = 0;
    //     librarySystem('testLib', [], function () {
    //       runCount++;
    //     });
    //     librarySystem('testLib');
    //     librarySystem('testLib');
    //     eq(runCount, 1);
    //   },
    //   'It should allow you to load depenencies in order': function () {
    //     librarySystem('name', [], function () {
    //       return 'Gordon';
    //     });
    //     librarySystem('company', [], function () {
    //       return 'Watch and Code';
    //     });
    //     librarySystem('workBlurb', ['name', 'company'], function (name, company) {
    //       return name + ' works at ' + company;
    //     });
    //     var result = librarySystem('workBlurb');
    //     eq(result, 'Gordon works at Watch and Code');
    //   },
    //   'It should allow you to load depenencies out of order.': function () {
    //     librarySystem('workBlurb', ['name', 'company'], function (name, company) {
    //       return name + ' works at ' + company;
    //     });
    //     librarySystem('name', [], function () {
    //       return 'Gordon';
    //     });
    //     librarySystem('company', [], function () {
    //       return 'Watch and Code';
    //     });
    //     var result = librarySystem('workBlurb');
    //     eq(result, 'Gordon works at Watch and Code');
    //   },
    //   '////////': function() {
    //     eq(true, true);
    //   },
    //   'It should be able to load and retrieve a library.': function () {
    //       librarySystem('app', [], function app () {
    //         return 'I am the app';
    //       });
    //       eq(librarySystem('app'), 'I am the app');
    //     },
    //   'It should be able to inject dependencies into the callback.': function () {
    //     librarySystem('router', [], function router () {
    //       return 'I am the router';
    //     });
    //     librarySystem('dependsOnRouter', ['router'], function dependsOnRouter (router) {
    //       return 'I have access to: \'' + router + '\'';
    //     });
    //     eq(librarySystem('dependsOnRouter'), 'I have access to: \'I am the router\'');
    //   },
    //   'It should be able to load libraries out of order.': function () {
    //     librarySystem('workBlurb', ['name', 'company'], function(name, company) {
    //       return name + ' works at ' + company;
    //     });
    //     librarySystem('name', [], function() {
    //       return 'Ivo';
    //     });
    //     librarySystem('company', [], function() {
    //       return 'Ardagh Group';
    //     });
    //     eq(librarySystem('workBlurb'), 'Ivo works at Ardagh Group');
    //   },
      
    //   'It should silently fail and return undefined if one or more dependencies are not met.': function () {
    //     librarySystem('main', ['dependencyOne', 'dependencyTwo'], function (dependencyOne, dependencyTwo) {
    //       return [dependencyOne, dependencyTwo];
    //     });
    //     librarySystem('dependencyTwo', [], function () {
    //       return 'I am the second dependency';
    //     });
    //     eq(librarySystem('main'), undefined);
    //   },
    //   'It should call the libraryName callback once and cache it for later use.': function () {
    //     var timesCallbackHasRun = 0;
    //     librarySystem('myCallbackShouldRunOnce', [], function () {
    //       timesCallbackHasRun++;
    //       return 'I am stored on the cache now';
    //     });
    //     librarySystem('myCallbackShouldRunOnce');
    //     librarySystem('myCallbackShouldRunOnce');
    //     eq(timesCallbackHasRun, 1);
    //   },
    //   'It should also chache dependencies.': function () {
    //     var timesCallbackHasRun = 0;
    //     librarySystem('cat', [], function () {
    //       timesCallbackHasRun++;
    //       return 'meow';
    //     });
    //     librarySystem('petTheCat', ['cat'], function (cat) {
    //       return 'The cat says: ' + cat;
    //     });
    //     librarySystem('feedTheCat', ['cat'], function (cat) {
    //       return 'The cat eats and then says: ' + cat;
    //     });
    //     eq(librarySystem('petTheCat'), 'The cat says: meow');
    //     eq(librarySystem('feedTheCat'), 'The cat eats and then says: meow');
    //     eq(timesCallbackHasRun, 1);
    //   },
    //   '/////////': function() {
    //     eq(true, true);
    //   },
    //   'Should store and retrieve libraries with no dependencies.' : function () {
    //       librarySystem('noDependencies', [], function () {
    //           return 'none';
    //       });
    //       var noDependencies = librarySystem('noDependencies');
    //       eq(noDependencies, 'none');
    //   },
    //   'Should store and retrieve libraries with one dependency.' : function () {
    //       librarySystem('one', [], function () {
    //           return 'one';
    //       });
    //       librarySystem('oneDependency', ['one'], function (one) {
    //           return 'library with ' + one;
    //       });
    //       var oneDependency = librarySystem('oneDependency');
    //       eq(oneDependency, 'library with one');
    //   },
    //   'Should store and retrieve libraries with more than one dependency.' : function () {
    //       librarySystem('two', [], function () {
    //           return 'two';
    //       });
    //       librarySystem('three', [], function () {
    //           return 'three';
    //       });
    //       librarySystem('twoDependencies', ['two', 'three'], function (two, three) {
    //           return 'library with ' + two + ' and ' + three;
    //       });
    //       var twoDependencies = librarySystem('twoDependencies');
    //       eq(twoDependencies, 'library with two and three');
    //   },
    //   'Should not care in which order libraries are loaded.' : function () {
    //       librarySystem('whatsForDinner', ['name', 'food'], function(name, food) {
    //         return name + ' likes ' + food;
    //       });
    //       librarySystem('food', [], function() {
    //         return 'Pizza';
    //       });
    //       librarySystem('name', [], function() {
    //         return 'Trevor';
    //       });
    //       var whatsForDinner = librarySystem('whatsForDinner');
    //       eq(whatsForDinner, 'Trevor likes Pizza');
    //   },
    //   'Should run callback only once for each library.' : function () {
    //       var callbackCounter = 0;
    //       librarySystem('test', [], function () {
    //           callbackCounter++;
    //       });
    //       librarySystem('test');
    //       librarySystem('test');
    //       eq(callbackCounter, 1);
    //   },
    //   'Should throw an error if a library name already exists in libraryStorage.' : function () {
    //       var isError;
    //       librarySystem('redundant', [], function () {
    //           return 'redundant';
    //       });
    //       try {
    //           librarySystem('redundant', [], function () {
    //               return 'redundant';
    //           });
    //       } catch (e) {
    //           isError = (e instanceof Error);
    //       }
    //       eq(isError, true);
    //   },
    //   'Should throw an error if a library is missing a dependency.' : function () {
    //       var isError;
    //       librarySystem('missingDependency', ['missing'], function (missing) {
    //           return missing;
    //       });
    //       try {
    //           librarySystem('missingDependency');
    //       } catch (e) {
    //           isError = (e instanceof Error);
    //       }
    //       eq(isError, true);
    //   },
    //   '//////////': function() {
    //     eq(true, true);
    //   },
    //   'should accept a library module': function() {
    //     librarySystem('app', [] , function() {
    //       return 'this is the app module';
    //     });
    //     eq(librarySystem('app') === 'this is the app module', true);
    //   },
    //   'library should accept a dependency': function() {
    //     librarySystem('router', [], function() {
    //       return 'hello router';
    //     })
    //     librarySystem('app', ['router'], function(router) {
    //       return {
    //         router: router
    //       }
    //     });
    //     eq(librarySystem('app').router === 'hello router', true);
    //   },
    //   'library should accept multiple dependencies': function() {
    //     librarySystem('name', [], function() {;
    //       return 'Gordon';
    //     });
    //     librarySystem('company', [], function() {
    //       return 'watchandcode';
    //     });
    //     librarySystem('workBlurb', ['name', 'company'], function(name, company) {
    //       return name + ' works at ' + company;
    //     });
    //     eq(librarySystem('workBlurb') === 'Gordon works at watchandcode', true);
    //   },
    //   'library should accept dependencies out of order': function() {
    //     librarySystem('workBlurb', ['name', 'company'], function(name, company) {
    //       return name + ' works at ' + company;
    //     });
    //     librarySystem('name', [], function() {
    //       return 'Gordon';
    //     });
    //     librarySystem('company', [], function() {
    //       return 'watchandcode';
    //     });
    //     eq(librarySystem('workBlurb') === 'Gordon works at watchandcode', true);
    //   }
    });

    var app = librarySystem('workBlurb')
    console.log(app);
    
})();

