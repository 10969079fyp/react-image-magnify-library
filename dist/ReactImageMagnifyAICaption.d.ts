import React, { CSSProperties } from 'react';
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
declare const ReactImageMagnifyAICaption: React.FC<ReactImageMagnifyAICaptionProps>;
export default ReactImageMagnifyAICaption;
