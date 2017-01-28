(function() {
    var libraryStorage = {};

    function librarySystem(libraryName, dependencies, callback) {
        if (arguments.length > 1) {

            // libraryStorage[libraryName] = callback();
  
            if(dependencies.length > 0) {

               var librariesToAdd = [];
               // Loop over dependencies. 
               for(var i = 0; i < dependencies.length; i++) {
                //   libraryToAdd = dependencies[i];
                //   loadedLibrary = librarySystem(dependencies[i]);
                  librariesToAdd[i] = librarySystem(dependencies[i]);
               }
               libraryStorage[libraryName] = callback.apply(null, librariesToAdd);

            } else {
               libraryStorage[libraryName] = callback();
            }
        } else {
            return libraryStorage[libraryName];
        } 
    }
    window.librarySystem = librarySystem;
    
    
    librarySystem('name', [], function() {
      return 'Gordon';
    });
    
    librarySystem('company', [], function() {
      return 'Watch and Code';
    });
    
    librarySystem('workBlurb', ['name', 'company'], function(name, company) {
      return name + ' works at ' + company;
    });
    
    var workBlurb = librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
    
    console.log(workBlurb);
    
    
    librarySystem('dependency', [], function() {
      return 'loaded dependency';
    });
    
    librarySystem('another', [], function() {
      return 'another dependency';
    });
    
    librarySystem('app', ['dependency', 'another'], function(dependency, another) {
      return 'app with ' + dependency + ' + ' + another;
    });
    
    var app = librarySystem('app'); // 'app with loaded dependency'
    
    console.log(app);

})();

