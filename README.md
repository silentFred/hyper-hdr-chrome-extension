# HyperHDR Control Chrome Extension

Control your HyperHDR ambient lighting system directly from Chrome.

## Quick Start

### 1. Install the Chrome Extension
1. Download or clone this repository to your computer
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the `lights` folder containing this README
6. The HyperHDR icon will appear in your toolbar

### 2. Install HyperHDR
Download v21.0.0.0 from [GitHub](https://github.com/awawa-dev/HyperHDR/releases/tag/v21.0.0.0) for your platform, then access the web interface at `http://localhost:8090`

### 3. Import Skydimo Configuration (if using Skydimo lights)
1. Open HyperHDR web interface
2. Go to **Configuration** → **General** → **Import/Export Configuration**
3. Import `skydimo_hyper_hdr_config.json` from this folder
4. Restart HyperHDR

## Features

- **🎨 Color Control** - 12 preset colors + custom color picker
- **🎬 Smart Profiles** - Work, Movie, Gaming, Night, and Party modes
- **🖥️ Screen Capture** - Sync lights with your screen content
- **✨ Effects** - Rainbow, Breathing, Candle, and more
- **🔆 Brightness** - Smooth 0-100% adjustment

## Platform-Specific Installation

<details>
<summary><b>Windows</b></summary>

1. Download `HyperHDR-21.0.0.0-windows-x64.exe` from [releases](https://github.com/awawa-dev/HyperHDR/releases/tag/v21.0.0.0)
2. Run installer → HyperHDR starts automatically
3. Enable JSON API in Settings → Network Services
</details>

<details>
<summary><b>macOS</b></summary>

1. Download `.dmg` file (Intel or Apple Silicon) from [releases](https://github.com/awawa-dev/HyperHDR/releases/tag/v21.0.0.0)
2. Drag to Applications → Launch → Grant permissions
3. Enable JSON API in Settings → Network Services
</details>

<details>
<summary><b>Linux/Raspberry Pi</b></summary>

```bash
# Download appropriate .deb from releases
sudo dpkg -i HyperHDR-*.deb
sudo systemctl start hyperhdr
sudo systemctl enable hyperhdr
```
Enable JSON API in Settings → Network Services
</details>

## Files Included

- `manifest.json` - Chrome extension configuration
- `popup.html/js` - Extension interface and logic
- `skydimo_hyper_hdr_config.json` - Skydimo lights configuration
- `icon*.png` - Extension icons
- `IMPROVEMENTS.md` - Future enhancements

## Troubleshooting

**Not connecting?** Check HyperHDR is running at `http://localhost:8090` and JSON API is enabled

**Colors not working?** Ensure lights are powered on and no other source has priority

**Screen capture issues?** Verify system grabber is configured in HyperHDR settings

## Configuration

To change the server address, edit line 3 in `popup.js`:
```javascript
this.baseUrl = 'http://localhost:8090/json-rpc';
```

## License

Open source for personal use with HyperHDR systems.