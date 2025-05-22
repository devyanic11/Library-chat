'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleFileUpload = (file: File) => {
        setIsLoading(true); // Set loading state immediately when file is selected
    };

    const handleUploadComplete = () => {
        setIsLoading(false);
        // Increment resetTrigger to trigger chat reset
        setResetTrigger(prev => prev + 1);
    };

    return (
        <main className="container mx-auto p-4 space-y-4">
            <FileUpload
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
                onUploadComplete={handleUploadComplete}
            />
            <div className="h-[600px]">
                <ChatInterface resetTrigger={resetTrigger} />
            </div>
        </main>
    );
} 