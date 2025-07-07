type MagnifierShape = 'circle' | 'rounded-rectangle' | 'rectangle';
declare const useMagnifierShape: () => {
    magnifierShape: MagnifierShape;
    handleContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
export default useMagnifierShape;
