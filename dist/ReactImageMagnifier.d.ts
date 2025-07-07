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
declare const ReactImageMagnifier: React.FC<ReactImageMagnifyProps>;
export default ReactImageMagnifier;
