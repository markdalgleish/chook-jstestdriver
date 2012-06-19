# chook-jstestdriver

JsTestDriver adapter for Chook, the headless, framework-agnostic unit test runner for Node.js

## Getting Started
Install Chook with: `npm install https://github.com/markdalgleish/chook/tarball/master`

Install the JsTestDriver adapter with `npm install https://github.com/markdalgleish/chook-jstestdriver/tarball/master`

```javascript
var chook = require('chook'),
	chook_jstestdriver = require('chook-jstestdriver');

chook.configure(function(){
	chook.use( chook_jstestdriver({configPath: '/path/to/JsTestDriver.conf'}) );
});

chook.run().on('complete', function(err, results) {
	console.log(results);
});
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Mark Dalgleish  
Licensed under the MIT license.
