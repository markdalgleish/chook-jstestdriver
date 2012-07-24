# chook-jstestdriver

JsTestDriver adapter for Chook, the headless, framework-agnostic unit test runner for Node.js

## Getting Started
Install Chook with: `npm install chook`

Install the JsTestDriver adapter with `npm install chook-jstestdriver`

```javascript
var chook = require('chook'),
	chook_jstestdriver = require('chook-jstestdriver');

chook.configure(function(){
	chook.use( chook_jstestdriver({configPath: '/path/to/JsTestDriver.conf'}) );
});

chook.run().on('complete', function(results) {
	console.log(results);
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Mark Dalgleish  
Licensed under the MIT license.
