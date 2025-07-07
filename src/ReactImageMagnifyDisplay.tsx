import React, { CSSProperties, FC } from 'react';
import { MagnifierShape, getBorderRadius } from './ReactImageMagnifyUtils';
import ReactImageMagnifyAICaption from './ReactImageMagnifyAICaption';

interface MagnifierDisplayProps {
  showMagnifier: boolean;
  isFullScreen: boolean;
  magnifierHeight: number;
  magnifierWidth: number;
  magnifierX: number;
  magnifierY: number;
  zoomLevel: number;
  smallImageSrc: string;
  largeImageSrc?: string;
  alt: string;
  magnifierShape: MagnifierShape;
  showCaptions?: boolean;
  captionModelUrl?: string;
  imgRef?: React.RefObject<HTMLImageElement | null>;
}

const ReactImageMagnifyDisplay: React.FC<MagnifierDisplayProps> = ({
  showMagnifier,
  isFullScreen,
  magnifierHeight,
  magnifierWidth,
  magnifierX,
  magnifierY,
  zoomLevel,
  smallImageSrc,
  largeImageSrc,
  alt,
  magnifierShape,
  showCaptions = false,
  captionModelUrl,
  imgRef,
}) => {
  const backgroundImage = largeImageSrc && !isFullScreen ? largeImageSrc : smallImageSrc;

  return (
    <>
      {showMagnifier && !isFullScreen && (
        <>
          <div
            style={{
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
            }}
          />
          {showCaptions && imgRef && (
            <ReactImageMagnifyAICaption
              imgRef={imgRef}
              magnifierX={magnifierX}
              magnifierY={magnifierY}
              magnifierWidth={magnifierWidth}
              magnifierHeight={magnifierHeight}
              zoomLevel={zoomLevel}
              captionModelUrl={captionModelUrl}
              style={{
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
              }}
            />
          )}
        </>
      )}
      {isFullScreen && (
        <img
          src={smallImageSrc}
          alt={alt}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'contain',
            zIndex: 10000,
            cursor: 'none',
            backgroundColor: 'black',
          }}
          onClick={() => {
            // Fullscreen exit handled in parent component
          }}
        />
      )}
    </>
  );
};

export default ReactImageMagnifyDisplay;
