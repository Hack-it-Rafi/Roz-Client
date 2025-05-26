import { useCallback, useEffect, useState } from 'react';
import { Tusky } from '@tusky-io/ts-sdk/web';

interface ScreenshotModalProps {
  screenshotUrl: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

function isUnknown(value: any) {
    return value === undefined || value === null || Number.isNaN(value);
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  screenshotUrl,
  onClose,
  onConfirm,
}) => {
  const [uploadStatus, setUploadStatus] = useState<any>('');

  // Convert data URL to Blob and upload to Tusky
  const uploadToTusky = useCallback(async (dataUrl: string) => {
    try {
      setUploadStatus('Uploading to Walrus...');

      // Initialize Tusky with API key
      const tusky = new Tusky({ apiKey: import.meta.env.VITE_TUSKY_API_KEY });

      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'screenshot.png', { type: 'image/png' });
      console.log("Uploading using Tusky...");
    
      // Create a temporary file path (in-memory, since browsers don't use file paths)
      // For simplicity, we use the File object directly with a custom path-like name
      const uploadId = await tusky.file.upload(
        import.meta.env.VITE_TUSKY_VAULT_ID,
        file
      );

      setUploadStatus(`Uploaded successfully! Upload ID: ${uploadId} <br> IF you wait you would get the Blob ID.`);
      console.log("Fetching Metadata...");

      let fileMetadata = await tusky.file.get(uploadId);
      console.log("Fetching BID", fileMetadata.blobId);
      console.log({fileMetadata});
      
      
      while (!isUnknown(fileMetadata.blobId)) {
        console.log("Trying to get Blob ID...");
        await sleep(5000);
        fileMetadata = await tusky.file.get(uploadId);
        console.log("Fetching BID", fileMetadata.blobId);
      }
      setUploadStatus(
        <a
          href={`https://walruscan.com/mainnet/blob/${fileMetadata.blobId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on Walruscan (Blob ID: {fileMetadata.blobId})
        </a>
      );
    } catch (error) {
      console.error('Failed to upload to Walrus:', error);
      setUploadStatus('Failed to upload to Walrus');
    }
  }, []);

  // Trigger upload when screenshotUrl changes
  useEffect(() => {
    if (screenshotUrl) {
        console.log("Uploading to Tusky...");
        
      uploadToTusky(screenshotUrl);
    }
    console.log({screenshotUrl});
    
  }, [screenshotUrl, uploadToTusky]);

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
        <h1 className="mb-4 text-black">{uploadStatus}</h1>
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