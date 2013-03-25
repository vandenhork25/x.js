x.js
====

JavaScript library for custom events and i18n.


### Core Functions
<b>xJS.defined (subject, asObject, returnObj)</b><br>

 
<b>xJS.empty (subject, asObject)</b><br>

<b>xJS.isArray(subject)</b><br>
Checks if given subject is an array.

<b>xJS.isObject(subject)</b><br>
Checks if given subject is an object.

<b>xJS.isBoolean(subject)</b><br>
Checks if given subject is a boolean.

<b>xJS.isFunction(subject)</b><br>
Checks if given subject is a function.

<b>xJS.isString(subject)</b><br>
Checks if given subject is a string.

<b>xJS.isNumber(subject)</b><br>
Checks if given subject is a number.

<b>xJS.redirect</b><br>

<b>xJS.reload</b><br>

<b>xJS.exec</b><br>

<b>xJS.execArr</b><br>

<b>xJS.now(milliseconds)</b><br>
Returns unix timestamp with or without milliseconds.

<b>xJS.version()</b><br>
Returns version of xJS

<b>xJS.enableDebugging()</b><br>
Enables debug output in console

<b>xJS.disableDebugging()</b><br>
Disables debug output in console


### Core Object Functions
<b>xJS.fn.destroy</b><br>

### Debugging Functions
<b>xJS.log()</b><br>
Calls <i>console.log</i> if available

<b>xJS.info()</b><br>
Calls <i>console.info</i> if available

<b>xJS.error()</b><br>
Calls <i>console.error</i> if available

<b>xJS.warn()</b><br>
Calls <i>console.warn</i> if available

<b>xJS.debug()</b><br>
Calls <i>console.debug</i> if available

<b>xJS.dir()</b><br>
Calls <i>console.dir</i> if available


### Event Functions
<b>xJS.on(event, func)</b><br>
Add a global event

<b>xJS.once(event, func)</b><br>
Add a global event that is executed only once

<b>xJS.off(event)</b><br>
Remove a global event

<b>xJS.trigger(event, args)</b><br>
Triggers an event

<b>xJS.freeze(value)</b><br>

### Event Object Functions
<b>xJS.fn.on</b><br>
<b>xJS.fn.once</b><br>
<b>xJS.fn.off</b><br>
<b>xJS.fn.trigger</b><br>

### i18n Functions
<b>xJS.__</b><br>
Calls xJS.i18n.get
	
<b>xJS.i18n.get</b><br>
Return a translated string

<b>xJS.i18n.set</b><br>
Sets a translation for a string
	
<b>xJS.i18n.lang</b><br>
Gets / Sets the current language

<i>TD Development 2013</i>