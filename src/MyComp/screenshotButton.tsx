import { useCallback } from 'react';
import html2canvas from 'html2canvas';

interface ScreenshotButtonProps {
  buttonText?: string;
  className?: string;
  onScreenshot: (dataUrl: string) => void; // Callback to pass screenshot URL
}

const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({
  buttonText = 'Take Screenshot',
  className = 'bg-blue-500 text-white px-4 py-2 rounded-md',
  onScreenshot,
}) => {
  const captureScreenshot = useCallback(async () => {
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      const dataURL = canvas.toDataURL('image/png');
      onScreenshot(dataURL);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  }, [onScreenshot]);

  return (
    <button onClick={captureScreenshot} className={className}>
      {buttonText}
    </button>
  );
};

export default ScreenshotButton;