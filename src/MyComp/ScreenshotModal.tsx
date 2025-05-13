interface ScreenshotModalProps {
  screenshotUrl: string | null; // Data URL of the screenshot
  onClose: () => void; // Close the modal
  onConfirm: () => void; // Redirect function for "Looks Good"
}

const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  screenshotUrl,
  onClose,
  onConfirm,
}) => {
  if (!screenshotUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Screenshot Preview</h2>
        <img
          src={screenshotUrl}
          alt="Page Screenshot"
          className="w-full h-auto mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Wait a Minute
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Looks Good
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotModal;