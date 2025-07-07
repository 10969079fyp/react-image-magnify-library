# react-image-magnify-lib

A React image magnify component library compatible with React 19. This library provides an easy-to-use image magnification component that supports magnifying images on hover, with additional features like double-click zoom mode and scroll wheel zoom adjustment.

## Features

- Magnify images on hover with a magnifier lens.
- Double-click to toggle zoom mode.
- Adjust zoom level using the mouse scroll wheel in zoom mode.
- Supports small and large image sources for better quality zoom.
- Toggle magnifier lens shape between circle and rounded rectangle via context menu.
- Fullscreen toggle on double right-click.
- Touch gesture support including pinch-to-zoom and tap to toggle zoom mode.
- AI-generated captions for magnified image portions.
- Fully compatible with React 19.
- Easy to install and use in any React project.

## Installation

You can install the library via npm (once published) or link it locally for development:

```bash
npm install react-image-magnify-lib
```

Or for local development, link the library folder:

```bash
npm install /path/to/react-image-magnify-lib
```

## Usage

This library provides two main components for image magnification: `ReactImageMagnify` and `ReactImageMagnifier`.

### ReactImageMagnify

This is the full-featured component with advanced capabilities including fullscreen toggle, magnifier shape toggle, touch gesture support, and AI-generated captions.

```tsx
import React from "react";
import ReactImageMagnify from "./src/ReactImageMagnify";

const App = () => {
  return (
    <div>
      <h1>ReactImageMagnify Example</h1>
      <ReactImageMagnify
        smallImageSrc="https://via.placeholder.com/400"
        largeImageSrc="https://via.placeholder.com/1200"
        magnifierHeight={250}
        magnifierWidth={250}
        zoomLevel={2}
        alt="Example Image"
        showCaptions={true}
        captionModelUrl="https://api-inference.huggingface.co/models/your-model"
      />
    </div>
  );
};

export default App;
```

### ReactImageMagnifier

This is a simpler component with basic magnification on hover, double-click zoom mode, and scroll wheel zoom adjustment. It uses a fixed circular magnifier lens and does not support fullscreen, shape toggle, touch gestures, or AI captions.

```tsx
import React from "react";
import ReactImageMagnifier from "./src/ReactImageMagnifier";

const App = () => {
  return (
    <div>
      <h1>ReactImageMagnifier Example</h1>
      <ReactImageMagnifier
        smallImageSrc="https://via.placeholder.com/400"
        largeImageSrc="https://via.placeholder.com/1200"
        magnifierHeight={250}
        magnifierWidth={250}
        zoomLevel={2}
        alt="Example Image"
      />
    </div>
  );
};

export default App;
```

### When to Use Which Component

- Use **ReactImageMagnify** if you need advanced features like fullscreen mode, magnifier shape toggle, touch gesture support, and AI-generated captions.
- Use **ReactImageMagnifier** if you want a lightweight, simple magnification component with basic zoom functionality.

### Props

| Prop              | Type    | Default | Description                                   |
| ----------------- | ------- | ------- | --------------------------------------------- |
| `smallImageSrc`   | string  | -       | URL of the small image to display             |
| `largeImageSrc`   | string  | -       | URL of the large image used for magnification |
| `magnifierHeight` | number  | 150     | Height of the magnifier lens in pixels        |
| `magnifierWidth`  | number  | 150     | Width of the magnifier lens in pixels         |
| `zoomLevel`       | number  | 2       | Initial zoom level multiplier                 |
| `alt`             | string  | ''      | Alt text for the image                        |
| `className`       | string  | -       | Optional CSS class for the container          |
| `style`           | object  | -       | Optional inline styles for the container      |
| `showCaptions`    | boolean | false   | Enable AI-generated captions                  |
| `captionModelUrl` | string  | -       | URL of the AI caption model API               |

## Development

To build the library locally:

```bash
npm install
npm run build
```

This will generate the bundled files in the `dist` folder.

## Testing the Library

A minimal React 19 test app is included in the `react-image-magnify-lib-test` directory. To run the test app:

```bash
cd react-image-magnify-lib-test
npm install
npm run dev
```

Open in your browser to interact with the image magnify component.

## License

MIT License

## Author

OPARE MARTIN
