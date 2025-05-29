const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");


const API_KEY = process.env.ASSEMBLYAI_API_KEY;

if (!API_KEY) {
    throw new Error("ASSEMBLYAI_API_KEY is not set in environment variables.");
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadToAssembly(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    try {
        const res = await axios.post("https://api.assemblyai.com/v2/upload", form, {
            headers: {
                ...form.getHeaders(),
                authorization: API_KEY,
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        if (!res.data?.upload_url) {
            throw new Error("Upload failed: No upload_url returned.");
        }

        return res.data.upload_url;
    } catch (error) {
        console.error("AssemblyAI Upload Error:", error.response?.data || error.message);
        throw new Error("Failed to upload audio to AssemblyAI.");
    }
}

async function transcribeAudio(filePath, maxRetries = 20) {
    try {
        const uploadUrl = await uploadToAssembly(filePath);

        const transcriptRes = await axios.post(
            "https://api.assemblyai.com/v2/transcript",
            { audio_url: uploadUrl },
            { headers: { authorization: API_KEY } }
        );

        const transcriptId = transcriptRes.data.id;

        let attempts = 0;
        while (attempts < maxRetries) {
            const res = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
                headers: { authorization: API_KEY },
            });

            const status = res.data.status;

            if (status === "completed") {
                return res.data.text;
            }

            if (status === "error") {
                console.error("Transcription error:", res.data.error);
                throw new Error(`Transcription failed: ${res.data.error}`);
            }

            await delay(5000);
            attempts++;
        }

        throw new Error("Transcription timed out after maximum retries.");
    } catch (error) {
        console.error("Transcription Process Error:", error.response?.data || error.message);
        throw new Error("Failed to transcribe audio.");
    }
}

module.exports = transcribeAudio;
