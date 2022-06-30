function foo(...rest, param) { } // SyntaxError: Rest parameter must be last formal parameter

foo(1, 2, 3, 4, 5);

function bar(...rest1, ...rest2) { } // SyntaxError: Rest parameter must be last formal parameter

bar(1, 2, 3, 4, 5);