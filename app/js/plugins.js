'use strict';
// Source: src/js/vendor/plugins/browser.js
/*
 * The MIT License
 *
 * Copyright 2014 Ray Walker <hello@raywalker.it>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Browser = (function () {
    var N = navigator.appName, ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
        M[2] = tem[1];
    }
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return {
        name: M[0],
        version: M[1]
    };
})();



function get_browser() {
    return Browser.name;
}

function get_browser_version() {

    return Browser.version;
};
// Source: src/js/vendor/plugins/console.js
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());;
// Source: src/js/vendor/plugins/jRespond.min.js
/*! jRespond.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */
!function(a,b,c){"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=c:(a[b]=c,"function"==typeof define&&define.amd&&define(b,[],function(){return c}))}(this,"jRespond",function(a,b,c){"use strict";return function(a){var b=[],d=[],e=a,f="",g="",i=0,j=100,k=500,l=k,m=function(){var a=0;return a="number"!=typeof window.innerWidth?0!==document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth:window.innerWidth},n=function(a){if(a.length===c)o(a);else for(var b=0;b<a.length;b++)o(a[b])},o=function(a){var e=a.breakpoint,h=a.enter||c;b.push(a),d.push(!1),r(e)&&(h!==c&&h.call(null,{entering:f,exiting:g}),d[b.length-1]=!0)},p=function(){for(var a=[],e=[],h=0;h<b.length;h++){var i=b[h].breakpoint,j=b[h].enter||c,k=b[h].exit||c;"*"===i?(j!==c&&a.push(j),k!==c&&e.push(k)):r(i)?(j===c||d[h]||a.push(j),d[h]=!0):(k!==c&&d[h]&&e.push(k),d[h]=!1)}for(var l={entering:f,exiting:g},m=0;m<e.length;m++)e[m].call(null,l);for(var n=0;n<a.length;n++)a[n].call(null,l)},q=function(a){for(var b=!1,c=0;c<e.length;c++)if(a>=e[c].enter&&a<=e[c].exit){b=!0;break}b&&f!==e[c].label?(g=f,f=e[c].label,p()):b||""===f||(f="",p())},r=function(a){if("object"==typeof a){if(a.join().indexOf(f)>=0)return!0}else{if("*"===a)return!0;if("string"==typeof a&&f===a)return!0}},s=function(){var a=m();a!==i?(l=j,q(a)):l=k,i=a,setTimeout(s,l)};return s(),{addFunc:function(a){n(a)},getBreakpoint:function(){return f}}}}(this,this.document));;
// Source: src/js/vendor/plugins/jsrender.js
/*! JsRender v1.0.0-beta: http://github.com/BorisMoore/jsrender and http://jsviews.com/jsviews */
/*
* Optimized version of jQuery Templates, for rendering to string.
* Does not require jQuery, or HTML DOM
* Integrates with JsViews (http://jsviews.com/jsviews)
* Copyright 2013, Boris Moore
* Released under the MIT License.
*/

(function(global, jQuery, undefined) {
	// global is the this object, which is window when running in the usual browser environment.
if (jQuery && jQuery.views || global.jsviews) { return; } // JsRender is already loaded

	//========================== Top-level vars ==========================

	var versionNumber = "v1.0.0-beta",

		$, jsvStoreName, rTag, rTmplString,// nodeJsModule,

//TODO	tmplFnsCache = {},
		delimOpenChar0 = "{", delimOpenChar1 = "{", delimCloseChar0 = "}", delimCloseChar1 = "}", linkChar = "^",

		rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
		//                                     object     helper    view  viewProperty pathTokens      leafToken

		rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*\.|\s*\^)|[)\]])([([]?))|(\s+)/g,
		//          lftPrn0        lftPrn                  path    operator err                                                eq          path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot                        prn2      space
		// (left paren? followed by (path? followed by operator) or (path followed by left paren?)) or comma or apos or quot or right paren or space

		rNewLine = /\s*\n/g,
		rUnescapeQuotes = /\\(['"])/g,
		rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
		rBuildHash = /\x08(~)?([^\x08]+)\x08/g,
		rTestElseIf = /^if\s/,
		rFirstElem = /<(\w+)[>\s]/,
		rAttrEncode = /[\x00`><"'&]/g, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		rHtmlEncode = rAttrEncode,
		autoTmplName = 0,
		viewId = 0,
		charEntities = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\x00": "&#0;",
			"'": "&#39;",
			'"': "&#34;",
			"`": "&#96;"
		},
		tmplAttr = "data-jsv-tmpl",

		$render = {},
		jsvStores = {
			template: {
				compile: compileTmpl
			},
			tag: {
				compile: compileTag
			},
			helper: {},
			converter: {}
		},

		// jsviews object ($.views if jQuery is loaded)
		$views = {
			jsviews: versionNumber,
			render: $render,
			settings: {
				delimiters: $viewsDelimiters,
				debugMode: true,
				tryCatch: true
			},
			sub: {
				// subscription, e.g. JsViews integration
				View: View,
				Error: JsViewsError,
				tmplFn: tmplFn,
				parse: parseParams,
				extend: $extend,
				error: error,
				syntaxError: syntaxError
			},
			_cnvt: convertVal,
			_tag: renderTag,

			_err: function(e) {
				// Place a breakpoint here to intercept template rendering errors
				return $viewsSettings.debugMode ? ("Error: " + (e.message || e)) + ". " : '';
			}
		};

		function JsViewsError(message, object) {
			// Error exception type for JsViews/JsRender
			// Override of $.views.sub.Error is possible
			if (object && object.onError) {
				if (object.onError(message) === false) {
					return;
				}
			}
			this.name = "JsRender Error";
			this.message = message || "JsRender error";
		}

		function $extend(target, source) {
			var name;
			target = target || {};
			for (name in source) {
				target[name] = source[name];
			}
			return target;
		}

		(JsViewsError.prototype = new Error()).constructor = JsViewsError;

	//========================== Top-level functions ==========================

	//===================
	// jsviews.delimiters
	//===================
	function $viewsDelimiters(openChars, closeChars, link) {
		// Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
		// openChars, closeChars: opening and closing strings, each with two characters

		if (!$viewsSub.rTag || arguments.length) {
			delimOpenChar0 = openChars ? openChars.charAt(0) : delimOpenChar0; // Escape the characters - since they could be regex special characters
			delimOpenChar1 = openChars ? openChars.charAt(1) : delimOpenChar1;
			delimCloseChar0 = closeChars ? closeChars.charAt(0) : delimCloseChar0;
			delimCloseChar1 = closeChars ? closeChars.charAt(1) : delimCloseChar1;
			linkChar = link || linkChar;
			openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1;  // Default is "{^{"
			closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
			// Build regex with new delimiters
			//          tag    (followed by / space or })   or cvtr+colon or html or code
			rTag = "(?:(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))"
				+ "\\s*((?:[^\\" + delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

			// make rTag available to JsViews (or other components) for parsing binding expressions
			$viewsSub.rTag = rTag + ")";

			rTag = new RegExp(openChars + rTag + "(\\/)?|(?:\\/(\\w+)))" + closeChars, "g");

			// Default:    bind           tag       converter colon html     comment            code      params            slash   closeBlock
			//           /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g

			rTmplString = new RegExp("<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
			// rTmplString looks for html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}. Each of these strings are considered
			// NOT to be jQuery selectors
		}
		return [delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar];
	}

	//=========
	// View.get
	//=========

	function getView(inner, type) { //view.get(inner, type)
		if (!type) {
			// view.get(type)
			type = inner;
			inner = undefined;
		}

		var views, i, l, found,
			view = this,
			root = !type || type === "root";
			// If type is undefined, returns root view (view under top view).

		if (inner) {
			// Go through views - this one, and all nested ones, depth-first - and return first one with given type.
			found = view.type === type ? view : undefined;
			if (!found) {
				views = view.views;
				if (view._.useKey) {
					for (i in views) {
						if (found = views[i].get(inner, type)) {
							break;
						}
					}
				} else for (i = 0, l = views.length; !found && i < l; i++) {
					found = views[i].get(inner, type);
				}
			}
		} else if (root) {
			// Find root view. (view whose parent is top view)
			while (view.parent.parent) {
				found = view = view.parent;
			}
		} else while (view && !found) {
			// Go through views - this one, and all parent ones - and return first one with given type.
			found = view.type === type ? view : undefined;
			view = view.parent;
		}
		return found;
	}

	function getIndex() {
		var view = this.get("item");
		return view ? view.index : undefined;
	}

	getIndex.depends = function() {
		return [this.get("item"), "index"];
	};

	//==========
	// View.hlp
	//==========

	function getHelper(helper) {
		// Helper method called as view.hlp(key) from compiled template, for helper functions or template parameters ~foo
		var wrapped,
			view = this,
			res = (view.ctx || {})[helper];

		res = res === undefined ? view.getRsc("helpers", helper) : res;

		if (res) {
			if (typeof res === "function") {
				wrapped = function() {
					// If it is of type function, we will wrap it so it gets called with view as 'this' context.
					// If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
					// However note that helper functions on deeper paths will not have access to view and tagCtx.
					// For example, ~util.foo() will have the ~util object as 'this' pointer
					return res.apply(view, arguments);
				};
				$extend(wrapped, res);
			}
		}
		return wrapped || res;
	}

	//==============
	// jsviews._cnvt
	//==============

	function convertVal(converter, view, tagCtx) {
		// self is template object or linkCtx object
		var tmplConverter, tag, value,
			boundTagCtx = +tagCtx === tagCtx && tagCtx, // if value is an integer, then it is the key for the boundTagCtx
			linkCtx = view.linkCtx;

		if (boundTagCtx) {
			// Call compiled function which returns the tagCtxs for current data
			tagCtx = (boundTagCtx = view.tmpl.bnds[boundTagCtx-1])(view.data, view, $views);
		}

		value = tagCtx.args[0];

		if (converter || boundTagCtx) {
			tag = linkCtx && linkCtx.tag || {
				_: {
					inline: !linkCtx
				},
				tagName: converter + ":",
				flow: true,
				_is: "tag"
			};

			tag._.bnd = boundTagCtx;

			if (linkCtx) {
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
				tagCtx.ctx = extendCtx(tagCtx.ctx, linkCtx.view.ctx);
			}
			tag.tagCtx = tagCtx;
			tagCtx.view = view;

			tag.ctx = tagCtx.ctx || {};
			delete tagCtx.ctx;
			// Provide this tag on view, for addBindingMarkers on bound tags to add the tag to view._.bnds, associated with the tag id,
			view._.tag = tag;

			converter = converter !== "true" && converter; // If there is a convertBack but no convert, converter will be "true"

			if (converter && ((tmplConverter = view.getRsc("converters", converter)) || error("Unknown converter: {{"+ converter + ":"))) {
				// A call to {{cnvt: ... }} or {^{cnvt: ... }} or data-link="{cnvt: ... }"
				tag.depends = tmplConverter.depends;
				value = tmplConverter.apply(tag, tagCtx.args);
			}
			// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
			value = boundTagCtx && view._.onRender
				? view._.onRender(value, view, boundTagCtx)
				: value;
			view._.tag = undefined;
		}
		return value;
	}

	//=============
	// jsviews._tag
	//=============

	function getResource(resourceType, itemName) {
		var res,
			view = this,
			store = $views[resourceType];

		res = store && store[itemName];
		while ((res === undefined) && view) {
			store = view.tmpl[resourceType];
			res = store && store[itemName];
			view = view.parent;
		}
		return res;
	}

	function renderTag(tagName, parentView, tmpl, tagCtxs) {
		// Called from within compiled template function, to render a template tag
		// Returns the rendered tag

		var render, tag, tags, attr, parentTag, i, l, itemRet, tagCtx, tagCtxCtx, content, boundTagFn, tagDef, callInit,
			ret = "",
			boundTagKey = +tagCtxs === tagCtxs && tagCtxs, // if tagCtxs is an integer, then it is the boundTagKey
			linkCtx = parentView.linkCtx || 0,
			ctx = parentView.ctx,
			parentTmpl = tmpl || parentView.tmpl,
			parentView_ = parentView._;

		if (tagName._is === "tag") {
			tag = tagName;
			tagName = tag.tagName;
		}

		// Provide tagCtx, linkCtx and ctx access from tag
		if (boundTagKey) {
			// if tagCtxs is an integer, we are data binding
			// Call compiled function which returns the tagCtxs for current data
			tagCtxs = (boundTagFn = parentTmpl.bnds[boundTagKey-1])(parentView.data, parentView, $views);
		}

		l = tagCtxs.length;
		tag = tag || linkCtx.tag;
		for (i = 0; i < l; i++) {
			tagCtx = tagCtxs[i];

			// Set the tmpl property to the content of the block tag, unless set as an override property on the tag
			content = tagCtx.tmpl;
			content = tagCtx.content = content && parentTmpl.tmpls[content - 1];
			tmpl = tagCtx.props.tmpl;
			if (!i && (!tmpl || !tag)) {
				tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{"+ tagName + "}}");
			}
			tmpl = tmpl || (tag ? tag._def : tagDef).template || content;
			tmpl = "" + tmpl === tmpl // if a string
				? parentView.getRsc("templates", tmpl) || $templates(tmpl)
				: tmpl;

			$extend( tagCtx, {
				tmpl: tmpl,
				render: renderContent,
				index: i,
				view: parentView,
				ctx: extendCtx(tagCtx.ctx, ctx) // Extend parentView.ctx
			}); // Extend parentView.ctx

			if (!tag) {
				// This will only be hit for initial tagCtx (not for {{else}}) - if the tag instance does not exist yet
				// Instantiate tag if it does not yet exist
				if (tagDef._ctr) {
					// If the tag has not already been instantiated, we will create a new instance.
					// ~tag will access the tag, even within the rendering of the template content of this tag.
					// From child/descendant tags, can access using ~tag.parent, or ~parentTags.tagName
//	TODO provide error handling owned by the tag - using tag.onError
//				try {
					tag = new tagDef._ctr();
					callInit = !!tag.init;
//				}
//				catch(e) {
//					tagDef.onError(e);
//				}
					// Set attr on linkCtx to ensure outputting to the correct target attribute.
					tag.attr = tag.attr || tagDef.attr || undefined;
					// Setting either linkCtx.attr or this.attr in the init() allows per-instance choice of target attrib.
				} else {
					// This is a simple tag declared as a function, or with init set to false. We won't instantiate a specific tag constructor - just a standard instance object.
					tag = {
						// tag instance object if no init constructor
						render: tagDef.render
					};
				}
				tag._ = {
					inline: !linkCtx
				};
				if (linkCtx) {
					// Set attr on linkCtx to ensure outputting to the correct target attribute.
					linkCtx.attr = tag.attr = linkCtx.attr || tag.attr;
					linkCtx.tag = tag;
					tag.linkCtx = linkCtx;
				}
				if (tag._.bnd = boundTagFn || linkCtx) {
					// Bound if {^{tag...}} or data-link="{tag...}"
					tag._.arrVws = {};
				}
				tag.tagName = tagName;
				tag.parent = parentTag = ctx && ctx.tag;
				tag._is = "tag";
				tag._def = tagDef;
				// Provide this tag on view, for addBindingMarkers on bound tags to add the tag to view._.bnds, associated with the tag id,
			}
			parentView_.tag = tag;
			tagCtx.tag = tag;
			tag.tagCtxs = tagCtxs;
			if (!tag.flow) {
				tagCtxCtx = tagCtx.ctx = tagCtx.ctx || {};

				// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
				tags = tag.parents = tagCtxCtx.parentTags = ctx && extendCtx(tagCtxCtx.parentTags, ctx.parentTags) || {};
				if (parentTag) {
					tags[parentTag.tagName] = parentTag;
				}
				tagCtxCtx.tag = tag;
			}
		}
		tag.rendering = {}; // Provide object for state during render calls to tag and elses. (Used by {{if}} and {{for}}...)
		for (i = 0; i < l; i++) {
			tagCtx = tag.tagCtx = tagCtxs[i];
			tag.ctx = tagCtx.ctx;

			if (!i && callInit) {
				tag.init(tagCtx, linkCtx, tag.ctx);
				callInit = undefined;
			}

			if (render = tag.render) {
				itemRet = render.apply(tag, tagCtx.args);
			}
			ret += itemRet !== undefined
				? itemRet   // Return result of render function unless it is undefined, in which case return rendered template
				: tagCtx.tmpl
					// render template/content on the current data item
					? tagCtx.render()
					: ""; // No return value from render, and no template/content defined, so return ""
		}
		delete tag.rendering;

		tag.tagCtx = tag.tagCtxs[0];
		tag.ctx= tag.tagCtx.ctx;

		if (tag._.inline && (attr = tag.attr) && attr !== "html") {
			ret = attr === "text"
				? $converters.html(ret)
				: "";
		}
		return boundTagKey && parentView._.onRender
			// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
			? parentView._.onRender(ret, parentView, boundTagKey)
			: ret;
	}

	//=================
	// View constructor
	//=================

	function View(context, type, parentView, data, template, key, contentTmpl, onRender) {
		// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
		var views, parentView_, tag,
			isArray = type === "array",
			self_ = {
				key: 0,
				useKey: isArray ? 0 : 1,
				id: "" + viewId++,
				onRender: onRender,
				bnds: {}
			},
			self = {
				data: data,
				tmpl: template,
				content: contentTmpl,
				views: isArray ? [] : {},
				parent: parentView,
				ctx: context,
				type: type,
				// If the data is an array, this is an 'array view' with a views array for each child 'item view'
				// If the data is not an array, this is an 'item view' with a views 'map' object for any child nested views
				// ._.useKey is non zero if is not an 'array view' (owning a data array). Uuse this as next key for adding to child views map
				get: getView,
				getIndex: getIndex,
				getRsc: getResource,
				hlp: getHelper,
				_: self_,
				_is: "view"
		};
		if (parentView) {
			views = parentView.views;
			parentView_ = parentView._;
			if (parentView_.useKey) {
				// Parent is an 'item view'. Add this view to its views object
				// self._key = is the key in the parent view map
				views[self_.key = "_" + parentView_.useKey++] = self;
				tag = parentView_.tag;
				self_.bnd = isArray && (!tag || !!tag._.bnd && tag); // For array views that are data bound for collection change events, set the
				// view._.bnd property to true for top-level link() or data-link="{for}", or to the tag instance for a data- bound tag, e.g. {^{for ...}}
			} else {
				// Parent is an 'array view'. Add this view to its views array
				views.splice(
					// self._.key = self.index - the index in the parent view array
					self_.key = self.index =
						key !== undefined
							? key
							: views.length,
				0, self);
			}
			// If no context was passed in, use parent context
			// If context was passed in, it should have been merged already with parent context
			self.ctx = context || parentView.ctx;
		}
		return self;
	}

	//=============
	// Registration
	//=============

	function compileChildResources(parentTmpl) {
		var storeName, resources, resourceName, settings, compile;
		for (storeName in jsvStores) {
			settings = jsvStores[storeName];
			if ((compile = settings.compile) && (resources = parentTmpl[storeName + "s"])) {
				for (resourceName in resources) {
					// compile child resource declarations (templates, tags, converters or helpers)
					resources[resourceName] = compile(resourceName, resources[resourceName], parentTmpl, storeName, settings);
				}
			}
		}
	}

	function compileTag(name, tagDef, parentTmpl) {
		var init, tmpl;
		if (typeof tagDef === "function") {
			// Simple tag declared as function. No presenter instantation.
			tagDef = {
				depends: tagDef.depends,
				render: tagDef
			};
		} else {
			// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
			if (tmpl = tagDef.template) {
				tagDef.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
			}
			if (tagDef.init !== false) {
				init = tagDef._ctr = function(tagCtx) {};
				(init.prototype = tagDef).constructor = init;
			}
		}
		if (parentTmpl) {
			tagDef._parentTmpl = parentTmpl;
		}
//TODO	tagDef.onError = function(e) {
//			var error;
//			if (error = this.prototype.onError) {
//				error.call(this, e);
//			} else {
//				throw e;
//			}
//		}
		return tagDef;
	}

	function compileTmpl(name, tmpl, parentTmpl, storeName, storeSettings, options) {
		// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

		//==== nested functions ====
		function tmplOrMarkupFromStr(value) {
			// If value is of type string - treat as selector, or name of compiled template
			// Return the template object, if already compiled, or the markup string

			if (("" + value === value) || value.nodeType > 0) {
				try {
					elem = value.nodeType > 0
					? value
					: !rTmplString.test(value)
					// If value is a string and does not contain HTML or tag content, then test as selector
						&& jQuery && jQuery(global.document).find(value)[0];
					// If selector is valid and returns at least one element, get first element
					// If invalid, jQuery will throw. We will stay with the original string.
				} catch (e) {}

				if (elem) {
					// Generally this is a script element.
					// However we allow it to be any element, so you can for example take the content of a div,
					// use it as a template, and replace it by the same content rendered against data.
					// e.g. for linking the content of a div to a container, and using the initial content as template:
					// $.link("#content", model, {tmpl: "#content"});

					value = elem.getAttribute(tmplAttr);
					name = name || value;
					value = $templates[value];
					if (!value) {
						// Not already compiled and cached, so compile and cache the name
						// Create a name for compiled template if none provided
						name = name || "_" + autoTmplName++;
						elem.setAttribute(tmplAttr, name);
						// Use tmpl as options
						value = $templates[name] = compileTmpl(name, elem.innerHTML, parentTmpl, storeName, storeSettings, options);
					}
				}
				return value;
			}
			// If value is not a string, return undefined
		}

		var tmplOrMarkup, elem;

		//==== Compile the template ====
		tmpl = tmpl || "";
		tmplOrMarkup = tmplOrMarkupFromStr(tmpl);

		// If options, then this was already compiled from a (script) element template declaration.
		// If not, then if tmpl is a template object, use it for options
		options = options || (tmpl.markup ? tmpl : {});
		options.tmplName = name;
		if (parentTmpl) {
			options._parentTmpl = parentTmpl;
		}
		// If tmpl is not a markup string or a selector string, then it must be a template object
		// In that case, get it from the markup property of the object
		if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = tmplOrMarkupFromStr(tmpl.markup))) {
			if (tmplOrMarkup.fn && (tmplOrMarkup.debug !== tmpl.debug || tmplOrMarkup.allowCode !== tmpl.allowCode)) {
				// if the string references a compiled template object, but the debug or allowCode props are different, need to recompile
				tmplOrMarkup = tmplOrMarkup.markup;
			}
		}
		if (tmplOrMarkup !== undefined) {
			if (name && !parentTmpl) {
				$render[name] = function() {
					return tmpl.render.apply(tmpl, arguments);
				};
			}
			if (tmplOrMarkup.fn || tmpl.fn) {
				// tmpl is already compiled, so use it, or if different name is provided, clone it
				if (tmplOrMarkup.fn) {
					if (name && name !== tmplOrMarkup.tmplName) {
						tmpl = extendCtx(options, tmplOrMarkup);
					} else {
						tmpl = tmplOrMarkup;
					}
				}
			} else {
				// tmplOrMarkup is a markup string, not a compiled template
				// Create template object
				tmpl = TmplObject(tmplOrMarkup, options);
				// Compile to AST and then to compiled function
				tmplFn(tmplOrMarkup, tmpl);
			}
			compileChildResources(options);
			return tmpl;
		}
	}
	//==== /end of function compile ====

	function TmplObject(markup, options) {
		// Template object constructor
		var htmlTag,
			wrapMap = $viewsSettings.wrapMap || {},
			tmpl = $extend(
				{
					markup: markup,
					tmpls: [],
					links: {}, // Compiled functions for link expressions
					tags: {}, // Compiled functions for bound tag expressions
					bnds: [],
					_is: "template",
					render: renderContent
				},
				options
			);

		if (!options.htmlTag) {
			// Set tmpl.tag to the top-level HTML tag used in the template, if any...
			htmlTag = rFirstElem.exec(markup);
			tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
		}
		htmlTag = wrapMap[tmpl.htmlTag];
		if (htmlTag && htmlTag !== wrapMap.div) {
			// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
			tmpl.markup = $.trim(tmpl.markup);
			tmpl._elCnt = true; // element content model (no rendered text nodes), not phrasing content model
		}

		return tmpl;
	}

	function registerStore(storeName, storeSettings) {

		function theStore(name, item, parentTmpl) {
			// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

			// For store of name 'thing', Call as:
			//    $.views.things(items[, parentTmpl]),
			// or $.views.things(name, item[, parentTmpl])

			var onStore, compile, itemName, thisStore;

			if (name && "" + name !== name && !name.nodeType && !name.markup) {
				// Call to $.views.things(items[, parentTmpl]),

				// Adding items to the store
				// If name is a map, then item is parentTmpl. Iterate over map and call store for key.
				for (itemName in name) {
					theStore(itemName, name[itemName], item);
				}
				return $views;
			}
			// Adding a single unnamed item to the store
			if (item === undefined) {
				item = name;
				name = undefined;
			}
			if (name && "" + name !== name) { // name must be a string
				parentTmpl = item;
				item = name;
				name = undefined;
			}
			thisStore = parentTmpl ? parentTmpl[storeNames] = parentTmpl[storeNames] || {} : theStore;
			compile = storeSettings.compile;
			if (onStore = $viewsSub.onBeforeStoreItem) {
				// e.g. provide an external compiler or preprocess the item.
				compile = onStore(thisStore, name, item, compile) || compile;
			}
			if (!name) {
				item = compile(undefined, item);
			} else if (item === null) {
				// If item is null, delete this entry
				delete thisStore[name];
			} else {
				thisStore[name] = compile ? (item = compile(name, item, parentTmpl, storeName, storeSettings)) : item;
			}
			if (item) {
				item._is = storeName;
			}
			if (onStore = $viewsSub.onStoreItem) {
				// e.g. JsViews integration
				onStore(thisStore, name, item, compile);
			}
			return item;
		}

		var storeNames = storeName + "s";

		$views[storeNames] = theStore;
		jsvStores[storeName] = storeSettings;
	}

	//==============
	// renderContent
	//==============

	function renderContent(data, context, parentView, key, isLayout, onRender) {
		// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
		// If the data is the parent view, treat as layout template, re-render with the same data context.
		var i, l, dataItem, newView, childView, itemResult, swapContent, tagCtx, contentTmpl, tag_, outerOnRender, tmplName, tmpl,
			self = this,
			allowDataLink = !self.attr || self.attr === "html",
			result = "";

		if (key === true) {
			swapContent = true;
			key = 0;
		}
		if (self.tag) {
			// This is a call from renderTag or tagCtx.render()
			tagCtx = self;
			self = self.tag;
			tag_ = self._;
			tmplName = self.tagName;
			tmpl = tagCtx.tmpl;
			context = extendCtx(context, self.ctx);
			contentTmpl = tagCtx.content; // The wrapped content - to be added to views, below
			if ( tagCtx.props.link === false ) {
				// link=false setting on block tag
				// We will override inherited value of link by the explicit setting link=false taken from props
				// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
				context = context || {};
				context.link = false;
			}
			parentView = parentView || tagCtx.view;
			data = data === undefined ? parentView : data;
		} else {
			tmpl = self.jquery && (self[0] || error('Unknown template: "' + self.selector + '"')) // This is a call from $(selector).render
				|| self;
		}
		if (tmpl) {
			if (!parentView && data && data._is === "view") {
				parentView = data; // When passing in a view to render or link (and not passing in a parent view) use the passed in view as parentView
			}
			if (parentView) {
				contentTmpl = contentTmpl || parentView.content; // The wrapped content - to be added as #content property on views, below
				onRender = onRender || parentView._.onRender;
				if (data === parentView) {
					// Inherit the data from the parent view.
					// This may be the contents of an {{if}} block
					// Set isLayout = true so we don't iterate the if block if the data is an array.
					data = parentView.data;
					isLayout = true;
				}
				context = extendCtx(context, parentView.ctx);
			}
			if (!parentView || parentView.data === undefined) {
				(context = context || {}).root = data; // Provide ~root as shortcut to top-level data.
			}

			// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
			// Note: If no jQuery, $extend does not support chained copies - so limit extend() to two parameters

			if (!tmpl.fn) {
				tmpl = $templates[tmpl] || $templates(tmpl);
			}

			if (tmpl) {
				onRender = (context && context.link) !== false && allowDataLink && onRender;
				// If link===false, do not call onRender, so no data-linking marker nodes
				outerOnRender = onRender;
				if (onRender === true) {
					// Used by view.refresh(). Don't create a new wrapper view.
					outerOnRender = undefined;
					onRender = parentView._.onRender;
				}
				if ($.isArray(data) && !isLayout) {
					// Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
					// along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
					newView = swapContent
						? parentView :
						(key !== undefined && parentView) || View(context, "array", parentView, data, tmpl, key, contentTmpl, onRender);
					for (i = 0, l = data.length; i < l; i++) {
						// Create a view for each data item.
						dataItem = data[i];
						childView = View(context, "item", newView, dataItem, tmpl, (key || 0) + i, contentTmpl, onRender);
						itemResult = tmpl.fn(dataItem, childView, $views);
						result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
					}
				} else {
					// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "myTag" except for
					// "item", "array" and "data" views. A "data" view is from programatic render(object) against a 'singleton'.
					newView = swapContent ? parentView : View(context, tmplName||"data", parentView, data, tmpl, key, contentTmpl, onRender);
					if (tag_ && !self.flow) {
						newView.tag = self;
					}
					result += tmpl.fn(data, newView, $views);
				}
				return outerOnRender ? outerOnRender(result, newView) : result;
			}
		}
		return "";
	}

	//===========================
	// Build and compile template
	//===========================

	// Generate a reusable function that will serve to render a template against data
	// (Compile AST then build template function)

	function error(message) {
		throw new $views.sub.Error(message);
	}

	function syntaxError(message) {
		error("Syntax error\n" + message);
	}

	function tmplFn(markup, tmpl, isLinkExpr, convertBack) {
		// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
		// Used for compiling templates, and also by JsViews to build functions for data link expressions

		//==== nested functions ====
		function pushprecedingContent(shift) {
			shift -= loc;
			if (shift) {
				content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
			}
		}

		function blockTagCheck(tagName) {
			tagName && syntaxError('Unmatched or missing tag: "{{/' + tagName + '}}" in template:\n' + markup);
		}

		function parseTag(all, bind, tagName, converter, colon, html, comment, codeTag, params, slash, closeBlock, index) {

			//    bind         tag        converter colon html     comment            code      params            slash   closeBlock
			// /{(\^)?{(?:(?:(\w+(?=[\/\s}]))|(?:(\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\*)))\s*((?:[^}]|}(?!}))*?)(\/)?|(?:\/(\w+)))}}/g
			// Build abstract syntax tree (AST): [ tagName, converter, params, content, hash, bindings, contentMarkup ]
			if (html) {
				colon = ":";
				converter = "html";
			}
			slash = slash || isLinkExpr;
			var noError, current0,
				pathBindings = bind && [],
				code = "",
				hash = "",
				passedCtx = "",
				// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
				block = !slash && !colon && !comment;

			//==== nested helper function ====
			tagName = tagName || colon;
			pushprecedingContent(index);
			loc = index + all.length; // location marker - parsed up to here
			if (codeTag) {
				if (allowCode) {
					content.push(["*", "\n" + params.replace(rUnescapeQuotes, "$1") + "\n"]);
				}
			} else if (tagName) {
				if (tagName === "else") {
					if (rTestElseIf.test(params)) {
						syntaxError('for "{{else if expr}}" use "{{else expr}}"');
					}
					pathBindings = current[6];
					current[7] = markup.substring(current[7], index); // contentMarkup for block tag
					current = stack.pop();
					content = current[3];
					block = true;
				}
				if (params) {
					// remove newlines from the params string, to avoid compiled code errors for unterminated strings
					params = params.replace(rNewLine, " ");
					code = parseParams(params, pathBindings, tmpl)
						.replace(rBuildHash, function(all, isCtx, keyValue) {
							if (isCtx) {
								passedCtx += keyValue + ",";
							} else {
								hash += keyValue + ",";
							}
							return "";
						});
				}
				hash = hash.slice(0, -1);
				code = code.slice(0, -1);
				noError = hash && (hash.indexOf("noerror:true") + 1) && hash || "";

				newNode = [
						tagName,
						converter || !!convertBack || "",
						code,
						block && [],
						'params:"' + params + '",props:{' + hash + "}"
							+ (passedCtx ? ",ctx:{" + passedCtx.slice(0, -1) + "}" : ""),
						noError,
						pathBindings || 0
					];
				content.push(newNode);
				if (block) {
					stack.push(current);
					current = newNode;
					current[7] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
				}
			} else if (closeBlock) {
				current0 = current[0];
				blockTagCheck(closeBlock !== current0 && current0 !== "else" && closeBlock);
				current[7] = markup.substring(current[7], index); // contentMarkup for block tag
				current = stack.pop();
			}
			blockTagCheck(!current && closeBlock);
			content = current[3];
		}
		//==== /end of nested functions ====

		var newNode,
			allowCode = tmpl && tmpl.allowCode,
			astTop = [],
			loc = 0,
			stack = [],
			content = astTop,
			current = [, , , astTop];

		markup = markup.replace(rEscapeQuotes, "\\$&");

//TODO	result = tmplFnsCache[markup]; // Only cache if template is not named and markup length < ...,
//and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
//		if (result) {
//			tmpl.fn = result;
//		} else {

//		result = markup;

		blockTagCheck(stack[0] && stack[0][3].pop()[0]);

		// Build the AST (abstract syntax tree) under astTop
		markup.replace(rTag, parseTag);

		pushprecedingContent(markup.length);

		if (loc = astTop[astTop.length - 1]) {
			blockTagCheck("" + loc !== loc && (+loc[7] === loc[7]) && loc[0]);
		}
//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
//		}
		return buildCode(astTop, isLinkExpr ? markup : tmpl, isLinkExpr);
	}

	function buildCode(ast, tmpl, isLinkExpr) {
		// Build the template function code from the AST nodes, and set as property on the passed-in template object
		// Used for compiling templates, and also by JsViews to build functions for data link expressions
		var i, node, tagName, converter, params, hash, hasTag, hasEncoder, getsVal, hasCnvt, useCnvt, tmplBindings, pathBindings,
			nestedTmpls, tmplName, nestedTmpl, tagAndElses, content, markup, nextIsElse, oldCode, isElse, isGetVal, prm, tagCtxFn,
			tmplBindingKey = 0,
			code = "",
			noError = "",
			tmplOptions = {},
			l = ast.length;

		if ("" + tmpl === tmpl) {
			tmplName = isLinkExpr ? 'data-link="' + tmpl.replace(rNewLine, " ").slice(1, -1) + '"' : tmpl;
			tmpl = 0;
		} else {
			tmplName = tmpl.tmplName || "unnamed";
			if (tmpl.allowCode) {
				tmplOptions.allowCode = true;
			}
			if (tmpl.debug) {
				tmplOptions.debug = true;
			}
			tmplBindings = tmpl.bnds;
			nestedTmpls = tmpl.tmpls;
		}
		for (i = 0; i < l; i++) {
			// AST nodes: [ tagName, converter, params, content, hash, noError, pathBindings, contentMarkup, link ]
			node = ast[i];

			// Add newline for each callout to t() c() etc. and each markup string
			if ("" + node === node) {
				// a markup string to be inserted
				code += '\nret+="' + node + '";';
			} else {
				// a compiled tag expression to be inserted
				tagName = node[0];
				if (tagName === "*") {
					// Code tag: {{* }}
					code += "" + node[1];
				} else {
					converter = node[1];
					params = node[2];
					content = node[3];
					hash = node[4];
					noError = node[5];
					markup = node[7];

					if (!(isElse = tagName === "else")) {
						tmplBindingKey = 0;
						if (tmplBindings && (pathBindings = node[6])) { // Array of paths, or false if not data-bound
							tmplBindingKey = tmplBindings.push(pathBindings);
						}
					}
					if (isGetVal = tagName === ":") {
						if (converter) {
							tagName = converter === "html" ? ">" : converter + tagName;
						}
						if (noError) {
							// If the tag includes noerror=true, we will do a try catch around expressions for named or unnamed parameters
							// passed to the tag, and return the empty string for each expression if it throws during evaluation
							//TODO This does not work for general case - supporting noError on multiple expressions, e.g. tag args and properties.
							//Consider replacing with try<a.b.c(p,q) + a.d, xxx> and return the value of the expression a.b.c(p,q) + a.d, or, if it throws, return xxx||'' (rather than always the empty string)
							prm = "prm" + i;
							noError = "try{var " + prm + "=[" + params + "][0];}catch(e){" + prm + '="";}\n';
							params = prm;
						}
					} else {
						if (content) {
							// Create template object for nested template
							nestedTmpl = TmplObject(markup, tmplOptions);
							nestedTmpl.tmplName = tmplName + "/" + tagName;
							// Compile to AST and then to compiled function
							buildCode(content, nestedTmpl);
							nestedTmpls.push(nestedTmpl);
						}

						if (!isElse) {
							// This is not an else tag.
							tagAndElses = tagName;
							// Switch to a new code string for this bound tag (and its elses, if it has any) - for returning the tagCtxs array
							oldCode = code;
							code = "";
						}
						nextIsElse = ast[i + 1];
						nextIsElse = nextIsElse && nextIsElse[0] === "else";
					}

					hash += ",args:[" + params + "]}";

					if (isGetVal && pathBindings || converter && tagName !== ">") {
						// For convertVal we need a compiled function to return the new tagCtx(s)
						tagCtxFn = new Function("data,view,j,u", " // "
									+ tmplName + " " + tmplBindingKey + " " + tagName + "\n" + noError + "return {" + hash + ";");
						tagCtxFn.paths = pathBindings;
						tagCtxFn._ctxs = tagName;
						if (isLinkExpr) {
							return tagCtxFn;
						}
						useCnvt = 1;
					}

					code += (isGetVal
						? "\n" + (pathBindings ? "" : noError) + (isLinkExpr ? "return " : "ret+=") + (useCnvt // Call _cnvt if there is a converter: {{cnvt: ... }} or {^{cnvt: ... }}
							? (useCnvt = 0, hasCnvt = true, 'c("' + converter + '",view,' + (pathBindings
								? ((tmplBindings[tmplBindingKey - 1] = tagCtxFn), tmplBindingKey) // Store the compiled tagCtxFn in tmpl.bnds, and pass the key to convertVal()
								: "{" + hash) + ");")
							: tagName === ">"
								? (hasEncoder = true, "h(" + params + ");")
								: (getsVal = true, "(v=" + params + ")!=" + (isLinkExpr ? "=" : "") + 'u?v:"";') // Strict equality just for data-link="title{:expr}" so expr=null will remove title attribute 
						)
						: (hasTag = true, "{tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
							+ (content ? nestedTmpls.length: "0") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
							+ hash + ","));

					if (tagAndElses && !nextIsElse) {
						code = "[" + code.slice(0, -1) + "]"; // This is a data-link expression or the last {{else}} of an inline bound tag. We complete the code for returning the tagCtxs array
						if (isLinkExpr || pathBindings) {
							// This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
							code = new Function("data,view,j,u", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + "\nreturn " + code + ";");
							if (pathBindings) {
								(tmplBindings[tmplBindingKey - 1] = code).paths = pathBindings;
							}
							code._ctxs = tagName;
							if (isLinkExpr) {
								return code; // For a data-link expression we return the compiled tagCtxs function
							}
						}

						// This is the last {{else}} for an inline tag.
						// For a bound tag, pass the tagCtxs fn lookup key to renderTag.
						// For an unbound tag, include the code directly for evaluating tagCtxs array
						code = oldCode + '\nret+=t("' + tagAndElses + '",view,this,' + (tmplBindingKey || code) + ");";
						pathBindings = 0;
						tagAndElses = 0;
					}
				}
			}
		}
		// Include only the var references that are needed in the code
		code = "// " + tmplName
			+ "\nvar j=j||" + (jQuery ? "jQuery." : "js") + "views"
			+ (getsVal ? ",v" : "")                      // gets value
			+ (hasTag ? ",t=j._tag" : "")                // has tag
			+ (hasCnvt ? ",c=j._cnvt" : "")              // converter
			+ (hasEncoder ? ",h=j.converters.html" : "") // html converter
			+ (isLinkExpr ? ";\n" : ',ret="";\n')
			+ ($viewsSettings.tryCatch ? "try{\n" : "")
			+ (tmplOptions.debug ? "debugger;" : "")
			+ code + (isLinkExpr ? "\n" : "\nreturn ret;\n")
			+ ($viewsSettings.tryCatch ? "\n}catch(e){return j._err(e);}" : "");
		try {
			code = new Function("data,view,j,u", code);
		} catch (e) {
			syntaxError("Compiled template code:\n\n" + code, e);
		}
		if (tmpl) {
			tmpl.fn = code;
		}
		return code;
	}

	function parseParams(params, bindings, tmpl) {

		//function pushBindings() { // Consider structured path bindings
		//	if (bindings) {
		//		named ? bindings[named] = bindings.pop(): bindings.push(list = []);
		//	}
		//}

		function parseTokens(all, lftPrn0, lftPrn, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
			// rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*((\))(?=\s*\.|\s*\^)|\)|\])([([]?))|(\s+)/g,
			//          lftPrn        lftPrn2                 path    operator err                                                eq          path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot           prn2   space
			// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
			var expr;
			operator = operator || "";
			lftPrn = lftPrn || lftPrn0 || lftPrn2;
			path = path || path2;
			prn = prn || prn2 || "";

			function parsePath(all, object, helper, view, viewProperty, pathTokens, leafToken) {
				// rPath = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
				//                                        object   helper    view  viewProperty pathTokens       leafToken
				if (object) {
					bindings && !isAlias && bindings.push(path); // Add path binding for paths on props and args,
					// but not within foo=expr (named parameter) or ~foo=expr (passing in template parameter aliases).
//					bindings && !isAlias && list.push(path);
					if (object !== ".") {
						var ret = (helper
								? 'view.hlp("' + helper + '")'
								: view
									? "view"
									: "data")
							+ (leafToken
								? (viewProperty
									? "." + viewProperty
									: helper
										? ""
										: (view ? "" : "." + object)
									) + (pathTokens || "")
								: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

						ret = ret + (leafToken ? "." + leafToken : "");

						return ret.slice(0, 9) === "view.data"
							? ret.slice(5) // convert #view.data... to data...
							: ret;
					}
				}
				return all;
			}

			if (err) {
				syntaxError(params);
			} else {
				if (bindings && rtPrnDot) {
					// This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
					// We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes, to return the new object, and trigger re-binding of the subsequent path)
					expr = pathStart[parenDepth];
					if (full.length - 2 > index - expr) { // We need to compile a subexpression
						expr = full.slice(expr, index + 1);
						rtPrnDot = delimOpenChar1 + ":" + expr + delimCloseChar0; // The parameter or function subexpression
						rtPrnDot = tmplLinks[rtPrnDot] = tmplLinks[rtPrnDot] || tmplFn(delimOpenChar0 + rtPrnDot + delimCloseChar1, tmpl, true); // Compile the expression (or use cached copy already in tmpl.links)
						if (!rtPrnDot.paths) {
							parseParams(expr, rtPrnDot.paths = [], tmpl);
						}
						bindings.push({_jsvOb: rtPrnDot}); // Insert special object for in path bindings, to be used for binding the compiled sub expression ()
						//list.push({_jsvOb: rtPrnDot});
					}
				}
				return (aposed
					// within single-quoted string
					? (aposed = !apos, (aposed ? all : '"'))
					: quoted
					// within double-quoted string
						? (quoted = !quot, (quoted ? all : '"'))
						:
					(
						(lftPrn
								? (parenDepth++, pathStart[parenDepth] = index++, lftPrn)
								: "")
						+ (space
							? (parenDepth
								? ""
								//: (pushBindings(), named
								//	? (named = isAlias = false, "\b")
								//	: ",")
								: named
									? (named = isAlias = false, "\b")
									: ","
							)
							: eq
					// named param
					// Insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash
								? (parenDepth && syntaxError(params), named = path, /*pushBindings(),*/isAlias = path.charAt(0) === "~", '\b' + path + ':')
								: path
					// path
									? (path.split("^").join(".").replace(rPath, parsePath)
										+ (prn
											? (fnCall[++parenDepth] = true, path.charAt(0) !== "." && (pathStart[parenDepth] = index), prn)
											: operator)
									)
									: operator
										? operator
										: rtPrn
					// function
											? ((fnCall[parenDepth--] = false, rtPrn)
												+ (prn
													? (fnCall[++parenDepth] = true, prn)
													: "")
											)
											: comma
												? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
												: lftPrn0
													? ""
													: (aposed = apos, quoted = quot, '"')
					))
				);
			}
		}

		var named, isAlias,// list,
			tmplLinks = tmpl.links,
			fnCall = {},
			pathStart = {0:-1},
			parenDepth = 0,
			quoted = false, // boolean for string content in double quotes
			aposed = false; // or in single quotes

		//pushBindings();

		return (params + " ").replace(rParams, parseTokens);
	}

	//==========
	// Utilities
	//==========

	// Merge objects, in particular contexts which inherit from parent contexts
	function extendCtx(context, parentContext) {
		// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
		// If neither context nor parentContext are undefined, return undefined
		return context && context !== parentContext
			? (parentContext
				? $extend($extend({}, parentContext), context)
				: context)
			: parentContext && $extend({}, parentContext);
	}

	// Get character entity for HTML and Attribute encoding
	function getCharEntity(ch) {
		return charEntities[ch] || (charEntities[ch] = "&#" + ch.charCodeAt(0) + ";");
	}

	//========================== Initialize ==========================

	for (jsvStoreName in jsvStores) {
		registerStore(jsvStoreName, jsvStores[jsvStoreName]);
	}

	var $templates = $views.templates,
		$converters = $views.converters,
		$helpers = $views.helpers,
		$tags = $views.tags,
		$viewsSub = $views.sub,
		$viewsSettings = $views.settings;

	if (jQuery) {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is loaded, so make $ the jQuery object
		$ = jQuery;
		$.fn.render = renderContent;

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ = global.jsviews = {};

		$.isArray = Array && Array.isArray || function(obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		};

	//	//========================== Future Node.js support ==========================
	//	if ((nodeJsModule = global.module) && nodeJsModule.exports) {
	//		nodeJsModule.exports = $;
	//	}
	}

	$.render = $render;
	$.views = $views;
	$.templates = $templates = $views.templates;

	//========================== Register tags ==========================

	$tags({
		"else": function() {}, // Does nothing but ensures {{else}} tags are recognized as valid
		"if": {
			render: function(val) {
				// This function is called once for {{if}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				// If not done (a previous block has not been rendered), look at expression for this block and render the block if expression is truthy
				// Otherwise return ""
				var self = this,
					ret = (self.rendering.done || !val && (arguments.length || !self.tagCtx.index))
						? ""
						: (self.rendering.done = true, self.selected = self.tagCtx.index,
							// Test is satisfied, so render content on current context. We call tagCtx.render() rather than return undefined
							// (which would also render the tmpl/content on the current context but would iterate if it is an array)
							self.tagCtx.render());
				return ret;
			},
			onUpdate: function(ev, eventArgs, tagCtxs) {
				var tci, prevArg, different;
				for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
					prevArg = prevArg.args[0];
					different = !prevArg !== !tagCtxs[tci].args[0];
					if (!!prevArg || different) {
						return different;
						// If newArg and prevArg are both truthy, return false to cancel update. (Even if values on later elses are different, we still don't want to update, since rendered output would be unchanged)
						// If newArg and prevArg are different, return true, to update
						// If newArg and prevArg are both falsey, move to the next {{else ...}}
					}
				}
				// Boolean value of all args are unchanged (falsey), so return false to cancel update
				return false;
			},
			flow: true
		},
		"for": {
			render: function(val) {
				// This function is called once for {{for}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				var self = this,
					tagCtx = self.tagCtx,
					noArg = !arguments.length,
					result = "",
					done = noArg || 0;

				if (!self.rendering.done) {
					if (noArg) {
						result = undefined;
					} else if (val !== undefined) {
						result += tagCtx.render(val);
						// {{for}} (or {{else}}) with no argument will render the block content
						done += $.isArray(val) ? val.length : 1;
					}
					if (self.rendering.done = done) {
						self.selected = tagCtx.index;
					}
					// If nothing was rendered we will look at the next {{else}}. Otherwise, we are done.
				}
				return result;
			},
			//onUpdate: function(ev, eventArgs, tagCtxs) {
				//Consider adding filtering for perf optimization. However the below prevents update on some scenarios which _should_ update - namely when there is another array on which for also depends.
				//var i, l, tci, prevArg;
				//for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
				//	if (prevArg.args[0] !== tagCtxs[tci].args[0]) {
				//		return true;
				//	}
				//}
				//return false;
			//},
			onArrayChange: function(ev, eventArgs) {
				var arrayView,
					self = this,
					change = eventArgs.change;
				if (this.tagCtxs[1] && ( // There is an {{else}}
						   change === "insert" && ev.target.length === eventArgs.items.length // inserting, and new length is same as inserted length, so going from 0 to n
						|| change === "remove" && !ev.target.length // removing , and new length 0, so going from n to 0
						|| change === "refresh" && !eventArgs.oldItems.length !== !ev.target.length // refreshing, and length is going from 0 to n or from n to 0
					)) {
					this.refresh();
				} else {
					for (arrayView in self._.arrVws) {
						arrayView = self._.arrVws[arrayView];
						if (arrayView.data === ev.target) {
							arrayView._.onArrayChange.apply(arrayView, arguments);
						}
					}
				}
				ev.done = true;
			},
			flow: true
		},
		include: {
			flow: true
		},
		"*": {
			// {{* code... }} - Ignored if template.allowCode is false. Otherwise include code in compiled template
			render: function(value) {
				return value; // Include the code.
			},
			flow: true
		}
	});

	//========================== Register converters ==========================

	$converters({
		html: function(text) {
			// HTML encode: Replace < > & and ' and " by corresponding entities.
			return text != undefined ? String(text).replace(rHtmlEncode, getCharEntity) : ""; // null and undefined return ""
		},
		attr: function(text) {
			// Attribute encode: Replace < > & ' and " by corresponding entities.
			return text != undefined ? String(text).replace(rAttrEncode, getCharEntity) : text === null ? null : ""; // null returns null, e.g. to remove attribute. undefined returns ""
		},
		url: function(text) {
			// URL encoding helper.
			return text != undefined ? encodeURI(String(text)) : text === null ? null : ""; // null returns null, e.g. to remove attribute. undefined returns ""
		}
	});

	//========================== Define default delimiters ==========================
	$viewsDelimiters();

})(this, this.jQuery);
;
// Source: src/js/vendor/plugins/makeSafeForCSS.js
/**
 * Makes a string safe for css attributes in html
 *
 * @source http://stackoverflow.com/questions/7627000/javascript-convert-string-to-safe-class-name-for-css
 * @todo Check if this is international character friendly
 * @param {string} name
 * @returns {string} CSS safe string
 */
