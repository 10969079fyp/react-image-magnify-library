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
    if (!ctx) return null;

    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
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
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (huggingFaceToken) {
        headers['Authorization'] = `Bearer ${huggingFaceToken}`;
      }

      // The Hugging Face Inference API expects the image as base64 string without data URI prefix
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      const response = await fetch(captionModelUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ inputs: base64Data }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Caption API error:', errorText);
        setCaption('Failed to get caption');
        return;
      }
      const data = await response.json();

      // The BLIP model returns the caption as a string directly or in a field
      if (typeof data === 'string') {
        setCaption(data);
      } else if (data && data[0] && data[0].generated_text) {
        setCaption(data[0].generated_text);
      } else if (data.caption) {
        setCaption(data.caption);
      } else if (data[0] && data[0].generated_text) {
        setCaption(data[0].generated_text);
      } else {
        setCaption('No caption available');
      }
    } catch (error) {
      console.error('Error fetching caption:', error);
      setCaption('Error fetching caption');
    }
  };

  useEffect(() => {
    const imageBase64 = getCroppedImageBase64();
    if (imageBase64) {
      fetchCaption(imageBase64);
    } else {
      setCaption('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnifierX, magnifierY, magnifierWidth, magnifierHeight, zoomLevel]);

  return (
    <div style={style}>
      {caption}
    </div>
  );
};

export default ReactImageMagnifyAICaption;
