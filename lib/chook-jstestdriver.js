/*
 * chook-jstestdriver
 * https://github.com/markdalgleish/chook-jstestdriver
 *
 * Copyright (c) 2012 Mark Dalgleish
 * Licensed under the MIT license.
 */

var path = require('path'),
	fs = require('fs'),
	globsync = require('glob-whatev'),

	// Hack to pass JSHint, these vars are global within the scope of Phantom's page.evaluate
	document,
	window;

exports.runner = function() {
	window.chook.suites = [];
	
	var t0 = Date.now();
	
	window.TestCase = function(suite_name, proto) {
		var s = function(){ };
		
		if (proto) {
			s.prototype = proto;
		}
		
		window.chook.suites.push({
			Suite: s,
			name: suite_name
		});
		
		return s;
	};

	window.chook.run = function() {
		window.chook.suites.forEach(function(s) {
			var suite = new s.Suite(),
				result_suite = {
					name: s.name,
					duration: undefined,

					total: 0,
					pass: 0,
					fail: 0,
					error: 0,

					tests: []
				},
				suite_start_time = Date.now(),
				test_start_time,
				result_test;
			
			for (var test_name in suite) {
				if (/^test/.test(test_name)) {
					test_start_time = Date.now();
					
					result_test = {
						name: test_name
					};
					
					try {
						result_suite.total++;
						window.chook.results.total++;
						
						if ("setUp" in suite) {
							suite["setUp"]();
						}

						suite[test_name]();
						
						if ("tearDown" in suite) {
							suite["tearDown"]();
						}
						
						result_suite.pass++;
						window.chook.results.pass++;
						result_test.status = 'pass';
						result_test.duration = Date.now() - test_start_time;

						console.log('chook.pass:' + JSON.stringify(result_test));
					} catch(e) {
						if(e.name === "AssertError") {
							result_suite.fail++;
							window.chook.results.fail++;
							result_test.status = 'fail';
						} else {
							result_suite.error++;
							window.chook.results.error++;
							result_test.status = 'error';
						}

						result_test.error = e;
						result_test.duration = Date.now() - test_start_time;
						
						console.log('chook.fail:' + JSON.stringify(result_test));
					}
						
					result_suite.tests.push(result_test);
				}
			}

			result_suite.duration = Date.now() - suite_start_time;

			window.chook.results.suites.push(result_suite);
		});

		window.chook.results.duration = Date.now() - t0;
		
		console.log("chook.complete:" + JSON.stringify(window.chook.results));
	};
};

exports.configReader = function(configPath) {
	var loadScriptsFromFile = function(confFile, section) {
		var scripts = [],
			currentSection = null,
			dirname = path.dirname(confFile),
			data = '' + fs.readFileSync(confFile);
		
		data.split(/\n/).forEach(function(line) {
			if (/^load/.test(line)) {
				currentSection = "load";
			} else if (/^test/.test(line)) {
				currentSection = "test";
			} else if (currentSection === section && /^\s+-\s/.test(line)) {
				globsync.glob(path.join(dirname, line.match( /^\s+-\s(\S+)/ )[1])).forEach(function (filepath) {
					scripts.push(filepath);
				});
			}
		});
		return scripts;
	};

	var testScripts = loadScriptsFromFile(configPath, 'test'),
		baseScripts = loadScriptsFromFile(configPath, 'load'),
		allScripts = baseScripts.concat(testScripts);
	
	return allScripts;
};