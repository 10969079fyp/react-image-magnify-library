# AI Caption Troubleshooting Guide

## Understanding "Failed to get image caption"

When you see "Failed to get image caption" while hovering over an image, it means the component was unable to retrieve a caption from the AI service. This guide will help you identify and resolve the issue.

## Common Causes and Solutions

### 1. **Missing or Invalid API Token**

**Symptoms:**

- Error message: "Unauthorized. Check API token." or "Access denied. Check API token permissions."
- Console shows 401 or 403 errors

**Solution:**

1. Sign up at [Hugging Face](https://huggingface.co/)
2. Go to your profile → Settings → Access Tokens
3. Create a new token with "Read" permissions
4. Add the token to your component:

```tsx
<ReactImageMagnify
  smallImageSrc="https://example.com/image.jpg"
  largeImageSrc="https://example.com/large-image.jpg"
  showCaptions={true}
  captionModelUrl="https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
  huggingFaceToken="YOUR_ACTUAL_HUGGING_FACE_API_TOKEN"
/>
```

### 2. **Incorrect Model URL**

**Symptoms:**

- Error message: "Model not found. Check model URL." or "Invalid request. Check model URL."
- Console shows 404 or 400 errors

**Solution:**
Use a valid, publicly available model URL:

```tsx
// Recommended free models:
captionModelUrl =
  "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";

// Alternative models (may require PRO subscription):
captionModelUrl =
  "https://api-inference.huggingface.co/models/Salesforce/blip2-opt-2.7b";
captionModelUrl =
  "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning";
```

### 3. **CORS (Cross-Origin Resource Sharing) Issues**

**Symptoms:**

- Error message: "CORS error or network issue."
- Console shows network errors or blocked requests
- Response status is 0

**Solution:**
CORS issues are common when making direct browser requests to external APIs. Here are several approaches:

#### Option A: Use a CORS Proxy (Development Only)

```tsx
// For development/testing only - not recommended for production
captionModelUrl =
  "https://cors-anywhere.herokuapp.com/https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";
```

#### Option B: Set Up Your Own Proxy Server

Create a simple Node.js proxy:

```javascript
// server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api/caption",
  createProxyMiddleware({
    target: "https://api-inference.huggingface.co",
    changeOrigin: true,
    pathRewrite: {
      "^/api/caption": "/models/Salesforce/blip-image-captioning-base",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("Authorization", "Bearer YOUR_HUGGING_FACE_TOKEN");
    },
  })
);

app.listen(3001);
```

Then use in your component:

```tsx
captionModelUrl = "http://localhost:3001/api/caption";
```

### 4. **Network Connectivity Issues**

**Symptoms:**

- Error message: "Network error. Check your connection."
- Console shows network errors

**Solution:**

1. Check your internet connection
2. Verify that you can access the Hugging Face API directly in your browser
3. Try accessing: https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base
4. Check if your firewall or network policies are blocking the request

### 5. **Rate Limiting**

**Symptoms:**

- Error message: "Rate limit exceeded. Try again later."
- Console shows 429 errors

**Solution:**

1. Wait a few minutes before trying again
2. Use your own Hugging Face API token (free tier has higher limits)
3. Implement request throttling in your application

### 6. **Model Overload**

**Symptoms:**

- Error message: "Server error. Try again later."
- Console shows 500+ errors

**Solution:**

1. Wait a few minutes before trying again
2. Try a different model
3. Use your own Hugging Face API token for better reliability

## Debugging Steps

### 1. Check Browser Console

Open your browser's developer tools (F12) and look at the Console tab for detailed error messages.

### 2. Verify Component Props

Ensure your component has the correct props:

```tsx
<ReactImageMagnify
  smallImageSrc="https://example.com/image.jpg" // Must be a valid image URL
  largeImageSrc="https://example.com/large-image.jpg" // Optional but recommended
  showCaptions={true} // Must be true to enable captions
  captionModelUrl="https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base" // Must be a valid model URL
  huggingFaceToken="YOUR_TOKEN" // Optional for free models, required for better reliability
/>
```

### 3. Test with a Simple Example

Try this minimal example first:

```tsx
import React from "react";
import { ReactImageMagnifyAITest } from "react-image-magnify-lib";

const TestPage = () => {
  return (
    <div>
      <h1>AI Caption Test</h1>
      <ReactImageMagnifyAITest />
    </div>
  );
};

export default TestPage;
```

### 4. Check Image URLs

Ensure your image URLs are accessible and return valid images:

- They should start with http:// or https://
- They should be publicly accessible
- They should return image content (not HTML or error pages)

## Best Practices

### 1. Use Your Own API Token

Even for free models, using your own token provides:

- Higher rate limits
- Better reliability
- Detailed usage statistics

### 2. Handle Errors Gracefully

The component now provides specific error messages. You can customize the error display:

```tsx
// In ReactImageMagnifyAICaption.tsx, you can modify error messages:
setCaption("Custom error message for your use case");
```

### 3. Test with Different Models

If one model isn't working, try alternatives:

- Salesforce/blip-image-captioning-base (Recommended free option)
- nlpconnect/vit-gpt2-image-captioning (Alternative free option)
- Salesforce/blip2-opt-2.7b (More accurate but may require PRO)

### 4. Monitor Console Logs

The component now provides detailed logging. Check the browser console for:

- Request details (URL, token status, image data size)
- Response status codes
- Response data format
- Error details

## Advanced Troubleshooting

### 1. Manual API Testing

Test the Hugging Face API directly using curl:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_HUGGING_FACE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"inputs":"base64_encoded_image_data"}' \
  https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base
```

### 2. Check Image Processing

Verify that the canvas cropping is working correctly by adding debug logs:

```javascript
// In getCroppedImageBase64 function, add:
console.log("Image dimensions:", {
  naturalWidth: naturalWidth,
  naturalHeight: naturalHeight,
  displayedWidth: displayedWidth,
  displayedHeight: displayedHeight,
});
```

### 3. Validate Base64 Data

Ensure the image is being converted to base64 correctly:

```javascript
// In fetchCaption function, add:
console.log("Base64 data preview:", base64Data.substring(0, 100) + "...");
```

## Still Having Issues?

If you've tried all the above solutions and are still experiencing problems:

1. Share the exact error message from the browser console
2. Provide your component configuration
3. Specify which model URL you're using
4. Mention whether you're using an API token

This information will help identify the specific issue and provide a targeted solution.
