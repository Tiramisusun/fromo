import { useState, useRef, useEffect } from 'react';

interface DragDividerProps {
  onHeightChange: (mapHeightPercent: number) => void;
  initialMapHeight: number;
}

export function DragDivider({ onHeightChange, initialMapHeight }: DragDividerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const screenHeight = window.innerHeight;
      const topBarHeight = 56;
      const bottomNavHeight = 64;
      const availableHeight = screenHeight - topBarHeight - bottomNavHeight;

      const newMapHeight = ((e.clientY - topBarHeight) / availableHeight) * 100;
      const clampedHeight = Math.max(25, Math.min(75, newMapHeight));

      onHeightChange(clampedHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const screenHeight = window.innerHeight;
      const topBarHeight = 56;
      const bottomNavHeight = 64;
      const availableHeight = screenHeight - topBarHeight - bottomNavHeight;

      const touch = e.touches[0];
      const newMapHeight = ((touch.clientY - topBarHeight) / availableHeight) * 100;
      const clampedHeight = Math.max(25, Math.min(75, newMapHeight));

      onHeightChange(clampedHeight);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, onHeightChange]);

  return (
    <div
      ref={dividerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      className="relative h-6 flex items-center justify-center cursor-ns-resize bg-white border-t border-b border-gray-200 active:bg-gray-50"
    >
      <div className="w-10 h-1 bg-gray-300 rounded-full" />
    </div>
  );
}
