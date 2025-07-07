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
declare const ReactImageMagnifyNew: React.FC<ReactImageMagnifyProps>;
export default ReactImageMagnifyNew;
