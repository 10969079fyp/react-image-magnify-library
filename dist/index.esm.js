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

const ReactImageMagnifyAICaption = ({ imgRef, magnifierX, magnifierY, magnifierWidth, magnifierHeight, zoomLevel, captionModelUrl, huggingFaceToken, style, }) => {
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
        // Calculate crop area in natural image coordinates for entire magnified portion
        const cropWidth = Math.min((magnifierWidth / zoomLevel) * scaleX, naturalWidth);
        const cropHeight = Math.min((magnifierHeight / zoomLevel) * scaleY, naturalHeight);
        const cropX = Math.max(0, (magnifierX * scaleX) - cropWidth / 2);
        const cropY = Math.max(0, (magnifierY * scaleY) - cropHeight / 2);
        // Create canvas to draw cropped image
        const canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return null;
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
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
            const headers = {};
            if (huggingFaceToken) {
                headers['Authorization'] = `Bearer ${huggingFaceToken}`;
            }
            headers['Content-Type'] = 'application/octet-stream';
            // The Hugging Face Inference API expects the image as base64 string without data URI prefix
            const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
            // Convert base64 string to Uint8Array
            const binaryString = atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const response = await fetch(captionModelUrl, {
                method: 'POST',
                headers,
                body: bytes,
            });
            if (!response.ok) {
                setCaption('Failed to get caption');
                return;
            }
            const data = await response.json();
            // The BLIP model returns the caption as a string directly or in a field
            if (typeof data === 'string') {
                setCaption(data);
            }
            else if (data && data[0] && data[0].generated_text) {
                setCaption(data[0].generated_text);
            }
            else if (data.caption) {
                setCaption(data.caption);
            }
            else {
                setCaption('No caption available');
            }
        }
        catch (error) {
            setCaption('Error fetching caption');
        }
    };
    useEffect(() => {
        const imageBase64 = getCroppedImageBase64();
        if (imageBase64) {
            fetchCaption(imageBase64);
        }
        else {
            setCaption('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [magnifierX, magnifierY, magnifierWidth, magnifierHeight, zoomLevel]);
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
                        } }), showCaptions && imgRef && (jsxRuntimeExports.jsx(ReactImageMagnifyAICaption, { imgRef: imgRef, magnifierX: magnifierX, magnifierY: magnifierY, magnifierWidth: magnifierWidth, magnifierHeight: magnifierHeight, zoomLevel: zoomLevel, captionModelUrl: captionModelUrl, style: {
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

export { ReactImageMagnifier, ReactImageMagnify };
//# sourceMappingURL=index.esm.js.map
