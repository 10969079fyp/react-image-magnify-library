# AI Captioning Feature - Usage Guide

## Overview

The AI captioning feature in the React Image Magnify library allows you to generate descriptive captions for magnified portions of images using machine learning models. This guide will help you set up and use this feature correctly.

## Prerequisites

1. A Hugging Face account and API token
2. Access to a compatible image captioning model (e.g., Salesforce/blip-image-captioning-base)

## Setup Instructions

### 1. Get Your Hugging Face API Token

1. Sign up at [Hugging Face](https://huggingface.co/)
2. Go to your profile settings
3. Navigate to "Access Tokens"
4. Create a new token with "Read" permissions
5. Copy the token for use in your application

### 2. Choose a Captioning Model

Recommended models:

- `Salesforce/blip-image-captioning-base` (Free tier compatible)
- `Salesforce/blip2-opt-2.7b` (More accurate but requires PRO subscription)

### 3. Configure the Component

```tsx
import React from "react";
import ReactImageMagnify from "react-image-magnify-lib";

const App = () => {
  return (
    <div>
      <h1>ReactImageMagnify with AI Captioning</h1>
      <ReactImageMagnify
        smallImageSrc="https://example.com/your-image.jpg"
        largeImageSrc="https://example.com/your-large-image.jpg"
        magnifierHeight={300}
        magnifierWidth={300}
        zoomLevel={2}
        alt="Example Image"
        showCaptions={true}
        captionModelUrl="https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
        huggingFaceToken="YOUR_HUGGING_FACE_API_TOKEN"
      />
    </div>
  );
};

export default App;
```

## Troubleshooting Common Issues

### 1. "Loading caption..." Never Changes

This usually indicates an API connection issue:

- Check your internet connection
- Verify your Hugging Face token is correct
- Ensure your token has the necessary permissions
- Check the browser console for error messages

### 2. "Failed to get caption" Error

This indicates an API error:

- Check if your model URL is correct
- Verify your token has access to the model
- Some models require a PRO subscription for inference

### 3. "No caption available" Message

This means the API returned a successful response but without caption text:

- Try a different model
- Check the model documentation for expected response format

## Testing the Feature

### Using the Free Tier Model

For testing, you can use the free tier model without a token:

```tsx
<ReactImageMagnify
  smallImageSrc="https://example.com/your-image.jpg"
  largeImageSrc="https://example.com/your-large-image.jpg"
  showCaptions={true}
  captionModelUrl="https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
/>
```

### Using a Custom Model

If you have a custom model:

```tsx
<ReactImageMagnify
  smallImageSrc="https://example.com/your-image.jpg"
  largeImageSrc="https://example.com/your-large-image.jpg"
  showCaptions={true}
  captionModelUrl="https://api-inference.huggingface.co/models/your-username/your-model-name"
  huggingFaceToken="YOUR_HUGGING_FACE_API_TOKEN"
/>
```

## How It Works

1. When you hover over the image, the magnifier appears
2. The component captures the magnified portion of the image
3. The captured image is converted to base64 format
4. The base64 image is sent to the Hugging Face API
5. The AI model processes the image and returns a caption
6. The caption is displayed below the magnifier

## Performance Considerations

- Captions are only generated when the magnifier is visible
- The component caches captions to avoid repeated API calls
- Large images may take longer to process
- Consider using smaller magnifier sizes for faster processing

## Customization

You can customize the caption appearance by modifying the style prop in ReactImageMagnifyDisplay.tsx:

```tsx
style={{
  position: 'absolute',
  top: magnifierY + magnifierHeight / 2 + 5,
  left: magnifierX - magnifierWidth / 2,
  width: magnifierWidth,
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color
  color: '#333', // Text color
  fontSize: '0.9rem', // Font size
  padding: '4px 8px', // Padding
  borderRadius: '4px', // Border radius
  boxShadow: '0 0 4px rgba(0,0,0,0.2)', // Shadow
  zIndex: 10000,
  pointerEvents: 'none',
  textAlign: 'center',
}}
```

## Debugging

Enable debugging by checking the browser console for:

1. Request logs showing the API calls
2. Response logs showing the API responses
3. Error logs showing any issues

You can also temporarily add console.log statements to track the flow:

```javascript
console.log("Sending request to caption model:", {
  url: captionModelUrl,
  hasToken: !!huggingFaceToken,
  imageDataLength: base64Data.length,
});
```

## Limitations

1. Requires internet connection for API calls
2. May be rate-limited by Hugging Face
3. Processing time depends on image size and model complexity
4. Some models require paid subscriptions for full access
