import React, { useEffect, useState, CSSProperties } from 'react';

interface ReactImageMagnifyAICaptionProps {
  imgRef: React.RefObject<HTMLImageElement | null>;
  magnifierX: number;
  magnifierY: number;
  magnifierWidth: number;
  magnifierHeight: number;
  zoomLevel: number;
  captionModelUrl?: string;
  huggingFaceToken?: string;
  style?: CSSProperties;
  showCaptions?: boolean;
}

const ReactImageMagnifyAICaption: React.FC<ReactImageMagnifyAICaptionProps> = ({
  imgRef,
  magnifierX,
  magnifierY,
  magnifierWidth,
  magnifierHeight,
  zoomLevel,
  captionModelUrl,
  huggingFaceToken,
  style,
  showCaptions = true,
}) => {
  const [caption, setCaption] = useState<string>('Loading caption...');

  // Function to extract cropped image portion as base64
  const getCroppedImageBase64 = (): string | null => {
    if (!imgRef.current) return null;

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
    if (!ctx) return null;

    // Draw the cropped portion, scaling it to fit the canvas
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      magnifiedWidth,
      magnifiedHeight
    );

    // Get base64 data URL
    return canvas.toDataURL('image/jpeg');
  };

  // Function to simulate or call AI caption API
  const fetchCaption = async (imageBase64: string) => {
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

      const headers: Record<string, string> = {
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
        } else if (response.status === 401) {
          setCaption('Unauthorized. Check API token.');
        } else if (response.status === 403) {
          setCaption('Access denied. Check API token permissions.');
        } else if (response.status === 404) {
          setCaption('Model not found. Check model URL.');
        } else if (response.status === 429) {
          setCaption('Rate limit exceeded. Try again later.');
        } else if (response.status >= 500) {
          setCaption('Server error. Try again later.');
        } else {
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
      } else if (Array.isArray(data)) {
        // Handle array responses (most common)
        if (data.length > 0) {
          if (typeof data[0] === 'string') {
            captionText = data[0];
          } else if (data[0].generated_text) {
            captionText = data[0].generated_text;
          } else if (data[0].caption) {
            captionText = data[0].caption;
          } else if (typeof data[0] === 'object' && data[0] !== null) {
            // Handle object in array
            const obj = data[0];
            if (obj.generated_text) {
              captionText = obj.generated_text;
            } else if (obj.caption) {
              captionText = obj.caption;
            } else {
              captionText = 'No recognizable caption in response';
            }
          } else {
            captionText = 'Unexpected response format';
          }
        }
      } else if (typeof data === 'object' && data !== null) {
        // Handle object responses
        if (data.generated_text) {
          captionText = data.generated_text;
        } else if (data.caption) {
          captionText = data.caption;
        } else if (data[0] && data[0].generated_text) {
          captionText = data[0].generated_text;
        } else if (data[0] && data[0].caption) {
          captionText = data[0].caption;
        } else {
          captionText = 'Unexpected response format';
        }
      } else {
        captionText = 'Unexpected response type';
      }

      setCaption(captionText);
    } catch (error) {
      console.error('Error fetching caption:', error);
      
      // Handle specific error types
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setCaption('Network error. Check your connection.');
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setCaption('CORS error or network issue.');
      } else {
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
      } else {
        setCaption('Unable to process image');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnifierX, magnifierY, magnifierWidth, magnifierHeight, zoomLevel, captionModelUrl, showCaptions]);

  return (
    <div style={style}>
      {caption}
    </div>
  );
};

export default ReactImageMagnifyAICaption;
