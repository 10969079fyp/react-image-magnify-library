import * as React from 'react';
import React__default, { useState, useEffect, useRef } from 'react';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = !0;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return !1;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = !0),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = !0;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: !0
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = !0),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: !1,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: !1, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = !0));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React = React__default,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        !1,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        !0,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

function getTouchDistance(touches) {
    const [touch1, touch2] = [touches[0], touches[1]];
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
function getBorderRadius(shape) {
    switch (shape) {
        case 'circle':
            return '50%';
        case 'rounded-rectangle':
            return '15px';
        default:
            return '50%';
    }
}

function handleContextMenu(e, setMagnifierShape) {
    e.preventDefault();
    setMagnifierShape((prev) => {
        if (prev === 'circle')
            return 'rounded-rectangle';
        return 'circle';
    });
}
function handleRightClick(e, imgRef, lastRightClickTime, toggleFullScreen) {
    if (e.button !== 2)
        return; // Only right click
    e.preventDefault();
    if (e.target !== imgRef.current) {
        return;
    }
    const now = Date.now();
    if (now - lastRightClickTime.current < 300) {
        // Double right click detected on image
        toggleFullScreen();
    }
    lastRightClickTime.current = now;
}
function handleMouseMove(e, params) {
    const { imgRef, isFullScreen, zoomMode, setShowMagnifier, setMagnifierX, setMagnifierY } = params;
    if (!imgRef.current || isFullScreen)
        return;
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    if (x < 0 || y < 0 || x > width || y > height) {
        if (!zoomMode) {
            setShowMagnifier(false);
        }
        return;
    }
    if (!zoomMode) {
        setShowMagnifier(true);
    }
    setMagnifierX(x);
    setMagnifierY(y);
}
function handleMouseLeave(params) {
    const { zoomMode, setShowMagnifier, isFullScreen } = params;
    if (!zoomMode && !isFullScreen) {
        setShowMagnifier(false);
    }
}
function handleDoubleClick(e, params) {
    const { imgRef, initialZoomLevel, setZoomMode, setShowMagnifier, setZoomLevel } = params;
    if (params.isFullScreen)
        return;
    if (e.button !== 0)
        return; // Only left click double click
    e.preventDefault();
    setZoomMode((prev) => {
        const newZoomMode = !prev;
        if (!newZoomMode) {
            setShowMagnifier(false);
            setZoomLevel(initialZoomLevel);
        }
        else {
            if (imgRef.current) {
                const { top, left } = imgRef.current.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                params.setMagnifierX(x);
                params.setMagnifierY(y);
                setShowMagnifier(true);
            }
        }
        return newZoomMode;
    });
}
function handleWheel(e, params) {
    const { zoomMode, isFullScreen, setZoomLevel } = params;
    if (!zoomMode || isFullScreen)
        return;
    e.preventDefault();
    const delta = -e.deltaY || e.detail || e.wheelDelta;
    setZoomLevel((prev) => {
        let newZoom = prev + (delta > 0 ? 0.1 : -0.1);
        if (newZoom < 1)
            newZoom = 1;
        if (newZoom > 5)
            newZoom = 5;
        return newZoom;
    });
}
function handleTouchStart(e, lastTouchDistance) {
    if (e.touches.length === 2) {
        const dist = getTouchDistance(e.touches);
        lastTouchDistance.current = dist;
    }
}
function handleTouchMove(e, params) {
    if (e.touches.length === 2 && params.lastTouchDistance.current !== null) {
        const dist = getTouchDistance(e.touches);
        const delta = dist - params.lastTouchDistance.current;
        if (Math.abs(delta) > 5) { // threshold to avoid noise
            params.setZoomLevel((prev) => {
                let newZoom = prev + (delta > 0 ? 0.1 : -0.1);
                if (newZoom < 1)
                    newZoom = 1;
                if (newZoom > 5)
                    newZoom = 5;
                return newZoom;
            });
            params.lastTouchDistance.current = dist;
        }
        e.preventDefault();
    }
}
function handleTouchEnd(e, lastTouchDistance) {
    if (e.touches.length < 2) {
        lastTouchDistance.current = null;
    }
}
function handleTouchTap(e, params) {
    if (params.isFullScreen)
        return;
    const now = Date.now();
    if (now - params.lastTap.current < 300) {
        // double tap ignored, only single tap toggles zoom mode
        return;
    }
    params.lastTap.current = now;
    params.setZoomMode((prev) => {
        const newZoomMode = !prev;
        if (!newZoomMode) {
            params.setShowMagnifier(false);
            params.setZoomLevel(params.initialZoomLevel);
        }
        else {
            if (params.imgRef.current) {
                const rect = params.imgRef.current.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                params.setMagnifierX(x);
                params.setMagnifierY(y);
                params.setShowMagnifier(true);
            }
        }
        return newZoomMode;
    });
}

const ReactImageMagnifyAICaption = ({ imgRef, magnifierX, magnifierY, magnifierWidth, magnifierHeight, zoomLevel, captionModelUrl, huggingFaceToken, style, showCaptions = true, }) => {
    const [caption, setCaption] = useState('Loading caption...');
    // Function to extract cropped image portion as base64
    const getCroppedImageBase64 = () => {
        if (!imgRef.current)
            return null;
        const img = imgRef.current;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const displayedWidth = img.width;
        const displayedHeight = img.height;
        // Calculate scale between natural and displayed image
        const scaleX = naturalWidth / displayedWidth;
        const scaleY = naturalHeight / displayedHeight;
        // Calculate the actual size of the magnified area in the natural image
        const magnifiedWidth = magnifierWidth / zoomLevel;
        const magnifiedHeight = magnifierHeight / zoomLevel;
        // Calculate crop area in natural image coordinates (centered on magnifier position)
        const cropX = Math.max(0, (magnifierX * scaleX) - (magnifiedWidth * scaleX) / 2);
        const cropY = Math.max(0, (magnifierY * scaleY) - (magnifiedHeight * scaleY) / 2);
        const cropWidth = Math.min(magnifiedWidth * scaleX, naturalWidth - cropX);
        const cropHeight = Math.min(magnifiedHeight * scaleY, naturalHeight - cropY);
        // Create canvas to draw cropped image
        const canvas = document.createElement('canvas');
        canvas.width = magnifiedWidth;
        canvas.height = magnifiedHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return null;
        // Draw the cropped portion, scaling it to fit the canvas
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, magnifiedWidth, magnifiedHeight);
        // Get base64 data URL
        return canvas.toDataURL('image/jpeg');
    };
    // Function to simulate or call AI caption API
    const fetchCaption = async (imageBase64) => {
        if (!captionModelUrl) {
            // Placeholder: simulate caption generation with a timeout
            setCaption('Describing image...');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCaption('AI caption: A zoomed-in view of the image.');
            return;
        }
        try {
            // Check if we have a valid base64 image
            if (!imageBase64 || !imageBase64.startsWith('data:image')) {
                setCaption('Unable to process image data');
                return;
            }
            const headers = {
                'Content-Type': 'application/json',
            };
            // Add authorization header if token is provided
            if (huggingFaceToken) {
                headers['Authorization'] = `Bearer ${huggingFaceToken}`;
            }
            // The Hugging Face Inference API expects the image as base64 string without data URI prefix
            const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
            // Validate base64 data
            if (!base64Data) {
                setCaption('Invalid image data');
                return;
            }
            // Log the request for debugging
            console.log('Sending request to caption model:', {
                url: captionModelUrl,
                hasToken: !!huggingFaceToken,
                imageDataLength: base64Data.length
            });
            // Try direct fetch first
            let response = await fetch(captionModelUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({ inputs: base64Data }),
            });
            // Log the response status for debugging
            console.log('Caption API response status:', response.status);
            // If we get a CORS error or network error, try a different approach
            if (response.status === 0) {
                console.warn('Possible CORS or network issue detected. Trying alternative approach...');
                setCaption('CORS/network issue. Check console for details.');
                return;
            }
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Caption API error:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText,
                    url: captionModelUrl
                });
                // Handle specific error cases
                if (response.status === 400) {
                    setCaption('Invalid request. Check model URL.');
                }
                else if (response.status === 401) {
                    setCaption('Unauthorized. Check API token.');
                }
                else if (response.status === 403) {
                    setCaption('Access denied. Check API token permissions.');
                }
                else if (response.status === 404) {
                    setCaption('Model not found. Check model URL.');
                }
                else if (response.status === 429) {
                    setCaption('Rate limit exceeded. Try again later.');
                }
                else if (response.status >= 500) {
                    setCaption('Server error. Try again later.');
                }
                else {
                    setCaption(`Failed to get caption: ${response.status} ${response.statusText}`);
                }
                return;
            }
            const data = await response.json();
            // Log the response data for debugging
            console.log('Caption API response data:', data);
            // Handle various response formats from Hugging Face models
            let captionText = 'No caption available';
            if (typeof data === 'string') {
                captionText = data;
            }
            else if (Array.isArray(data)) {
                // Handle array responses (most common)
                if (data.length > 0) {
                    if (typeof data[0] === 'string') {
                        captionText = data[0];
                    }
                    else if (data[0].generated_text) {
                        captionText = data[0].generated_text;
                    }
                    else if (data[0].caption) {
                        captionText = data[0].caption;
                    }
                    else if (typeof data[0] === 'object' && data[0] !== null) {
                        // Handle object in array
                        const obj = data[0];
                        if (obj.generated_text) {
                            captionText = obj.generated_text;
                        }
                        else if (obj.caption) {
                            captionText = obj.caption;
                        }
                        else {
                            captionText = 'No recognizable caption in response';
                        }
                    }
                    else {
                        captionText = 'Unexpected response format';
                    }
                }
            }
            else if (typeof data === 'object' && data !== null) {
                // Handle object responses
                if (data.generated_text) {
                    captionText = data.generated_text;
                }
                else if (data.caption) {
                    captionText = data.caption;
                }
                else if (data[0] && data[0].generated_text) {
                    captionText = data[0].generated_text;
                }
                else if (data[0] && data[0].caption) {
                    captionText = data[0].caption;
                }
                else {
                    captionText = 'Unexpected response format';
                }
            }
            else {
                captionText = 'Unexpected response type';
            }
            setCaption(captionText);
        }
        catch (error) {
            console.error('Error fetching caption:', error);
            // Handle specific error types
            if (error instanceof TypeError && error.message.includes('fetch')) {
                setCaption('Network error. Check your connection.');
            }
            else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                setCaption('CORS error or network issue.');
            }
            else {
                setCaption(`Error fetching caption: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    };
    useEffect(() => {
        // Only fetch caption when captions are enabled, magnifier is shown, and we have valid coordinates
        if (showCaptions && magnifierX > 0 && magnifierY > 0 && magnifierWidth > 0 && magnifierHeight > 0) {
            const imageBase64 = getCroppedImageBase64();
            if (imageBase64) {
                fetchCaption(imageBase64);
            }
            else {
                setCaption('Unable to process image');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [magnifierX, magnifierY, magnifierWidth, magnifierHeight, zoomLevel, captionModelUrl, showCaptions]);
    return (jsxRuntimeExports.jsx("div", { style: style, children: caption }));
};

const ReactImageMagnifyDisplay = ({ showMagnifier, isFullScreen, magnifierHeight, magnifierWidth, magnifierX, magnifierY, zoomLevel, smallImageSrc, largeImageSrc, alt, magnifierShape, showCaptions = false, captionModelUrl, imgRef, }) => {
    const backgroundImage = largeImageSrc && !isFullScreen ? largeImageSrc : smallImageSrc;
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [showMagnifier && !isFullScreen && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { style: {
                            position: 'absolute',
                            pointerEvents: 'none',
                            height: magnifierHeight,
                            width: magnifierWidth,
                            top: magnifierY - magnifierHeight / 2,
                            left: magnifierX - magnifierWidth / 2,
                            borderRadius: getBorderRadius(magnifierShape),
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
                            backgroundColor: 'white',
                            backgroundImage: `url('${backgroundImage}')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: (zoomLevel && magnifierX && magnifierY) ? `calc(100% * ${zoomLevel}) calc(100% * ${zoomLevel})` : 'auto',
                            backgroundPositionX: `-${magnifierX * zoomLevel - magnifierWidth / 2}px`,
                            backgroundPositionY: `-${magnifierY * zoomLevel - magnifierHeight / 2}px`,
                            border: '1px solid #ccc',
                            zIndex: 9999,
                        } }), showCaptions && imgRef && (jsxRuntimeExports.jsx(ReactImageMagnifyAICaption, { imgRef: imgRef, magnifierX: magnifierX, magnifierY: magnifierY, magnifierWidth: magnifierWidth, magnifierHeight: magnifierHeight, zoomLevel: zoomLevel, captionModelUrl: captionModelUrl, showCaptions: showCaptions, style: {
                            position: 'absolute',
                            top: magnifierY + magnifierHeight / 2 + 5,
                            left: magnifierX - magnifierWidth / 2,
                            width: magnifierWidth,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            color: '#333',
                            fontSize: '0.9rem',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                            zIndex: 10000,
                            pointerEvents: 'none',
                            textAlign: 'center',
                        } }))] })), isFullScreen && (jsxRuntimeExports.jsx("img", { src: smallImageSrc, alt: alt, style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'contain',
                    zIndex: 10000,
                    cursor: 'none',
                    backgroundColor: 'black',
                }, onClick: () => {
                    // Fullscreen exit handled in parent component
                } }))] }));
};

