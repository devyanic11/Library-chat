# Library Chat

Library Chat is a web application that allows you to upload any PDF (such as books, reports, or papers) and chat with its content using an AI assistant. Ask questions, get summaries, and extract information from your documents instantly.

Report: [Available Here](https://docs.google.com/document/d/1GwxShGOdo-ftSVPPXUDFJD6mbjZvfvk7oDzsKtwp5Vo/edit?usp=sharing)

## Features

- 📄 **Upload PDF**: Drag and drop or select a PDF to upload and process.
- 💬 **Chat with your PDF**: Ask questions about the uploaded document and get instant, context-aware answers.
- 📝 **Markdown Support**: Assistant responses are rendered with full markdown formatting (code, lists, tables, etc.).
- 🔗 **Source Highlighting**: See which parts of the document were used to answer your question.
- 🚦 **Processing State**: The chat is only enabled once the PDF is fully processed and ready.
- 🗑️ **Delete & Reset**: Remove the current PDF and upload a new one at any time.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS (with Tailwind Typography), [react-markdown](https://github.com/remarkjs/react-markdown)
- **Backend**: FastAPI (Python)
- **PDF Processing**: Custom logic (see backend)

## Backend

The backend for Library Chat is available at:
[github.com/devyanic11/Library-api](https://github.com/devyanic11/Library-api)

**Setup:**
1. Clone the backend repository:
   ```bash
   git clone https://github.com/devyanic11/Library-api.git
   cd Library-api
   ```
2. Follow the steps given in its readme.md

**Make sure the backend is running before starting the frontend!**

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Python 3.8+

### 1. Clone the repository
```bash
git clone https://github.com/devyanic11/Library-chat.git
cd Library-chat
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Start the frontend
```bash
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080) (or as configured in `vite.config.ts`).

## Usage
1. **Upload a PDF**: Use the upload area to select or drag-and-drop a PDF file.
2. **Wait for Processing**: The app will notify you when the PDF is ready for questions.
3. **Chat**: Type your questions in the chat box. The assistant will answer using the content of your PDF.
4. **Delete/Reset**: Click the trash icon to remove the current PDF and upload a new one.

## Project Structure
- `src/` — React frontend components and pages
- `backend/` — FastAPI backend (PDF processing, chat logic)
- `public/` — Static assets

## Customization
- **Styling**: Uses Tailwind CSS. You can customize styles in `tailwind.config.ts` and `src/index.css`.
- **Markdown Rendering**: Uses `react-markdown` with Tailwind Typography for beautiful output.
- **Backend Logic**: See `backend/main.py` for PDF processing and chat logic.

## Troubleshooting
- If you get `No PDF loaded` or similar errors, make sure to wait until the PDF is fully processed before asking questions.
- If you delete a PDF, the backend is reset and you must upload a new PDF before chatting again.
- For CORS or connection issues, ensure both frontend and backend are running and accessible.


---

