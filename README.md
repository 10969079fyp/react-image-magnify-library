# react-image-magnify-lib

A React image magnify component library compatible with React 19. This library provides an easy-to-use image magnification component that supports magnifying images on hover, with additional features like double-click zoom mode and scroll wheel zoom adjustment.

## Features

- Magnify images on hover with a magnifier lens.
- Double-click to toggle zoom mode.
- Adjust zoom level using the mouse scroll wheel in zoom mode.
- Supports small and large image sources for better quality zoom.
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

Import the component and use it in your React app:

```tsx
import React from "react";
import { ReactImageMagnifyNew } from "react-image-magnify-lib";

const App = () => {
  return (
    <div>
      <h1>Image Magnify Example</h1>
      <ReactImageMagnifyNew
        smallImageSrc="https://via.placeholder.com/400"
        largeImageSrc="https://via.placeholder.com/1200"
        magnifierHeight={200}
        magnifierWidth={200}
        zoomLevel={2}
        alt="Example Image"
      />
    </div>
  );
};

export default App;
```

### Props

| Prop              | Type   | Default | Description                                   |
| ----------------- | ------ | ------- | --------------------------------------------- |
| `smallImageSrc`   | string | -       | URL of the small image to display             |
| `largeImageSrc`   | string | -       | URL of the large image used for magnification |
| `magnifierHeight` | number | 150     | Height of the magnifier lens in pixels        |
| `magnifierWidth`  | number | 150     | Width of the magnifier lens in pixels         |
| `zoomLevel`       | number | 2       | Initial zoom level multiplier                 |
| `alt`             | string | ''      | Alt text for the image                        |
| `className`       | string | -       | Optional CSS class for the container          |
| `style`           | object | -       | Optional inline styles for the container      |

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

Open [http://localhost:3001](http://localhost:3001) in your browser to interact with the image magnify component.

## License

MIT License

## Author

OPARE MARTIN
