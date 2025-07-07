import React, { useState, useEffect, useRef, CSSProperties, FC, MouseEvent, WheelEvent, TouchEvent } from 'react';
import {
  handleContextMenu,
  handleRightClick,
  handleMouseMove,
  handleMouseLeave,
  handleDoubleClick,
  handleWheel,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleTouchTap,
} from './ReactImageMagnifyEventHandlers';
import ReactImageMagnifyDisplay from './ReactImageMagnifyDisplay';
import { MagnifierShape } from './ReactImageMagnifyUtils';

interface ReactImageMagnifyProps {
  smallImageSrc: string;
  largeImageSrc?: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  showCaptions?: boolean;
  captionModelUrl?: string;
}

const ReactImageMagnify: FC<ReactImageMagnifyProps> = (props) => {
  const {
    smallImageSrc,
    largeImageSrc,
    magnifierHeight = 250,
    magnifierWidth = 250,
    zoomLevel: initialZoomLevel = 2,
    alt = '',
    className,
    style,
    showCaptions = false,
    captionModelUrl,
  } = props;

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierX, setMagnifierX] = useState(0);
  const [magnifierY, setMagnifierY] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);
  const [zoomMode, setZoomMode] = useState(false);
  const [magnifierShape, setMagnifierShape] = useState<MagnifierShape>('circle');
  const [largeImageLoaded, setLargeImageLoaded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastTouchDistance = useRef<number | null>(null);
  const lastRightClickTime = useRef<number>(0);
  const lastTap = useRef<number>(0);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullScreen(true);
        }).catch((err) => {
          console.error('Error attempting to enable full-screen mode:', err);
        });
      }
    } else {
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

  return (
    <div
      data-testid="react-image-magnify"
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block', cursor: isFullScreen ? 'none' : undefined, ...style }}
      className={className}
      onMouseMove={(e) =>
        handleMouseMove(e, {
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
        })
      }
      onMouseLeave={() =>
        handleMouseLeave({
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
        })
      }
      onDoubleClick={(e) =>
        handleDoubleClick(e, {
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
        })
      }
      onWheel={(e) =>
        handleWheel(e, {
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
        })
      }
      onContextMenu={(e) => handleContextMenu(e, setMagnifierShape)}
      onMouseDown={(e) => handleRightClick(e, imgRef, lastRightClickTime, toggleFullScreen)}
      onTouchStart={(e) => {
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
      }}
      onTouchMove={(e) =>
        handleTouchMove(e, {
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
        })
      }
      onTouchEnd={(e) => handleTouchEnd(e, lastTouchDistance)}
    >
      <img
        src={smallImageSrc}
        alt={alt}
        ref={imgRef}
        style={{ display: 'block', width: '100%', height: 'auto', cursor: zoomMode ? 'zoom-out' : 'zoom-in' }}
      />
      <ReactImageMagnifyDisplay
        showMagnifier={showMagnifier}
        isFullScreen={isFullScreen}
        magnifierHeight={magnifierHeight}
        magnifierWidth={magnifierWidth}
        magnifierX={magnifierX}
        magnifierY={magnifierY}
        zoomLevel={zoomLevel}
        smallImageSrc={smallImageSrc}
        largeImageSrc={largeImageSrc}
        alt={alt}
        magnifierShape={magnifierShape}
        showCaptions={showCaptions}
        captionModelUrl={captionModelUrl}
        imgRef={imgRef}
      />
    </div>
  );
};

export default ReactImageMagnify;
