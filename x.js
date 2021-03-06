/*!
 * xJS
 * Version 0.3
 * Copyright (c) 2013 TD Development
 */
;(function(window) {
	
	"use strict";

	var	_instances = {},
		
		_debug = false,
		
		document = window.document,
		
		location = window.location,
				
		xJS = function(label) {
			return new xJS.prototype.init(label);
		};

	
	xJS.fn = xJS.prototype = {
		
		constructor : xJS,
				
		init : (function(label) {
			
			if (xJS.defined(_instances[label])) {
				return _instances[label];
			}
			
			this.label = label;
			this.fireOnceEvents = {};
			this.fireAlwaysEvents = {};
			
			if (label) {
				_instances[label] = this;
			}
		
			return this;
		})
		
	};
	
	xJS.fn.init.prototype = xJS.fn;
	
	/**
	 * Core functions
	 * 
	 */
	
	xJS.defined = (function(subject, asObject, returnObj) {
	
		if (typeof subject === "undefined") {
			return false;
		}
		
		else {
			asObject = (asObject !== false) ? true : false;
			
			if (asObject && typeof subject === "string" && subject.length > 0) {
				var subjectArr = subject.split(".");
							
				if (subjectArr[0] === "window") {
					subjectArr.shift();
				}
				
				subject = window;
				
				for (var i in subjectArr) {
					if (subjectArr.hasOwnProperty(i)) {
						subject = subject[subjectArr[i]];
						if (typeof subject === "undefined") {
							return false;
						}
					}
				}
				
				if (returnObj === true) {
					returnObj = subject;
				} else {
					returnObj = true;
				}
				
				subject = undefined;
				subjectArr = undefined;
				
				return returnObj;
			}
			
			else {
				if (returnObj === true) {
					returnObj = undefined;
					return subject;
				} else {
					returnObj = undefined;
					return (typeof subject !== "undefined");	
				}
			}
		}
	});
	
	xJS.empty = (function(subject, asObject) {
		if (xJS.defined(subject, asObject)) {
			switch (typeof subject) {
				case "string" :
				case "array" :
					return (subject.length === 0);
				
				default :
					return (xJS.defined(subject.push)) ? (subject.length === 0) : false;
			}
		}
		
		return true;
	});
	
	xJS.isArray = (function(subject) {
		return (subject) ? (xJS.defined(subject.push)) : false;
	});
	
	xJS.isObject = (function(subject) {
		return (subject) ? (typeof subject === "object") : false;
	});
	
	xJS.isBoolean = (function(subject) {
		return (typeof subject === "boolean");
	});
	
	xJS.isFunction = (function(subject) {
		return (subject) ? (xJS.defined(subject.apply)) : false;
	});
	
	xJS.isString = (function(subject) {
		return (subject) ? (typeof subject === "string") : false;
	});
	
	xJS.isNumber = (function(subject) {
		return !isNaN(parseInt(subject,10));
	});
	
	xJS.redirect = (function(url) {
		if (xJS.empty(url) && xJS.isString(url)) {
			location.href = url;
			return true;
		}
		
		return false;
	});
	
	xJS.reload = (function() {
		xJS.redirect(location.href);
	});
	
	xJS.exec = (function() {		
		var func = arguments[0];
		
		if (xJS.empty(func)) {
			func = undefined;
			return false;
		}
		
		var args = Array.prototype.slice.call(arguments, 1, arguments.length);
		
		return xJS.execArr(func, args);
	});
	
	xJS.execArr = (function(func, args) {
		if (xJS.empty(args)) {
			args = [];
		}
		
		func = xJS.defined(func, true, true);
		
		if (xJS.isFunction(func)) {
			if (_debug) {
				xJS.info("xJS.execArr", {"function":func, "arguments":args});
			}
			
			return func.apply(window, args);
		} else {
			xJS.error("Not a valid function", {"function":func, "arguments":args});
		}
	});
    
    xJS.now = (function(milliseconds) {
		var ret = String((new Date()).getTime());
		
		if (milliseconds === false) {
			ret = ret.slice(0, ret.length-3);
		}

		milliseconds = undefined;

		return parseInt(ret,10);
	});
		
	xJS.debugmode = (function() {
		return _debug;
	});
	
	xJS.enableDebugging = (function() {
		_debug = true;
		xJS.info("debugging enabled");
	});
	
	xJS.disableDebugging = (function() {
		_debug = false;
		xJS.info("debugging disabled");
	});
		
	xJS.fn.destroy = (function() {
		if (xJS.defined(_instances[this.label])) {
			delete _instances[this.label];
		}
		
		delete this.label;
		delete this.fireOnceEvents;
		delete this.fireAlwaysEvents;
		
		return this;
	});
	
	/**
	 * Events
	 * 
	 */
	
	var fireAlwaysEvents = {},
		fireOnceEvents = {},
		_frozen = false,
		_frozenTriggers = [];
	
	xJS.fn.on = (function(event, func) {
		
		if (_debug) {
			xJS.info("xJS.fn.on", {"event":event,"function":func});
		}
		
		if (!xJS.defined(this.fireAlwaysEvents[event])) {
			this.fireAlwaysEvents[event] = [];
		}
		
		this.fireAlwaysEvents[event].push(func);
		
		return this;
	});
	
	xJS.fn.once = (function(event, func) {
		
		if (_debug) {
			xJS.info("xJS.fn.once", {"event":event,"function":func});
		}
		
		if (!xJS.defined(this.fireOnceEvents[event])) {
			this.fireOnceEvents[event] = [];
		}
		
		this.fireOnceEvents[event].push(func);
		
		return this;
	});
	
	xJS.fn.off = (function(event) {
		
		if (_debug) {
			xJS.info("xJS.fn.off", {"event":event});
		}
		
		if (xJS.defined(this.fireAlwaysEvents[event])) {
			delete this.fireAlwaysEvents[event];
		}
		
		if (xJS.defined(this.fireOnceEvents[event])) {
			delete this.fireOnceEvents[event];
		}
		
		return this;
	});
	
	xJS.fn.trigger = (function(event, args) {
		
		if (!_frozen || (_frozenTriggers.length > 0 &&_frozenTriggers.indexOf(event) < 0) ) {
			
			xJS.trigger(event, args);
	
			if (_debug) {
				xJS.info("xJS.fn.trigger", {"event":event,"arguments":args});
			}
			
			var events, i;
			
			if (xJS.defined(this.fireAlwaysEvents[event])) {
				events = this.fireAlwaysEvents[event];
				for (i in events) {
					if (events.hasOwnProperty(i)) {
						xJS.execArr(events[i], args);
					}
				}
			}
			
			if (xJS.defined(this.fireOnceEvents[event])) {
				events = this.fireOnceEvents[event];
				for (i in events) {
					if (events.hasOwnProperty(i)) {
						xJS.execArr(events[i], args);
					}
				}
				delete this.fireOnceEvents[event];
			}
			
			events = undefined;
			i = undefined;
		}
		
		return this;
	});
	
	xJS.on = (function(event, func) {
		
		if (_debug) {
			xJS.info("xJS.on", {"event":event,"function":func});
		}
		
		if (!xJS.defined(fireAlwaysEvents[event])) {
			fireAlwaysEvents[event] = [];
		}
		
		fireAlwaysEvents[event].push(func);

	});
	
	xJS.once = (function(event, func) {
		
		if (_debug) {
			xJS.info("xJS.once", {"event":event,"function":func});
		}
		
		if (!xJS.defined(fireOnceEvents[event])) {
			fireOnceEvents[event] = [];
		}
		
		fireOnceEvents[event].push(func);

	});
	
	xJS.off = (function(event) {
		
		if (_debug) {
			xJS.info("xJS.off", {"event":event});
		}
		
		if (xJS.defined(fireAlwaysEvents[event])) {
			delete fireAlwaysEvents[event];
		}
		
		if (xJS.defined(fireOnceEvents[event])) {
			delete fireOnceEvents[event];
		}
		
	});
	
	xJS.trigger = (function(event, args) {
				
		if (!_frozen || (_frozenTriggers.length > 0 &&_frozenTriggers.indexOf(event) < 0) ) {
			
			if (_debug === true) {
				xJS.info("xJS.trigger", {"event":event,"arguments":args});
			}
			
			var events, i;
					
			if (xJS.defined(fireAlwaysEvents[event])) {
				events = fireAlwaysEvents[event];
				for (i in events) {
					if (events.hasOwnProperty(i)) {
						xJS.execArr(events[i], args);
					}
				} 
			}
			
			if (xJS.defined(fireOnceEvents[event])) {
				events = fireOnceEvents[event];
				for (i in events) {
					if (events.hasOwnProperty(i)) {
						xJS.execArr(events[i], args);
					}
				} 
				delete fireOnceEvents[event];
			}
			
			i = undefined;
			events = undefined;
		}
	});
	
	xJS.freeze = (function(value) {
		if (xJS.isBoolean(value)) {
			_frozen = value;
			_frozenTriggers = [];
			return _frozen;
		}
		
		if (xJS.isArray(value)) {
			_frozen = true;
			_frozenTriggers = value;
			return true;
		}
		
	});
	
	/**
	 * jQuery integration
	 * 
	 */
	
	if (xJS.defined(window.jQuery)) {
		
		window.jQuery(document).on("ready", (function() {
			xJS.trigger("document.ready");
		}));
		
		window.jQuery(window).on("load", (function() {
			xJS.trigger("window.load");
		}));
		
		window.jQuery(window).on("unload", (function() {
			xJS.trigger("window.unload");
		}));
		
		window.jQuery(window).on("resize", (function() {
			xJS.trigger("window.resize");
		}));
		
		window.jQuery(window).on("scroll", (function() {
			xJS.trigger("window.scroll");
		}));
		
		window.jQuery(document).on("submit", "form", (function(event) {
			if (!xJS.empty(this.id)) {
				xJS("#" + this.id).trigger("form.submit", [event, this]);
			} else {
				xJS.trigger("form.submit", [event, this]);
			}
		}));
	}
	
	/**
	 * Console functions
	 * 
	 */
	
	xJS.log = (function() {
		if (xJS.defined("console.log.apply")) {
			window.console.log.apply(window.console, arguments);
		}
	});
	
	xJS.info = (function() {
		if (xJS.defined("console.info.apply")) {
			window.console.info.apply(window.console, arguments);
		}
	});
	
	xJS.error = (function() {
		if (xJS.defined("console.error.apply")) {
			window.console.error.apply(window.console, arguments);
		}
	});
	
	xJS.warn = (function() {
		if (xJS.defined("console.warn.apply")) {
			window.console.warn.apply(window.console, arguments);
		}
	});

	xJS.debug = (function() {
		if (xJS.defined("console.debug.apply")) {
			window.console.debug.apply(window.console, arguments);
		}
	});
	
	xJS.dir = (function() {
		if (xJS.defined("console.dir.apply")) {
			window.console.dir.apply(window.console, arguments);
		}
	});
	
	/**
	 * i18n
	 * 
	 */
		
	xJS.i18n = {
		_current : (xJS.defined("navigator.language")) ? navigator.language : "en-US",
		_translations : {},
		
		get : (function(string, language) {
			
			if (_debug) {
				xJS.info("xJS.i18n.get", {"string":string,"language":language});
			}
			
			language = xJS.i18n._check(language);
			return xJS.i18n._translations[language][string];
		}),
		
		set : (function(string, translation, language) {
			
			if (_debug) {
				xJS.info("xJS.i18n.set", {"string":string,"translation":translation,"language":language});
			}
			
			language = xJS.i18n._check(language);
			xJS.i18n._translations[language][string] = translation;
		}),
		
		lang : (function(language) {

			if (_debug) {
				xJS.info("xJS.i18n.lang", {"language":language});
			}
			
			if (xJS.empty(language, false)) {
				return xJS.i18n._current;
			}
			
			language = xJS.i18n._check(language);
			xJS.i18n._current = language;
		}),
		
		_check : (function(language) {
			
			if (_debug) {
				xJS.JS.info("xJS.i18n.check", {"language":language});
			}
			
			if (xJS.empty(language, false)) {
				language = xJS.i18n._current;
			}
			
			if (xJS.empty(xJS.i18n._translations[language])) {
				xJS.i18n._translations[language] = {};
			}
			
			return language;
		})
	};

	xJS.__ = (function(string, language) {
		
		if (_debug) {
			xJS.info("xJS.__", {"string":string,"language":language});
		}
		
		return xJS.i18n.get(string, language);
	});
	
	window.xJS = window.x = xJS;

})(window);