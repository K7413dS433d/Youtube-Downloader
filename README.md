# YouTube Downloader Chrome Extension

A Chrome extension for downloading YouTube videos. **For educational purposes only.**

## ⚠️ Important Legal Notice

This extension is created for educational purposes only. Downloading YouTube videos may violate YouTube's Terms of Service. Please ensure you comply with all applicable laws and terms of service when using this extension.

## Features

- 🎥 Download YouTube videos in multiple qualities
- 🎵 Extract audio-only versions
- 🔍 Auto-detect YouTube URLs when browsing
- 📱 Clean, user-friendly interface
- ⚡ Fast video information retrieval

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The YouTube Downloader icon should appear in your extensions toolbar

## Usage

### Method 1: Using the Extension Popup
1. Navigate to any YouTube video (e.g., https://www.youtube.com/watch?v=0n809nd4Zu4)
2. Click the YouTube Downloader extension icon in your toolbar
3. The video URL should be auto-filled
4. Click "Load Video" to fetch video information
5. Select your preferred quality/format
6. Click "Download" to start the download

### Method 2: Using the On-Page Button
1. Navigate to any YouTube video page
2. Look for the red "Download" button next to the Subscribe button
3. Click it to get instructions for using the extension

### Method 3: Using Right-Click Menu
1. Right-click anywhere on a YouTube video page
2. Select "Download with YouTube Downloader" from the context menu
3. This will open the extension popup

## Supported Formats

- **Video**: 720p, 480p, 360p (MP4)
- **Audio**: MP3 extraction

## How It Works

1. **URL Detection**: The extension detects YouTube video URLs
2. **Video Info**: Fetches video metadata (title, thumbnail, etc.)
3. **Format Selection**: Allows you to choose download quality
4. **Download Process**: Initiates the download (currently creates info file as placeholder)

## Development Notes

This is a educational implementation that demonstrates:
- Chrome Extension Manifest V3
- Content Scripts for page interaction
- Background Scripts for extension logic
- Popup UI for user interaction
- Cross-origin requests handling

### Current Limitations

- The actual video downloading is implemented as a placeholder
- Real implementation would require a backend service
- YouTube's API and terms of service must be considered

### For Full Implementation

To make this a fully functional downloader, you would need:

1. **Backend Service**: A server that can process YouTube URLs and extract video streams
2. **Video Processing**: Tools like `youtube-dl` or `yt-dlp`
3. **Legal Compliance**: Proper handling of copyright and terms of service
4. **Error Handling**: Robust error management for various edge cases

## File Structure

```
Youtube-Downloader/
├── manifest.json          # Extension configuration
├── assets/
│   └── icon.png           # Extension icon
├── popup/
│   ├── popup.html         # Extension popup interface
│   ├── popup.css          # Popup styling
├── scripts/
│   ├── popup.js           # Popup functionality
│   └── content.js         # Page interaction script
├── background/
│   └── background.js      # Background service worker
└── README.md              # This file
```

## Contributing

This is an educational project. If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only. Please respect YouTube's Terms of Service and applicable copyright laws.

## Disclaimer

The developers of this extension are not responsible for any misuse or legal issues that may arise from its use. Users are solely responsible for ensuring their usage complies with all applicable laws and terms of service.
