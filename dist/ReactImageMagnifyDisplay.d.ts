import React from 'react';
import { MagnifierShape } from './ReactImageMagnifyUtils';
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
declare const ReactImageMagnifyDisplay: React.FC<MagnifierDisplayProps>;
export default ReactImageMagnifyDisplay;
