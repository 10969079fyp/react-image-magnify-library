import * as React from 'react';

interface ReactImageMagnifyProps {
  smallImageSrc: string;
  largeImageSrc?: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ReactImageMagnifier: React.FC<ReactImageMagnifyProps> = (props) => {
  const {
    smallImageSrc,
    largeImageSrc,
    magnifierHeight = 250,
    magnifierWidth = 250,
    zoomLevel: initialZoomLevel = 2,
    alt = '',
    className,
    style,
  } = props;

  const [showMagnifier, setShowMagnifier] = React.useState(false);
  const [magnifierX, setMagnifierX] = React.useState(0);
  const [magnifierY, setMagnifierY] = React.useState(0);
  const [zoomLevel, setZoomLevel] = React.useState(initialZoomLevel);
  const [zoomMode, setZoomMode] = React.useState(false);

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;

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

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setZoomMode((prev) => {
      const newZoomMode = !prev;
      if (!newZoomMode) {
        setShowMagnifier(false);
        setZoomLevel(initialZoomLevel);
      } else {
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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!zoomMode) return;

    e.preventDefault();
    const delta = -e.deltaY || e.detail || (e as any).wheelDelta;
    setZoomLevel((prev) => {
      let newZoom = prev + (delta > 0 ? 0.1 : -0.1);
      if (newZoom < 1) newZoom = 1;
      if (newZoom > 5) newZoom = 5;
      return newZoom;
    });
  };

  const backgroundImage = largeImageSrc || smallImageSrc;

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', ...style }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onWheel={handleWheel}
    >
      <img
        src={smallImageSrc}
        alt={alt}
        ref={imgRef}
        style={{ display: 'block', width: '100%', height: 'auto', cursor: zoomMode ? 'zoom-out' : 'zoom-in' }}
      />
      {showMagnifier && (
        <div
          style={{
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
            backgroundSize: `${imgRef.current?.width! * zoomLevel}px ${
              imgRef.current?.height! * zoomLevel
            }px`,
            backgroundPositionX: `-${magnifierX * zoomLevel - magnifierWidth / 2}px`,
            backgroundPositionY: `-${magnifierY * zoomLevel - magnifierHeight / 2}px`,
            border: '1px solid #ccc',
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default ReactImageMagnifier;











