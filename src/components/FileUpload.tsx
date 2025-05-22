
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export default function FileUpload({ onFileUpload, isLoading }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  
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
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return;
    }
    
    onFileUpload(file);
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
        <div className="p-3 rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">Upload your PDF</h3>
          <p className="text-muted-foreground text-sm">
            Drag and drop your PDF here or click to browse
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
          {isLoading ? 'Processing...' : 'Select File'}
          {isLoading && (
            <div className="absolute inset-0 bg-primary/10 animate-pulse-subtle"></div>
          )}
        </Button>
      </div>
    </div>
  );
}
