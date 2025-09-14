# YouTube Shorts Blocker

A Chrome extension that blocks YouTube Shorts by redirecting to the previous page.

## Features

- 🚫 **Blocks YouTube Shorts**: Automatically detects and blocks YouTube Shorts URLs
- ⬅️ **Smart Redirect**: Redirects to the previous page in browser history
- 🔄 **Real-time Detection**: Works with YouTube's single-page application navigation
- 🎯 **Targeted Blocking**: Only blocks `/shorts/` URLs, leaves regular YouTube videos untouched

## How It Works

The extension uses a content script that:
1. Monitors the current URL for YouTube Shorts patterns
2. Detects navigation changes in YouTube's SPA
3. Automatically redirects to the previous page when a Short is detected
4. Falls back to YouTube homepage if no history is available

## Installation

### Method 1: Load as Unpacked Extension (Recommended for Development)

1. **Download/Clone this repository**
2. **Add Icons**: Place the following icon files in the `icons/` folder:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels) 
   - `icon128.png` (128x128 pixels)
   
   You can use the `icon-generator.html` file to create simple icons, or create your own.

3. **Open Chrome Extensions Page**:
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

4. **Load the Extension**:
   - Click "Load unpacked"
   - Select the `shortblock` folder
   - The extension should now appear in your extensions list

5. **Test the Extension**:
   - Go to any YouTube Shorts URL (e.g., `https://www.youtube.com/shorts/VIDEO_ID`)
   - The extension should automatically redirect you to the previous page

## Files Structure

```
shortblock/
├── manifest.json          # Extension configuration
├── content.js            # Main content script
├── icons/                # Extension icons (you need to add these)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── icon-generator.html   # Helper to generate simple icons
└── README.md            # This file
```

## Permissions

The extension requires minimal permissions:
- `activeTab`: To access the current YouTube tab
- `history`: To navigate back to previous pages

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension format)
- **Content Script**: Runs at `document_start` for immediate detection
- **URL Detection**: Monitors for `/shorts/` in the URL path
- **Navigation Handling**: Uses multiple methods to detect YouTube's SPA navigation:
  - DOM mutation observer
  - PopState events
  - History API interception

## Troubleshooting

**Extension not working?**
- Make sure you have the icon files in the `icons/` folder
- Check that the extension is enabled in `chrome://extensions/`
- Try refreshing the YouTube page
- Check the browser console for any error messages

**Still seeing YouTube Shorts?**
- The extension only blocks direct navigation to Shorts URLs
- It may not block Shorts that appear in your feed or recommendations
- For complete blocking, consider additional extensions or browser settings

## Development

To modify the extension:
1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## License

This project is open source and available under the MIT License.
# blockshorts
