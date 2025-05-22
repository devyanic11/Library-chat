import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Upload, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  onUploadComplete?: () => void;
}

export default function FileUpload({ onFileUpload, isLoading, onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/upload-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success('File uploaded successfully');
      onFileUpload(file);
      onUploadComplete?.();
    } catch (error) {
      console.error('Upload error details:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Cannot connect to server. Please make sure the server is running at http://localhost:8000');
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to upload file');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length === 0) return;

    const file = files[0];

    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    onFileUpload(file);
    uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }

    onFileUpload(file);
    uploadFile(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-12 transition-all duration-200 ease-in-out bg-white/50 backdrop-blur-sm 
        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className={`p-3 rounded-full ${isLoading ? 'bg-primary/20' : 'bg-primary/10'}`}>
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-primary" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">
            {isLoading ? 'Processing PDF...' : 'Upload your PDF'}
          </h3>
          <p className="text-muted-foreground text-sm">
            {isLoading ? 'Please wait while we process your file' : 'Drag and drop your PDF here or click to browse'}
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf"
          disabled={isLoading}
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={isLoading}
          className="relative overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            'Select File'
          )}
        </Button>
      </div>
    </div>
  );
}