const ReactImageMagnify = (props) => {
    const { smallImageSrc, largeImageSrc, magnifierHeight = 250, magnifierWidth = 250, zoomLevel: initialZoomLevel = 2, alt = '', className, style, showCaptions = false, captionModelUrl, } = props;
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierX, setMagnifierX] = useState(0);
    const [magnifierY, setMagnifierY] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);
    const [zoomMode, setZoomMode] = useState(false);
    const [magnifierShape, setMagnifierShape] = useState('circle');
    const [largeImageLoaded, setLargeImageLoaded] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const lastTouchDistance = useRef(null);
    const lastRightClickTime = useRef(0);
    const lastTap = useRef(0);
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (containerRef.current) {
                containerRef.current.requestFullscreen().then(() => {
                    setIsFullScreen(true);
                }).catch((err) => {
                    console.error('Error attempting to enable full-screen mode:', err);
                });
            }
        }
        else {
            document.exitFullscreen().then(() => {
                setIsFullScreen(false);
            }).catch((err) => {
                console.error('Error attempting to exit full-screen mode:', err);
            });
        }
    };
    useEffect(() => {
        const onFullScreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
            }
        };
        document.addEventListener('fullscreenchange', onFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', onFullScreenChange);
        };
    }, []);
    useEffect(() => {
        if ((showMagnifier || zoomMode) && largeImageSrc && !largeImageLoaded) {
            const img = new Image();
            img.src = largeImageSrc;
            img.onload = () => setLargeImageLoaded(true);
        }
    }, [showMagnifier, zoomMode, largeImageSrc, largeImageLoaded]);
    return (jsxRuntimeExports.jsxs("div", { "data-testid": "react-image-magnify", ref: containerRef, style: { position: 'relative', display: 'inline-block', cursor: isFullScreen ? 'none' : undefined, ...style }, className: className, onMouseMove: (e) => handleMouseMove(e, {
            imgRef,
            isFullScreen,
            zoomMode,
            setShowMagnifier,
            setMagnifierX,
            setMagnifierY,
            setZoomLevel,
            setZoomMode,
            setMagnifierShape,
            magnifierShape,
            initialZoomLevel,
            lastTouchDistance,
            lastRightClickTime,
            lastTap,
            toggleFullScreen,
            containerRef,
        }), onMouseLeave: () => handleMouseLeave({
            zoomMode,
            setShowMagnifier,
            isFullScreen,
            setMagnifierX,
            setMagnifierY,
            setZoomLevel,
            setZoomMode,
            setMagnifierShape,
            magnifierShape,
            initialZoomLevel,
            lastTouchDistance,
            lastRightClickTime,
            lastTap,
            toggleFullScreen,
            imgRef,
            containerRef,
        }), onDoubleClick: (e) => handleDoubleClick(e, {
            imgRef,
            isFullScreen,
            zoomMode,
            setShowMagnifier,
            setMagnifierX,
            setMagnifierY,
            setZoomLevel,
            setZoomMode,
            setMagnifierShape,
            magnifierShape,
            initialZoomLevel,
            lastTouchDistance,
            lastRightClickTime,
            lastTap,
            toggleFullScreen,
            containerRef,
        }), onWheel: (e) => handleWheel(e, {
            zoomMode,
            isFullScreen,
            setZoomLevel,
            setShowMagnifier,
            setMagnifierX,
            setMagnifierY,
            setZoomMode,
            setMagnifierShape,
            magnifierShape,
            initialZoomLevel,
            lastTouchDistance,
            lastRightClickTime,
            lastTap,
            toggleFullScreen,
            imgRef,
            containerRef,
        }), onContextMenu: (e) => handleContextMenu(e, setMagnifierShape), onMouseDown: (e) => handleRightClick(e, imgRef, lastRightClickTime, toggleFullScreen), onTouchStart: (e) => {
            handleTouchStart(e, lastTouchDistance);
            handleTouchTap(e, {
                imgRef,
                isFullScreen,
                zoomMode,
                setShowMagnifier,
                setMagnifierX,
                setMagnifierY,
                setZoomLevel,
                setZoomMode,
                setMagnifierShape,
                magnifierShape,
                initialZoomLevel,
                lastTouchDistance,
                lastRightClickTime,
                lastTap,
                toggleFullScreen,
                containerRef,
            });
        }, onTouchMove: (e) => handleTouchMove(e, {
            imgRef,
            isFullScreen,
            zoomMode,
            setShowMagnifier,
            setMagnifierX,
            setMagnifierY,
            setZoomLevel,
            setZoomMode,
            setMagnifierShape,
            magnifierShape,
            initialZoomLevel,
            lastTouchDistance,
            lastRightClickTime,
            lastTap,
            toggleFullScreen,
            containerRef,
        }), onTouchEnd: (e) => handleTouchEnd(e, lastTouchDistance), children: [jsxRuntimeExports.jsx("img", { src: smallImageSrc, alt: alt, ref: imgRef, style: { display: 'block', width: '100%', height: 'auto', cursor: zoomMode ? 'zoom-out' : 'zoom-in' } }), jsxRuntimeExports.jsx(ReactImageMagnifyDisplay, { showMagnifier: showMagnifier, isFullScreen: isFullScreen, magnifierHeight: magnifierHeight, magnifierWidth: magnifierWidth, magnifierX: magnifierX, magnifierY: magnifierY, zoomLevel: zoomLevel, smallImageSrc: smallImageSrc, largeImageSrc: largeImageSrc, alt: alt, magnifierShape: magnifierShape, showCaptions: showCaptions, captionModelUrl: captionModelUrl, imgRef: imgRef })] }));
};

