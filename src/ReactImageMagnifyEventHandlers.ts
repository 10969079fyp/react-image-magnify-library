import React, { MouseEvent, WheelEvent, TouchEvent, RefObject } from 'react';
import { MagnifierShape, getTouchDistance } from './ReactImageMagnifyUtils';

interface EventHandlerParams {
  imgRef: RefObject<HTMLImageElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  setShowMagnifier: React.Dispatch<React.SetStateAction<boolean>>;
  setMagnifierX: React.Dispatch<React.SetStateAction<number>>;
  setMagnifierY: React.Dispatch<React.SetStateAction<number>>;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  setZoomMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMagnifierShape: React.Dispatch<React.SetStateAction<MagnifierShape>>;
  zoomMode: boolean;
  initialZoomLevel: number;
  magnifierShape: MagnifierShape;
  isFullScreen: boolean;
  lastTouchDistance: React.MutableRefObject<number | null>;
  lastRightClickTime: React.MutableRefObject<number>;
  lastTap: React.MutableRefObject<number>;
  toggleFullScreen: () => void;
}

export function handleContextMenu(e: MouseEvent<HTMLDivElement>, setMagnifierShape: React.Dispatch<React.SetStateAction<MagnifierShape>>) {
  e.preventDefault();
  setMagnifierShape((prev) => {
    if (prev === 'circle') return 'rounded-rectangle';
    return 'circle';
  });
}

export function handleRightClick(e: MouseEvent<HTMLDivElement>, imgRef: RefObject<HTMLImageElement | null>, lastRightClickTime: React.MutableRefObject<number>, toggleFullScreen: () => void) {
  if (e.button !== 2) return; // Only right click
  e.preventDefault();
  if (e.target !== imgRef.current) {
    return;
  }
  const now = Date.now();
  if (now - lastRightClickTime.current < 300) {
    // Double right click detected on image
    toggleFullScreen();
  }
  lastRightClickTime.current = now;
}

export function handleMouseMove(e: MouseEvent<HTMLDivElement>, params: EventHandlerParams) {
  const { imgRef, isFullScreen, zoomMode, setShowMagnifier, setMagnifierX, setMagnifierY } = params;
  if (!imgRef.current || isFullScreen) return;

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
}

export function handleMouseLeave(params: EventHandlerParams) {
  const { zoomMode, setShowMagnifier, isFullScreen } = params;
  if (!zoomMode && !isFullScreen) {
    setShowMagnifier(false);
  }
}

export function handleDoubleClick(e: MouseEvent<HTMLDivElement>, params: EventHandlerParams) {
  const { imgRef, initialZoomLevel, setZoomMode, setShowMagnifier, setZoomLevel } = params;
  if (params.isFullScreen) return;
  if (e.button !== 0) return; // Only left click double click
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
        params.setMagnifierX(x);
        params.setMagnifierY(y);
        setShowMagnifier(true);
      }
    }
    return newZoomMode;
  });
}

export function handleWheel(e: WheelEvent<HTMLDivElement>, params: EventHandlerParams) {
  const { zoomMode, isFullScreen, setZoomLevel } = params;
  if (!zoomMode || isFullScreen) return;

  e.preventDefault();
  const delta = -e.deltaY || e.detail || (e as any).wheelDelta;
  setZoomLevel((prev) => {
    let newZoom = prev + (delta > 0 ? 0.1 : -0.1);
    if (newZoom < 1) newZoom = 1;
    if (newZoom > 5) newZoom = 5;
    return newZoom;
  });
}

export function handleTouchStart(e: TouchEvent<HTMLDivElement>, lastTouchDistance: React.MutableRefObject<number | null>) {
  if (e.touches.length === 2) {
    const dist = getTouchDistance(e.touches);
    lastTouchDistance.current = dist;
  }
}

export function handleTouchMove(e: TouchEvent<HTMLDivElement>, params: EventHandlerParams) {
  if (e.touches.length === 2 && params.lastTouchDistance.current !== null) {
    const dist = getTouchDistance(e.touches);
    const delta = dist - params.lastTouchDistance.current;
    if (Math.abs(delta) > 5) { // threshold to avoid noise
      params.setZoomLevel((prev) => {
        let newZoom = prev + (delta > 0 ? 0.1 : -0.1);
        if (newZoom < 1) newZoom = 1;
        if (newZoom > 5) newZoom = 5;
        return newZoom;
      });
      params.lastTouchDistance.current = dist;
    }
    e.preventDefault();
  }
}

export function handleTouchEnd(e: TouchEvent<HTMLDivElement>, lastTouchDistance: React.MutableRefObject<number | null>) {
  if (e.touches.length < 2) {
    lastTouchDistance.current = null;
  }
}

export function handleTouchTap(e: TouchEvent<HTMLDivElement>, params: EventHandlerParams) {
  if (params.isFullScreen) return;
  const now = Date.now();
  if (now - params.lastTap.current < 300) {
    // double tap ignored, only single tap toggles zoom mode
    return;
  }
  params.lastTap.current = now;
  params.setZoomMode((prev) => {
    const newZoomMode = !prev;
    if (!newZoomMode) {
      params.setShowMagnifier(false);
      params.setZoomLevel(params.initialZoomLevel);
    } else {
      if (params.imgRef.current) {
        const rect = params.imgRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        params.setMagnifierX(x);
        params.setMagnifierY(y);
        params.setShowMagnifier(true);
      }
    }
    return newZoomMode;
  });
}
