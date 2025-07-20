// components/ExportOptions.tsx
import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

interface ExportOptionsProps {
  onExportJSON: () => string;
  onExportRRULE: () => string;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  onExportJSON,
  onExportRRULE,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleExportJSON = () => {
    const content = onExportJSON();
    setPreviewContent(content);
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 10000);
  };

  const handleExportRRULE = () => {
    const content = onExportRRULE();
    setPreviewContent(content);
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 10000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Export Options
      </h3>
      
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Export as JSON
        </button>
        
        <button
          onClick={handleExportRRULE}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Export as RRULE
        </button>
      </div>

      {showPreview && (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Export Preview
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="text-xs text-gray-900 dark:text-gray-100 overflow-auto max-h-48">
            <code>{previewContent}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;