const ReactImageMagnifier = (props) => {
    const { smallImageSrc, largeImageSrc, magnifierHeight = 250, magnifierWidth = 250, zoomLevel: initialZoomLevel = 2, alt = '', className, style, } = props;
    const [showMagnifier, setShowMagnifier] = React.useState(false);
    const [magnifierX, setMagnifierX] = React.useState(0);
    const [magnifierY, setMagnifierY] = React.useState(0);
    const [zoomLevel, setZoomLevel] = React.useState(initialZoomLevel);
    const [zoomMode, setZoomMode] = React.useState(false);
    const imgRef = React.useRef(null);
    const handleMouseMove = (e) => {
        if (!imgRef.current)
            return;
        const { top, left, width, height } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        if (x < 0 || y < 0 || x > width || y > height) {
            if (!zoomMode) {
                setShowMagnifier(false);
            }
            return;
        }
        if (!zoomMode) {
            setShowMagnifier(true);
        }
        setMagnifierX(x);
        setMagnifierY(y);
    };
    const handleMouseLeave = () => {
        if (!zoomMode) {
            setShowMagnifier(false);
        }
    };
    const handleDoubleClick = (e) => {
        e.preventDefault();
        setZoomMode((prev) => {
            const newZoomMode = !prev;
            if (!newZoomMode) {
                setShowMagnifier(false);
                setZoomLevel(initialZoomLevel);
            }
            else {
                if (imgRef.current) {
                    const { top, left } = imgRef.current.getBoundingClientRect();
                    const x = e.clientX - left;
                    const y = e.clientY - top;
                    setMagnifierX(x);
                    setMagnifierY(y);
                    setShowMagnifier(true);
                }
            }
            return newZoomMode;
        });
    };
    const handleWheel = (e) => {
        if (!zoomMode)
            return;
        e.preventDefault();
        const delta = -e.deltaY || e.detail || e.wheelDelta;
        setZoomLevel((prev) => {
            let newZoom = prev + (delta > 0 ? 0.1 : -0.1);
            if (newZoom < 1)
                newZoom = 1;
            if (newZoom > 5)
                newZoom = 5;
            return newZoom;
        });
    };
    const backgroundImage = largeImageSrc || smallImageSrc;
    return (jsxRuntimeExports.jsxs("div", { style: { position: 'relative', display: 'inline-block', ...style }, className: className, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onDoubleClick: handleDoubleClick, onWheel: handleWheel, children: [jsxRuntimeExports.jsx("img", { src: smallImageSrc, alt: alt, ref: imgRef, style: { display: 'block', width: '100%', height: 'auto', cursor: zoomMode ? 'zoom-out' : 'zoom-in' } }), showMagnifier && (jsxRuntimeExports.jsx("div", { style: {
                    position: 'absolute',
                    pointerEvents: 'none',
                    height: magnifierHeight,
                    width: magnifierWidth,
                    top: magnifierY - magnifierHeight / 2,
                    left: magnifierX - magnifierWidth / 2,
                    borderRadius: '50%',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.2)',
                    backgroundColor: 'white',
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${imgRef.current?.width * zoomLevel}px ${imgRef.current?.height * zoomLevel}px`,
                    backgroundPositionX: `-${magnifierX * zoomLevel - magnifierWidth / 2}px`,
                    backgroundPositionY: `-${magnifierY * zoomLevel - magnifierHeight / 2}px`,
                    border: '1px solid #ccc',
                    zIndex: 9999,
                } }))] }));
};

const ReactImageMagnifyAITest = () => {
    return (jsxRuntimeExports.jsxs("div", { style: { padding: '20px', maxWidth: '800px', margin: '0 auto' }, children: [jsxRuntimeExports.jsx("h1", { children: "ReactImageMagnify AI Captioning Test" }), jsxRuntimeExports.jsx("p", { children: "Hover over the image below to see the AI-generated caption for the magnified portion." }), jsxRuntimeExports.jsx("div", { style: { marginTop: '20px' }, children: jsxRuntimeExports.jsx(ReactImageMagnify, { smallImageSrc: "https://images.unsplash.com/photo-1500964757620-d4f749d289e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", largeImageSrc: "https://images.unsplash.com/photo-1500964757620-d4f749d289e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", magnifierHeight: 300, magnifierWidth: 300, zoomLevel: 2, alt: "Mountain landscape", showCaptions: true, captionModelUrl: "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base", style: { border: '1px solid #ccc', borderRadius: '4px' } }) }), jsxRuntimeExports.jsxs("div", { style: { marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }, children: [jsxRuntimeExports.jsx("h2", { children: "How to Test AI Captioning" }), jsxRuntimeExports.jsxs("ol", { children: [jsxRuntimeExports.jsx("li", { children: "Hover your mouse over the image above" }), jsxRuntimeExports.jsx("li", { children: "Move your mouse to different parts of the image" }), jsxRuntimeExports.jsx("li", { children: "Observe the caption that appears below the magnifier" }), jsxRuntimeExports.jsx("li", { children: "The caption should describe the content of the magnified area" })] }), jsxRuntimeExports.jsx("h3", { children: "Troubleshooting" }), jsxRuntimeExports.jsxs("ul", { children: [jsxRuntimeExports.jsx("li", { children: "If you see \"Loading caption...\" for more than a few seconds, check your internet connection" }), jsxRuntimeExports.jsx("li", { children: "If you see \"Failed to get caption\", verify the model URL is correct" }), jsxRuntimeExports.jsx("li", { children: "Check the browser console for detailed error messages" }), jsxRuntimeExports.jsx("li", { children: "For production use, add your Hugging Face API token" })] })] })] }));
};

export { ReactImageMagnifier, ReactImageMagnify, ReactImageMagnifyAITest };
//# sourceMappingURL=index.esm.js.map