function makeSafeForCSS(name) {
    if (typeof name === 'undefined') {
        return 'undefined';
    }
    return name.toLowerCase().replace(/[^a-z0-9]/g, function(s) {
        var c = s.charCodeAt(0);
        if (c === 32){
            return '-';
        }
        if (c >= 65 && c <= 90) {
            return '_' + s.toLowerCase();
        }
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
};
// Source: src/js/vendor/plugins/p3.request.js
/**!
 * $.p3.request
 *
 * Query string parser, returns the url and an object
 * containing the GET parameters in key: value format
 *
 * Required in most $.p3 libraries
 *
 * @author          <a href="mailto:hello@raywalker.it">Ray Walker</a>
 * @source          https://github.com/greenpeace/p3_styleguide
 * @version         0.1.1
 * @requires        <a href="http://jquery.com/">jQuery</a>
 * @usage           $.p3.request('http://fish.com?type=salmon');
 * @returns         {object} { url: 'http://fish.com', parameters: { type: 'salmon' } }
 */
(function($) {
var _p3 = $.p3 || {};

    _p3.request = function(url) {
        var request = {
            url: false,
            parameters: false
        },
        parts = [],
            getRequestParams = function() {
                var params = {};
                parts.shift();
                if (parts[0]) {
                    parts.join('?').split(/[&;]/g).forEach(function(param) {
                        var q = param.split(/\=/);
                        if (q.length > 0 && q[0].length) {
                            params[q[0]] = q[1];
                        }
                    });
                }
                return params;
            },
            getRequestURL = function() {
                return (parts[0].length) ? parts[0] : url;
            };

        if (url) {
            parts = url.split('?');
        } else {
            return request;
        }

        request.url = getRequestURL();
        request.parameters = getRequestParams();

        return request;
    };

    $.p3 = _p3;

}(jQuery));

;
// Source: src/js/vendor/jquery/plugins/jquery.jpanelmenu.js
/*!
 * jPanelMenu - CSS Transforms
 * @version 1.3.1-beta
 * @source https://github.com/raywalker-it/jPanelMenu-raywalker
 * @authors Originally by Anthony Colangelo <http://acolangelo.com>,
 *          Ray Walker <geek@raywalker.it>
 * @license MIT
 */
(function($, global, doc) {
    $.jPanelMenu = function(options) {
        var $document = $(doc),
            M = global.Modernizr || false,
            jP = {
            options: $.extend({
                menu: '#menu',
                trigger: '.menu-trigger',
                excludedPanelContent: 'style, script',
                keepEventHandlers: false,
                direction: 'left',
                openPosition: '250px',
                animated: true,
                closeOnContentClick: true,
                keyboardShortcuts: [
                    {
                        code: 27,
                        open: false,
                        close: true
                    },
                    {
                        code: 37,
                        open: false,
                        close: true
                    },
                    {
                        code: 39,
                        open: true,
                        close: true
                    },
                    {
                        code: 77,
                        open: true,
                        close: true
                    }
                ],
                duration: 150,
                openDuration: options.duration || 150,
                closeDuration: options.duration || 150,
                easing: 'ease-in-out',
                openEasing: options.easing || 'ease-in-out',
                closeEasing: options.easing || 'ease-in-out',
                before: function() {
                },
                beforeOpen: function() {
                },
                beforeClose: function() {
                },
                after: function() {
                },
                afterOpen: function() {
                },
                afterClose: function() {
                },
                beforeOn: function() {
                },
                afterOn: function() {
                },
                beforeOff: function() {
                },
                afterOff: function() {
                }
            }, options || {}),
            settings: {
                transitionsSupported: 'WebkitTransition' in doc.body.style ||
                    'MozTransition' in doc.body.style ||
                    'msTransition' in doc.body.style ||
                    'OTransition' in doc.body.style ||
                    'Transition' in doc.body.style,
                transformsSupported: 'WebkitTransform' in doc.body.style ||
                    'MozTransform' in doc.body.style ||
                    'msTransform' in doc.body.style ||
                    'OTransform' in doc.body.style ||
                    'Transform' in doc.body.style,
                cssPrefix: '',
                shiftFixedChildren: false,
                panelPosition: 'relative',
                positionUnits: 'px'
            },
            menu: '#jPanelMenu-menu',
            panel: '.jPanelMenu-panel',
            fixedChildren: [],
            timeouts: {},
            clearTimeouts: function() {
                clearTimeout(jP.timeouts.open);
                clearTimeout(jP.timeouts.afterOpen);
                clearTimeout(jP.timeouts.afterClose);
            },
            setPositionUnits: function() {
                var foundUnit = false,
                    allowedUnits = ['%', 'px', 'em'];

                for (var unitID in allowedUnits) {
                    var unit = allowedUnits[unitID];
                    if (jP.options.openPosition.toString().substr(-unit.length) === unit)
                    {
                        foundUnit = true;
                        jP.settings.positionUnits = unit;
                    }
                }

                if (!foundUnit) {
                    jP.options.openPosition = parseInt(jP.options.openPosition) + jP.settings.positionUnits;
                }
            },
            computePositionStyle: function(open, string) {
                var position = (open) ? jP.options.openPosition : '0' + jP.settings.positionUnits,
                    property = {};
                if (jP.settings.transformsSupported) {
                    var direction = (open && jP.options.direction === 'right') ? '-' : '',
                        translate = 'translate3d(' + direction + position + ',0,0)',
                        transform = 'transform';

                    if (string) {
                        property = '';
                        if (jP.settings.cssPrefix !== '') {
                            property = jP.settings.cssPrefix + transform + ':' + translate + ';';
                        }
                        property += transform + ':' + translate + ';';
                    } else {
                        if (jP.settings.cssPrefix !== '') {
                            property[jP.settings.cssPrefix + transform] = translate;
                        }
                        property[transform] = translate;
                    }
                } else {
                    if (string) {
                        property = '';
                        property = jP.options.direction + ': ' + position + ';';
                    } else {
                        property[jP.options.direction] = position;
                    }
                }
                return property;
            },
            setCSSPrefix: function() {
                jP.settings.cssPrefix = jP.getCSSPrefix();
            },
            checkFixedChildren: function() {
                jP.disableTransitions();

                var defaultPanelStyle = {position: $(jP.panel).css('position')};

                defaultPanelStyle[jP.options.direction] = ($(jP.panel).css(jP.options.direction) === 'auto') ? 0 : $(jP.panel).css(jP.options.direction);

                $(jP.panel).find('> *').each(function() {
                    if ($(this).css('position') === 'fixed' && $(this).css(jP.options.direction) === 'auto') {
                        jP.fixedChildren.push(this);
                    }
                });

                if (jP.fixedChildren.length > 0)
                {
                    var newPanelStyle = {position: 'relative'};

                    newPanelStyle[jP.options.direction] = '1px';
                    jP.setPanelStyle(newPanelStyle);

                    if (parseInt($(jP.fixedChildren[0]).offset().left) === 0) {
                        jP.settings.shiftFixedChildren = true;
                    }
                }

                jP.setPanelStyle(defaultPanelStyle);
            },
            setjPanelMenuStyles: function() {
                var bgColor = '#fff',
                    htmlBG = $('html').css('background-color'),
                    bodyBG = $('body').css('background-color');

                if (bodyBG !== 'transparent' && bodyBG !== "rgba(0, 0, 0, 0)") {
                    bgColor = bodyBG;
                }
                else if (htmlBG !== 'transparent' && htmlBG !== "rgba(0, 0, 0, 0)") {
                    bgColor = htmlBG;
                }
                else {
                    bgColor = '#fff';
                }

                if ($('#jPanelMenu-style-master').length === 0)
                {
                    $('body').append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;' + jP.options.direction + ':0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;' + jP.computePositionStyle(false, true) + 'z-index:2;width:100%;min-height:100%;background:' + bgColor + '}</style>');
                }
            },
            setMenuState: function(open) {
                var position = (open) ? 'open' : 'closed';
                $('body').attr('data-menu-position', position);
            },
            getMenuState: function() {
                return $('body').attr('data-menu-position');
            },
            menuIsOpen: function() {
                if (jP.getMenuState() === 'open') {
                    return true;
                }
                else {
                    return false;
                }
            },
            setMenuStyle: function(styles) {
                $(jP.menu).css(styles);
            },
            setPanelStyle: function(styles) {
                $(jP.panel).css(styles);
            },
            showMenu: function() {
                jP.setMenuStyle({
                    display: 'block'
                });
                jP.setMenuStyle({
                    'z-index': '1'
                });
            },
            hideMenu: function() {
                jP.setMenuStyle({
                    'z-index': '-1'
                });
                jP.setMenuStyle({
                    display: 'none'
                });
            },
            enableTransitions: function(duration, easing) {
                var formattedDuration = duration / 1000;
                var formattedEasing = jP.getCSSEasingFunction(easing);
                jP.disableTransitions();
                $('body').append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{' + jP.settings.cssPrefix + 'transition: all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
            },
            disableTransitions: function() {
                $('#jPanelMenu-style-transitions').remove();
            },
            enableFixedTransitions: function(selector, id, duration, easing) {
                var formattedDuration = duration / 1000,
                    formattedEasing = jP.getCSSEasingFunction(easing);
                jP.disableFixedTransitions(id);
                $('body').append('<style id="jPanelMenu-style-fixed-' + id + '">' + selector + '{' + jP.settings.cssPrefix + 'transition: all ' + formattedDuration + 's ' + formattedEasing + '; transition: all ' + formattedDuration + 's ' + formattedEasing + ';}</style>');
            },
            disableFixedTransitions: function(id) {
                $('#jPanelMenu-style-fixed-' + id).remove();
            },
            getCSSEasingFunction: function(name) {
                switch (name) {
                    case 'linear':
                        return name;

                    case 'ease':
                        return name;

                    case 'ease-in':
                        return name;

                    case 'ease-out':
                        return name;

                    case 'ease-in-out':
                        return name;

                    default:
                        return 'ease-in-out';
                }
            },
            getJSEasingFunction: function(name) {
                switch (name)
                {
                    case 'linear':
                        return name;

                    default:
                        return 'swing';
                }
            },
            getVendorPrefix: function() {
                if (M && M.hasOwnProperty('prefixed')) {
                    return M.prefixed('transform').replace('transform','');
                }

                // Thanks to Lea Verou for this beautiful function. (http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser)
                if ('result' in arguments.callee) {
                    return arguments.callee.result;
                }

                var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                    someScript = doc.getElementsByTagName('script')[0];

                for (var prop in someScript.style)
                {
                    if (regex.test(prop))
                    {
                        arguments.callee.result = prop.match(regex)[0];
                        // test is faster than match, so it's better to perform
                        // that on the lot and match only when necessary
                        return arguments.callee.result;
                    }

                }

                // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
                // However (prop in style) returns the correct value, so we'll have to test for
                // the precence of a specific property
                if ('WebkitOpacity' in someScript.style) {
                    arguments.callee.result = 'Webkit';
                } else if ('KhtmlOpacity' in someScript.style) {
                    arguments.callee.result = 'Khtml';
                } else {
                    arguments.callee.result = '';
                }

                return arguments.callee.result;
            },
            getCSSPrefix: function() {
                var prefix = jP.getVendorPrefix();
                if (prefix !== '') {
                    return '-' + prefix.toLowerCase() + '-';
                }
                return '';
            },
            openMenu: function(animated) {
                if (typeof (animated) === "undefined" || animated === null) {
                    animated = jP.options.animated;
                }

                jP.clearTimeouts();

                jP.options.before();
                jP.options.beforeOpen();

                jP.setMenuState(true);

                jP.setPanelStyle({position: 'relative'});

                jP.showMenu();

                var animationChecks = {
                    none: (!animated) ? true : false,
                    transitions: (animated && jP.settings.transitionsSupported) ? true : false
                };

                if (animationChecks.transitions || animationChecks.none) {
                    if (animationChecks.none) {
                        jP.disableTransitions();
                    }
                    if (animationChecks.transitions) {
                        jP.enableTransitions(jP.options.openDuration, jP.options.openEasing);
                    }

                    var newPanelStyle = jP.computePositionStyle(true);

                    jP.setPanelStyle(newPanelStyle);

                    if (jP.settings.shiftFixedChildren) {
                        $(jP.fixedChildren).each(function() {
                            var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class'),
                                selector = id.replace(' ', '.'),
                                identifier = id.replace(' ', '-'),
                                newChildrenStyle = {};

                            if (animationChecks.none) {
                                jP.disableFixedTransitions(identifier);
                            }
                            if (animationChecks.transitions) {
                                jP.enableFixedTransitions(selector, identifier, jP.options.openDuration, jP.options.openEasing);
                            }

                            newChildrenStyle[jP.options.direction] = jP.options.openPosition;
                            $(this).css(newChildrenStyle);
                        });
                    }

                    jP.timeouts.afterOpen = setTimeout(function() {
                        jP.disableTransitions();
                        if (jP.settings.shiftFixedChildren) {
                            $(jP.fixedChildren).each(function() {
                                var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class');

                                jP.disableFixedTransitions(id.replace(' ', '-'));
                            });
                        }

                        jP.options.after();
                        jP.options.afterOpen();
                        jP.initiateContentClickListeners();
                    }, jP.options.openDuration);
                }
                else {
                    var formattedEasing = jP.getJSEasingFunction(jP.options.openEasing);

                    var animationOptions = {};
                    animationOptions[jP.options.direction] = jP.options.openPosition;
                    $(jP.panel).stop().animate(animationOptions, jP.options.openDuration, formattedEasing, function() {
                        jP.options.after();
                        jP.options.afterOpen();
                        jP.initiateContentClickListeners();
                    });

                    if (jP.settings.shiftFixedChildren) {
                        $(jP.fixedChildren).each(function() {
                            var childrenAnimationOptions = {};
                            childrenAnimationOptions[jP.options.direction] = jP.options.openPosition;
                            $(this).stop().animate(childrenAnimationOptions, jP.options.openDuration, formattedEasing);
                        });
                    }
                }
            },
            closeMenu: function(animated) {
                if (typeof animated === "undefined" || animated === null) {
                    animated = jP.options.animated;
                }

                jP.clearTimeouts();

                jP.options.before();
                jP.options.beforeClose();

                jP.setMenuState(false);

                var animationChecks = {
                    none: (!animated) ? true : false,
                    transitions: (animated && jP.settings.transitionsSupported) ? true : false
                };

                if (animationChecks.transitions || animationChecks.none) {
                    if (animationChecks.none) {
                        jP.disableTransitions();
                    }
                    if (animationChecks.transitions) {
                        jP.enableTransitions(jP.options.closeDuration, jP.options.closeEasing);
                    }

                    var newPanelStyle = jP.computePositionStyle();
                    jP.setPanelStyle(newPanelStyle);

                    if (jP.settings.shiftFixedChildren) {
                        $(jP.fixedChildren).each(function() {
                            var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class'),
                                selector = id.replace(' ', '.'),
                                ident = id.replace(' ', '-'),
                                newChildrenStyle = {};

                            if (animationChecks.none) {
                                jP.disableFixedTransitions(ident);
                            }
                            if (animationChecks.transitions) {
                                jP.enableFixedTransitions(selector, ident, jP.options.closeDuration, jP.options.closeEasing);
                            }

                            newChildrenStyle[jP.options.direction] = 0 + jP.settings.positionUnits;
                            $(this).css(newChildrenStyle);
                        });
                    }

                    jP.timeouts.afterClose = setTimeout(function() {
                        jP.setPanelStyle({position: jP.settings.panelPosition});

                        jP.disableTransitions();
                        if (jP.settings.shiftFixedChildren) {
                            $(jP.fixedChildren).each(function() {
                                var id = $(this).prop("tagName").toLowerCase() + ' ' + $(this).attr('class');

                                jP.disableFixedTransitions(id.replace(' ', '-'));
                            });
                        }

                        jP.hideMenu();
                        jP.options.after();
                        jP.options.afterClose();
                        jP.destroyContentClickListeners();
                    }, jP.options.closeDuration);
                }
                else {
                    var formattedEasing = jP.getJSEasingFunction(jP.options.closeEasing),
                        animationOptions = {};

                    animationOptions[jP.options.direction] = 0 + jP.settings.positionUnits;
                    $(jP.panel).stop().animate(animationOptions, jP.options.closeDuration, formattedEasing, function() {
                        jP.setPanelStyle({position: jP.settings.panelPosition});

                        jP.hideMenu();
                        jP.options.after();
                        jP.options.afterClose();
                        jP.destroyContentClickListeners();
                    });

                    if (jP.settings.shiftFixedChildren) {
                        $(jP.fixedChildren).each(function() {
                            var childrenAnimationOptions = {};

                            childrenAnimationOptions[jP.options.direction] = 0 + jP.settings.positionUnits;
                            $(this).stop().animate(childrenAnimationOptions, jP.options.closeDuration, formattedEasing);
                        });
                    }
                }
            },
            triggerMenu: function(animated) {
                if (jP.menuIsOpen()) {
                    jP.closeMenu(animated);
                }
                else {
                    jP.openMenu(animated);
                }
            },
            initiateClickListeners: function() {
                $document.on('click', jP.options.trigger, function() {
                    jP.triggerMenu(jP.options.animated);
                    return false;
                });
            },
            destroyClickListeners: function() {
                $document.off('click', jP.options.trigger, null);
            },
            initiateContentClickListeners: function() {
                if (!jP.options.closeOnContentClick){
                    return false;}

                $document.on('click', jP.panel, function() {
                    if (jP.menuIsOpen()) {
                        jP.closeMenu(jP.options.animated);
                    }
                });

                $document.on('touchend', jP.panel, function() {
                    if (jP.menuIsOpen()) {
                        jP.closeMenu(jP.options.animated);
                    }
                });
            },
            destroyContentClickListeners: function() {
                if (!jP.options.closeOnContentClick) {
                    return false;
                }

                $document.off('click', jP.panel, null);
                $document.off('touchend', jP.panel, null);
            },
            initiateKeyboardListeners: function() {
                var preventKeyListeners = ['input', 'textarea'];
                $document.on('keydown', function(e) {
                    var target = $(e.target),
                        prevent = false;
                    $.each(preventKeyListeners, function() {
                        if (target.is(this.toString())) {
                            prevent = true;
                        }
                    });
                    if (prevent) {
                        return true;
                    }

                    for (var mapping in jP.options.keyboardShortcuts) {
                        if (e.which === jP.options.keyboardShortcuts[mapping].code) {
                            var key = jP.options.keyboardShortcuts[mapping];

                            if (key.open && key.close) {
                                jP.triggerMenu(jP.options.animated);
                            }
                            else if ((key.open && !key.close) && !jP.menuIsOpen()) {
                                jP.openMenu(jP.options.animated);
                            }
                            else if ((!key.open && key.close) && jP.menuIsOpen()) {
                                jP.closeMenu(jP.options.animated);
                            }

                            return false;
                        }
                    }
                });
            },
            destroyKeyboardListeners: function() {
                $document.off('keydown', null);
            },
            setupMarkup: function() {
                $('html').addClass('jPanelMenu');
                $('body > *').not(jP.menu + ', ' + jP.options.excludedPanelContent).wrapAll('<div class="' + jP.panel.replace('.', '') + '"/>');
                $(jP.options.menu).clone(jP.options.keepEventHandlers).attr('id', jP.menu.replace('#', '')).insertAfter('body > ' + jP.panel);
            },
            resetMarkup: function() {
                $('html').removeClass('jPanelMenu');
                $('body > ' + jP.panel + ' > *').unwrap();
                $(jP.menu).remove();
            },
            init: function() {
                jP.options.beforeOn();

                jP.setPositionUnits();
                jP.setCSSPrefix();
                jP.initiateClickListeners();
                if (Object.prototype.toString.call(jP.options.keyboardShortcuts) === '[object Array]') {
                    jP.initiateKeyboardListeners();
                }

                jP.setjPanelMenuStyles();
                jP.setMenuState(false);
                jP.setupMarkup();

                jP.setMenuStyle({width: jP.options.openPosition});

                if (!jP.settings.transformsSupported) {
                    jP.checkFixedChildren();
                }

                jP.closeMenu(false);

                jP.options.afterOn();
            },
            destroy: function() {
                jP.options.beforeOff();

                jP.closeMenu();
                jP.destroyClickListeners();
                if (Object.prototype.toString.call(jP.options.keyboardShortcuts) === '[object Array]') {
                    jP.destroyKeyboardListeners();
                }

                jP.resetMarkup();
                var childrenStyles = {};
                childrenStyles[jP.options.direction] = 'auto';
                $(jP.fixedChildren).each(function() {
                    $(this).css(childrenStyles);
                });
                jP.fixedChildren = [];

                jP.options.afterOff();
            }
        };

        return {
            on: jP.init,
            off: jP.destroy,
            trigger: jP.triggerMenu,
            open: jP.openMenu,
            close: jP.closeMenu,
            isOpen: jP.menuIsOpen,
            menu: jP.menu,
            getMenu: function() {
                return $(jP.menu);
            },
            panel: jP.panel,
            getPanel: function() {
                return $(jP.panel);
            }
        };
    };
})(jQuery, this, document);