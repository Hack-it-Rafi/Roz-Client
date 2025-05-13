import { useCallback } from 'react';
import html2canvas from 'html2canvas';

interface ScreenshotButtonProps {
  buttonText?: string;
  className?: string;
}

const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({
  buttonText = 'Take Screenshot2',
  className = 'bg-blue-500 text-white px-4 py-2 rounded-md',
}) => {
  const captureScreenshot = useCallback(async () => {
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY, // Adjust for scrolled position
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'full-page-screenshot.png';
      link.click();
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  }, []);

  return (
    <button onClick={captureScreenshot} className={className}>
      {buttonText}
    </button>
  );
};

export default ScreenshotButton;