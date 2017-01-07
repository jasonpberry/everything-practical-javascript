var person = {
    sayPerson: function() {
        console.log('THIS IS ' , this);
        console.log('say person -->', this.name);
    }
}

var jason = Object.create(person);

console.log('empty object w/ a sayPerson() function on the proto');
console.log(jason);

console.log('lets try to call sayPerson() on the proto and spit out a value');

jason.name = "my name is JASON";
jason.sayPerson();

// function Person(name,age) {
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.writePerson = function() {
//     console.log('THIS IS --> ' , this);
//     console.log('hey ' , this.name,  ' Your age is ' , this.age);
// };

// console.log('PERSON CONSTRUCTOR IS --> ' , Person);

// var jason = new Person('jason', 38);

// jason.writePerson();




// (function() {
    
// 	var libraryStorage = {};

// 	function librarySystem (libraryName, dependencies, callback) {
// 		if ( arguments.length > 1 ) {
// 			return storeLibrary(libraryName, dependencies, callback);
// 		} else {
//  			return loadLibrary(libraryName);
// 		}
// 	}
	
//     window['librarySystem'] = librarySystem;

//     function storeLibrary(libraryName, dependencies, callback) {
//         console.log('store --> ', libraryName);
//         libraryStorage[libraryName] = {
//             dependencies: dependencies,
//             callback: callback
//         }
//     };

// 	function loadLibrary(libraryName) {
// 	    console.log('load --> ', libraryName);



// 		var dependencies = libraryStorage[libraryName].dependencies;
// 		if ( dependenciesAreLoaded(dependencies) ) {
// 			var cache = libraryStorage[libraryName].callback.apply(null, loadDependencies(dependencies));
// 			libraryStorage[libraryName].cache = cache;
// 			return cache;
// 		}
		
// 		/* helper functions */
// 		function dependenciesAreLoaded(dependencies) {
// 			for ( var i = 0 ; i < dependencies.length ; i++ ) {
// 				var libraryName = dependencies[i];
// 				if ( !(libraryStorage[libraryName]) ) {
// 					return false;
// 				}
// 			}
// 			return true;
// 		}

        
//         function loadDependencies(dependencies) {
            
//             var loadedDependencies = [];
            
//             // console.log('load dependencies ->' , dependencies)

//             loadedDependencies = dependencies.map(function(library) {
//                 console.log('load depend --> ' , library);
// 				var dependencies = libraryStorage[libraryName].dependencies;
// 				var callback = libraryStorage[libraryName].callback;
// 				return loadLibrary(libraryName, dependencies, callback);
//             });
//         }
// 	}


//     // Libraries WITH CALLBACKS!!! NOTHING WILL HAPPEN WITHOUT A CALLBACK BEING CALLED!!!

//     librarySystem('workBlurb', ['name','company'], function(name, company) {
//         return name, ' 222works at ' , company;
//     });

//     librarySystem('name', [], function() {
//         return 'Gordon';
//     });
    
//     librarySystem('company', [], function() {
//         return 'Watch and Code';
//     });

//     var app = librarySystem('workBlurb');
//     console.log(app);
    
    
// /* global tests  */
// /* global eq  */


// // tests({
// // 	'It should be able to load and retrieve a library2.': function () {
// // 		librarySystem('app', [], function app () {
// // 			return 'I am the app';
// // 		});
// // 		eq(librarySystem('app'), 'I am the app');
// // 	},
// // 	'It should be able to inject dependencies into the callback.': function () {
// // 		librarySystem('router', [], function router () {
// // 			return 'I am the router';
// // 		});

// // 		librarySystem('dependsOnRouter', ['router'], function dependsOnRouter (router) {
// // 			return 'I have access to: \'' + router + '\'';
// // 		});
// // 		eq(librarySystem('dependsOnRouter'), 'I have access to: \'I am the router\'');
// // 	},
// // 	'It should be able to load libraries out of order.': function () {
// // 		librarySystem('workBlurb', ['name', 'company'], function(name, company) {
// // 		  return name + ' works at ' + company;
// // 		});

// // 		librarySystem('name', [], function() {
// // 		  return 'Ivo';
// // 		});

// // 		librarySystem('company', [], function() {
// // 		  return 'Ardagh Group';
// // 		});
// // 		eq(librarySystem('workBlurb'), 'Ivo works at Ardagh Group');
// // 	},
// // 	'It should silently fail and return undefined if one or more dependencies are not met.': function () {
// // 		librarySystem('main', ['dependencyOne', 'dependencyTwo'], function (dependencyOne, dependencyTwo) {
// // 			return [dependencyOne, dependencyTwo];
// // 		});

// // 		librarySystem('dependencyTwo', [], function () {
// // 			return 'I am the second dependency';
// // 		});
// // 		eq(librarySystem('main'), undefined);
// // 	},
// // 	'It should call the libraryName callback once and cache it for later use.': function () {
// // 		var timesCallbackHasRun = 0;
// // 		librarySystem('myCallbackShouldRunOnce', [], function () {
// // 			timesCallbackHasRun++;
// // 			return 'I am stored on the cache now';
// // 		});

// // 		librarySystem('myCallbackShouldRunOnce');
// // 		librarySystem('myCallbackShouldRunOnce');

// // 		eq(timesCallbackHasRun, 1);
// // 	},
// // 	'It should also chache dependencies.': function () {
// // 		var timesCallbackHasRun = 0;
// // 		librarySystem('cat', [], function () {
// // 			timesCallbackHasRun++;
// // 			return 'meow';
// // 		});

// // 		librarySystem('petTheCat', ['cat'], function (cat) {
// // 			return 'The cat says: ' + cat;
// // 		});

// // 		librarySystem('feedTheCat', ['cat'], function (cat) {
// // 			return 'The cat eats and then says: ' + cat;
// // 		});

// // 		eq(librarySystem('petTheCat'), 'The cat says: meow');
// // 		eq(librarySystem('feedTheCat'), 'The cat eats and then says: meow');
// // 		eq(timesCallbackHasRun, 1);

// // 	}
// // });




// })();