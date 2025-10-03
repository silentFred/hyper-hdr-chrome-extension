# HyperHDR Control Chrome Extension

**Control HyperHDR ambient LED lights from Chrome** • Skydimo Compatible • WS2812B/SK6812 RGB Control

[![HyperHDR](https://img.shields.io/badge/HyperHDR-v21.0.0.0-blue)](https://github.com/awawa-dev/HyperHDR)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green)](https://github.com/silentFred/hyper-hdr-chrome-extension)
[![License](https://img.shields.io/badge/License-Open%20Source-orange)](LICENSE)

Control your HyperHDR ambient lighting system directly from Chrome instead of the clunky web interface. Perfect for Philips Ambilight alternatives, DIY bias lighting, and gaming setups.

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

- **🎨 RGB LED Color Control** - 12 preset colors + custom color picker for WS2812B, SK6812, APA102
- **🎬 Smart Profiles** - Work, Movie, Gaming, Night, and Party modes for ambient lighting
- **🖥️ Screen Capture** - Sync LED strips with monitor content (Ambilight clone)
- **✨ Effects** - Rainbow swirl, Breathing, Candle flicker, Sparks, Plasma animations
- **🔆 Brightness** - Smooth 0-100% dimming control
- **⚡ Fast JSON-RPC API** - Direct control without web UI lag

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

## Keywords & Compatibility

**LED Types**: WS2812B, WS2811, SK6812, APA102, HD107, SK9822, Skydimo
**Alternatives to**: Philips Hue, Ambilight, Govee Immersion, LIFX, Nanoleaf
**Works with**: WLED, Home Assistant, OpenRGB, Prismatik, Boblight
**Use Cases**: Gaming RGB, TV bias lighting, monitor backlight, DIY Ambilight, streaming setup, PC ambient lighting

## Why Choose This Extension?

Unlike other solutions that require:
- Complex WLED configuration
- Expensive Philips Hue bridges
- Slow Hyperion web interfaces
- Command-line tools

This Chrome extension gives you **instant control** with one click from your browser toolbar.

## License

Open source for personal use with HyperHDR systems.

## Related Projects

- [HyperHDR](https://github.com/awawa-dev/HyperHDR) - The ambient lighting system
- [WLED](https://github.com/Aircoookie/WLED) - WiFi LED control
- [Hyperion.NG](https://github.com/hyperion-project/hyperion.ng) - Alternative to HyperHDR

## Tags

`hyperhdr` `chrome-extension` `rgb-led` `ws2812b` `sk6812` `ambilight` `bias-lighting` `ambient-lighting` `led-control` `smart-home` `home-automation` `gaming-setup` `skydimo` `diy-ambilight` `tv-backlight` `monitor-lighting` `json-rpc` `chrome-api`