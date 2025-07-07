import { CSSProperties, FC } from 'react';
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
declare const ReactImageMagnify: FC<ReactImageMagnifyProps>;
export default ReactImageMagnify;
