function runWithDebugger(ourFunction, args) {
    debugger;
    if (args.length) {
        ourFunction.apply(null, args);
    } else {
        ourFunction();
    }
}
function sayFullName(first, last) {
    console.log(first + ' ' + last);
}
runWithDebugger(sayFullName, ['gordon', 'zhu']); // 'gordon zhu'