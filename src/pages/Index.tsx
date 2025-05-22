import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';
import { toast } from '@/components/ui/sonner';
import { ChevronRight, Trash2, MessageSquare, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);

    // Simulate processing time
    toast.info("Processing your PDF...");

    setTimeout(() => {
      setIsProcessing(false);
      setIsReady(true);

      // Initialize chat with welcome message only if there's no chat history
      if (chatHistory.length === 0) {
        setChatHistory([
          {
            id: '1',
            content: `I've processed your PDF "${uploadedFile.name}" (${formatFileSize(uploadedFile.size)}). What would you like to know about it?`,
            isUser: false,
            timestamp: new Date(),
          }
        ]);
      }

      toast.success("PDF processed successfully!");
    }, 2000);
  };

  const handleDeleteFile = () => {
    setFile(null);
    // Keep isReady true so the chat interface remains visible
    // setIsReady(false); <- This was causing the chat to disappear
    toast.success("PDF deleted successfully. You can now upload a new one.");
    // We don't clear chatHistory - it's kept as is
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col">
      <header className="py-6 px-4 sm:px-6 border-b bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-medium text-gray-800">Chat with any Book</h1>
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

              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Temporary Chat
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Easy Chat
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Share your conversation
                </Button>
              </div>

              {/* { <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium mb-2">For Students</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhance your learning experience with PDF Chat. Comprehend textbooks, handouts, and presentations effortlessly.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium mb-2">For Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Efficiently analyze your documents. From financial reports to business proposals and legal contracts.
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm">
                  <h3 className="font-medium mb-2">For Curious Minds</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock knowledge with PDF Chat. Discover insights from historical documents, poetry, and literature.
                  </p>
                </div>
              </div> } */}
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full animate-fade-in">
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border shadow-sm h-full flex flex-col">
                  <h2 className="text-lg font-medium mb-4">Document</h2>
                  {file ? (
                    <div className="p-4 border rounded-md bg-white/50 flex items-center gap-3 mb-auto">
                      <div className="p-2 rounded-full bg-primary/10">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{file.name}</h3>
                        <p className="text-muted-foreground text-xs">{formatFileSize(file.size)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDeleteFile}
                        className="text-red-500 hover:bg-red-100 hover:text-red-600"
                        title="Delete PDF"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 border rounded-md bg-white/50 flex items-center gap-3 mb-auto">
                      <div className="p-2 rounded-full bg-primary/10">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">No PDF uploaded</h3>
                        <p className="text-muted-foreground text-xs">Upload a new PDF to analyze</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="text-primary hover:bg-primary/10"
                        title="Upload PDF"
                      >
                        Upload
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            if (file.type !== 'application/pdf') {
                              toast.error("Please upload a PDF file");
                              return;
                            }
                            handleFileUpload(file);
                          }
                        }}
                        accept=".pdf"
                      />
                    </div>
                  )}

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
                <ChatInterface
                  fileName={file ? file.name : "No file uploaded"}
                  fileSize={file ? formatFileSize(file.size) : ""}
                  messages={chatHistory}
                  setMessages={setChatHistory}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-4 px-4 sm:px-6 border-t bg-white/50 backdrop-blur-sm text-center text-sm text-muted-foreground">

        Personalised Library
      </footer>
    </div>
  );
};

export default Index;
