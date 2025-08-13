// config.js
const CONFIG = {
  API_URL: "http://localhost:3000",
};

function extractVideoUrl(fullUrl) {
  try {
    const url = new URL(fullUrl);
    const v = url.searchParams.get("v"); // get the "v" parameter
    const t = url.searchParams.get("t"); // optional, get "t" if you want the timestamp
    let videoUrl = `https://www.youtube.com/watch?v=${v}`;
    if (t) videoUrl += `&t=${t}`;
    return videoUrl;
  } catch (err) {
    console.error("Invalid URL", err);
    return null;
  }
}

const download = async (videoUrl, quality) => {
  try {

    const extractedUrl = extractVideoUrl(videoUrl);
    if (!extractedUrl) throw new Error("Invalid video URL");

    // Replace with your backend endpoint
    const backendUrl = `${CONFIG.API_URL}/youtube/download?v=${encodeURIComponent(extractedUrl)}&q=${quality}`;

    const response = await fetch(backendUrl);
    if (!response.ok) throw new Error("Failed to download video");

    // Convert response to blob
    const blob = await response.blob();

    // Create a temporary link to download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "video.mp4"; // default filename
    document.body.appendChild(link);
    link.click();
    link.remove();

    console.log("Download started!");
  } catch (err) {
    console.error(err);
  }
};


document.addEventListener('DOMContentLoaded', function () {
  const videoUrlInput = document.getElementById('videoUrl');
  const loadVideoBtn = document.getElementById('loadVideo');
  const downloadBtn = document.getElementById('downloadBtn');
  const videoInfo = document.getElementById('videoInfo');
  const formatSelect = document.getElementById('formatSelect');
  const status = document.getElementById('status');

  // Auto-fill URL if we're on a YouTube page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    if (currentTab.url.includes('youtube.com/watch')) {
      videoUrlInput.value = currentTab.url;
    }
  });

  loadVideoBtn.addEventListener('click', loadVideo);
  downloadBtn.addEventListener('click', downloadVideo);

  function showStatus(message, type = 'info') {
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
  }

  function hideStatus() {
    status.style.display = 'none';
  }

  async function loadVideo() {
    const url = videoUrlInput.value.trim();

    if (!url) {
      showStatus('Please enter a YouTube URL', 'error');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      showStatus('Please enter a valid YouTube URL', 'error');
      return;
    }

    loadVideoBtn.disabled = true;
    showStatus('Loading video information...', 'info');

    try {
      const videoData = await getVideoInfo(url);
      displayVideoInfo(videoData);
      hideStatus();
    } catch (error) {
      showStatus('Error loading video: ' + error.message, 'error');
    } finally {
      loadVideoBtn.disabled = false;
    }
  }

  function isValidYouTubeUrl(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  }

  function extractVideoId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }

  async function getVideoInfo(url) {
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Could not extract video ID from URL');
    }

    // Using a third-party API for getting video info
    // Note: In a real implementation, you'd want to use a proper backend service
    const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.youtube.com/oembed?url=${url}&format=json`)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch video information');
      }

      const data = await response.json();

      return {
        title: data.title,
        thumbnail: data.thumbnail_url,
        author: data.author_name,
        videoId: videoId,
        url: url
      };
    } catch (error) {
      // Fallback: extract basic info from URL
      return {
        title: 'Video Title (Could not fetch details)',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        author: 'Unknown',
        videoId: videoId,
        url: url
      };
    }
  }

  function displayVideoInfo(videoData) {
    document.getElementById('title').textContent = videoData.title;
    document.getElementById('thumbnail').src = videoData.thumbnail;

    // Populate format options
    formatSelect.innerHTML = `
      <option value="">Select quality...</option>
      <option value="264">1440p MP4</option>
      <option value="247">720p MP4</option>
      <option value="135">480p MP4</option>
      <option value="134">360p MP4</option>
      <option value="highestaudio">Audio Only (MP3)</option>
    `;

    videoInfo.style.display = 'block';

    // Store video data for download
    videoInfo.dataset.videoData = JSON.stringify(videoData);
  }

  async function downloadVideo() {
    const selectedFormat = formatSelect.value;
    if (!selectedFormat) {
      showStatus('Please select a format', 'error');
      return;
    }

    const videoData = JSON.parse(videoInfo.dataset.videoData);

    downloadBtn.disabled = true;
    formatSelect.disabled = true;
    showStatus('Preparing download...', 'info');

    try {
      // In a real implementation, you would send this to a backend service
      // that handles the actual YouTube video downloading
      await initiateDownload(videoData, selectedFormat);
      showStatus('Download started! Check your downloads folder.', 'success');
    } catch (error) {
      showStatus('Download failed: ' + error.message, 'error');
    } finally {
      downloadBtn.disabled = false;
      formatSelect.disabled = false;
    }
  }

  async function initiateDownload(videoData, format) {
    // This is a placeholder implementation
    // In reality, you would need:
    // 1. A backend service that can download YouTube videos
    // 2. Proper handling of YouTube's terms of service
    // 3. Legal compliance considerations
    await download(videoData.url, format);
  }
});