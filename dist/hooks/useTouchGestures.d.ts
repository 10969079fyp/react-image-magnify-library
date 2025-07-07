interface TouchGestureHandlers {
    handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
    handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
    handleTouchTap: (e: React.TouchEvent<HTMLDivElement>) => void;
}
declare const useTouchGestures: (zoomMode: boolean, setZoomMode: React.Dispatch<React.SetStateAction<boolean>>, setShowMagnifier: React.Dispatch<React.SetStateAction<boolean>>, setZoomLevel: React.Dispatch<React.SetStateAction<number>>, initialZoomLevel: number, imgRef: React.RefObject<HTMLImageElement>) => TouchGestureHandlers;
export default useTouchGestures;
