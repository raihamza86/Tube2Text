# 🎥 YouTube to Blog Generator (MERN Stack)

This is a full-stack web application that converts YouTube videos into high-quality blog posts using AI. It downloads the audio from a video, transcribes it with **AssemblyAI**, and generates well-structured blog content using **Cohere**.

## 🛠 Tech Stack

- **Frontend**: React.js (Client)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (optional, for blog storage)
- **Audio Download**: [`yt-dlp-wrap`](https://www.npmjs.com/package/yt-dlp-wrap)
- **Transcription**: [AssemblyAI](https://www.assemblyai.com/)
- **Blog Generation**: [Cohere Generate API](https://cohere.com/)
- **Video Metadata**: [`play-dl`](https://www.npmjs.com/package/play-dl)

---

## 📦 Features

- 🔗 Accept YouTube video URL as input
- 🎧 Extract audio from YouTube using `yt-dlp`
- 🧠 Transcribe speech using AssemblyAI
- ✍️ Generate SEO-friendly blog content using Cohere
- 🖼️ Fetch video metadata (title, description, thumbnail, etc.)
- 🧹 Clean and format blog for readability
- 🧼 Auto-cleanup of temporary files

---

## 📁 Project Structure

project-root/
├── backend/
│ ├── controllers/
│ │ └── blogController.js
│ ├── routes/
│ │ └── blogRoutes.js
│ ├── services/
│ │ ├── downloadAudio.js
│ │ ├── transcribeAudio.js
│ │ └── generateBlog.js
│ ├── utils/
│ │ └── cleanTranscript.js
│ └── app.js
│
├── frontend/
│ └── [React Components & Pages]
│
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file in `backend/` with:

```env
ASSEMBLYAI_API_KEY=your_assemblyai_key
COHERE_API_KEY=your_cohere_api_key
PORT=5000

🚀 Installation & Setup
Backend

cd backend
npm install
node app.js
This will start the Express server on http://localhost:5000.

Frontend

cd frontend
npm install
npm start
This will run the React client at http://localhost:5173

📂 Temporary Files
All downloaded audio files are stored in /temp/ and deleted after transcription to keep the server clean.

📬 Contact
For questions or suggestions:
rahamza186@gmail.com | LinkedIn: https://www.linkedin.com/in/raihamzamajeed
