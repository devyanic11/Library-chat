
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';
import { toast } from '@/components/ui/sonner';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    
    // Simulate processing time
    toast.info("Processing your PDF...");
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsReady(true);
      toast.success("PDF processed successfully!");
    }, 2000);
  };
  
  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-lavender flex flex-col">
      <header className="py-6 px-4 sm:px-6 border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-medium text-gray-800">PDF Chat</h1>
          <p className="text-muted-foreground">Upload a PDF and chat with its content</p>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col h-full">
          {!isReady ? (
            <div className="max-w-lg mx-auto w-full animate-fade-in">
              <h2 className="text-xl font-medium text-center mb-6">
                {isProcessing ? "Processing your PDF..." : "Get started by uploading a PDF"}
              </h2>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isProcessing} />
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full animate-fade-in">
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border shadow-sm h-full flex flex-col">
                  <h2 className="text-lg font-medium mb-4">Document</h2>
                  <div className="p-4 border rounded-md bg-white/50 flex items-center gap-3 mb-auto">
                    <div className="p-2 rounded-full bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{file?.name}</h3>
                      <p className="text-muted-foreground text-xs">{file && formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="text-sm font-medium mb-2">What can you do?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-muted-foreground">
                        <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                        Ask questions about the document
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                        Request summaries of sections
                      </li>
                      <li className="flex items-center text-sm text-muted-foreground">
                        <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                        Extract specific information
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 h-[600px]">
                {file && (
                  <ChatInterface
                    fileName={file.name}
                    fileSize={formatFileSize(file.size)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-4 px-4 sm:px-6 border-t bg-white/50 backdrop-blur-sm text-center text-sm text-muted-foreground">
        PDF Chat — Upload and chat with your documents
      </footer>
    </div>
  );
};

export default Index;
