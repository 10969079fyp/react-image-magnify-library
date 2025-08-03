import React from 'react';
import ReactImageMagnify from './ReactImageMagnify';

const ReactImageMagnifyAITest: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ReactImageMagnify AI Captioning Test</h1>
      <p>Hover over the image below to see the AI-generated caption for the magnified portion.</p>
      
      <div style={{ marginTop: '20px' }}>
        <ReactImageMagnify
          smallImageSrc="https://images.unsplash.com/photo-1500964757620-d4f749d289e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
          largeImageSrc="https://images.unsplash.com/photo-1500964757620-d4f749d289e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          magnifierHeight={300}
          magnifierWidth={300}
          zoomLevel={2}
          alt="Mountain landscape"
          showCaptions={true}
          captionModelUrl="https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
          style={{ border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h2>How to Test AI Captioning</h2>
        <ol>
          <li>Hover your mouse over the image above</li>
          <li>Move your mouse to different parts of the image</li>
          <li>Observe the caption that appears below the magnifier</li>
          <li>The caption should describe the content of the magnified area</li>
        </ol>
        
        <h3>Troubleshooting</h3>
        <ul>
          <li>If you see "Loading caption..." for more than a few seconds, check your internet connection</li>
          <li>If you see "Failed to get caption", verify the model URL is correct</li>
          <li>Check the browser console for detailed error messages</li>
          <li>For production use, add your Hugging Face API token</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactImageMagnifyAITest;
