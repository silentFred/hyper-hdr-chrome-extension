class HyperHDR {
  constructor() {
    this.baseUrl = 'http://localhost:8090/json-rpc';
    this.isOn = false;
  }

  async sendCommand(command) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  }

  async getStatus() {
    const result = await this.sendCommand({ command: 'serverinfo' });
    if (result && result.info) {
      const allComponent = result.info.components.find(c => c.name === 'ALL');
      return {
        enabled: allComponent ? allComponent.enabled : false,
        brightness: result.info.adjustment ? result.info.adjustment[0].brightness : 100
      };
    }
    return { enabled: false, brightness: 100 };
  }

  async toggle() {
    this.isOn = !this.isOn;
    return this.sendCommand({
      command: 'componentstate',
      componentstate: { component: 'ALL', state: this.isOn }
    });
  }

  async turnOn() {
    this.isOn = true;
    return this.sendCommand({
      command: 'componentstate',
      componentstate: { component: 'ALL', state: true }
    });
  }

  async turnOff() {
    this.isOn = false;
    return this.sendCommand({
      command: 'componentstate',
      componentstate: { component: 'ALL', state: false }
    });
  }

  async setColor(r, g, b) {
    await this.turnOn();
    return this.sendCommand({
      command: 'color',
      color: [r, g, b],
      priority: 1,
      origin: 'ChromeExtension'
    });
  }

  async setBrightness(level) {
    return this.sendCommand({
      command: 'adjustment',
      adjustment: { brightness: parseInt(level) }
    });
  }

  async setEffect(effectName) {
    if (!effectName) {
      // Clear effect to return to static color
      return this.sendCommand({
        command: 'clear',
        priority: 1
      });
    }
    return this.sendCommand({
      command: 'effect',
      effect: { name: effectName },
      priority: 1,
      origin: 'ChromeExtension'
    });
  }

  async enableSystemGrabber(enable) {
    return this.sendCommand({
      command: 'componentstate',
      componentstate: {
        component: 'SYSTEMGRABBER',
        state: enable
      }
    });
  }

  async getSystemGrabberStatus() {
    const result = await this.sendCommand({ command: 'serverinfo' });
    if (result && result.info) {
      const grabber = result.info.components.find(c => c.name === 'SYSTEMGRABBER');
      return grabber ? grabber.enabled : false;
    }
    return false;
  }
}

// Initialize
const hdr = new HyperHDR();
const powerBtn = document.getElementById('powerBtn');
const captureBtn = document.getElementById('captureBtn');
const effectSelect = document.getElementById('effectSelect');
const brightnessSlider = document.getElementById('brightness');
const brightnessValue = document.getElementById('brightnessValue');
const statusDiv = document.getElementById('status');
const colorPicker = document.getElementById('colorPicker');
const applyColorBtn = document.getElementById('applyColor');

// Load initial status
async function loadStatus() {
  const status = await hdr.getStatus();
  hdr.isOn = status.enabled;
  updatePowerButton();
  brightnessSlider.value = status.brightness;
  brightnessValue.textContent = status.brightness;

  // Check screen capture status
  const captureEnabled = await hdr.getSystemGrabberStatus();
  if (captureEnabled) {
    captureBtn.classList.add('active');
  }
}

function updatePowerButton() {
  if (hdr.isOn) {
    powerBtn.textContent = 'Turn Off';
    powerBtn.className = 'power-btn on';
  } else {
    powerBtn.textContent = 'Turn On';
    powerBtn.className = 'power-btn off';
  }
}

function showStatus(message) {
  statusDiv.textContent = message;
  statusDiv.classList.add('show');
  setTimeout(() => {
    statusDiv.classList.remove('show');
  }, 2000);
}

// Power button
powerBtn.addEventListener('click', async () => {
  powerBtn.disabled = true;
  await hdr.toggle();
  updatePowerButton();
  showStatus(hdr.isOn ? 'Lights On' : 'Lights Off');
  powerBtn.disabled = false;
});

// Color buttons
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const [r, g, b] = e.target.dataset.color.split(',').map(Number);
    await hdr.setColor(r, g, b);
    showStatus(`Color set`);
  });
});

// Brightness slider
let brightnessTimeout;
brightnessSlider.addEventListener('input', (e) => {
  brightnessValue.textContent = e.target.value;
  clearTimeout(brightnessTimeout);
  brightnessTimeout = setTimeout(async () => {
    await hdr.setBrightness(e.target.value);
    showStatus(`Brightness: ${e.target.value}%`);
  }, 300);
});

// Screen capture toggle
captureBtn.addEventListener('click', async () => {
  captureBtn.disabled = true;
  const isActive = captureBtn.classList.contains('active');

  if (isActive) {
    await hdr.enableSystemGrabber(false);
    captureBtn.classList.remove('active');
    showStatus('Capture OFF');
  } else {
    await hdr.enableSystemGrabber(true);
    captureBtn.classList.add('active');
    showStatus('Capture ON');
  }

  captureBtn.disabled = false;
});

// Effects dropdown
effectSelect.addEventListener('change', async (e) => {
  const effectName = e.target.value;

  if (effectName) {
    await hdr.setEffect(effectName);
    showStatus(`Effect: ${effectName}`);
  } else {
    await hdr.setEffect('');
    showStatus('Static color mode');
  }
});

// Custom color picker
applyColorBtn.addEventListener('click', async () => {
  const hex = colorPicker.value;
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  await hdr.setColor(r, g, b);
  showStatus(`Custom color applied`);
});

// Profile buttons
document.querySelectorAll('.profile-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const profile = e.currentTarget.dataset.profile;

    switch(profile) {
      case 'work':
        // Warm amber at 50% brightness
        await hdr.setColor(255, 147, 41);
        await hdr.setBrightness(50);
        await hdr.enableSystemGrabber(false);
        captureBtn.classList.remove('active');
        showStatus('Work Mode: Warm & Focused');
        break;

      case 'movie':
        // Screen capture on, full brightness
        await hdr.enableSystemGrabber(true);
        await hdr.setBrightness(100);
        captureBtn.classList.add('active');
        showStatus('Movie Mode: Immersive');
        break;

      case 'gaming':
        // Screen capture on, vibrant colors
        await hdr.enableSystemGrabber(true);
        await hdr.setBrightness(100);
        captureBtn.classList.add('active');
        showStatus('Gaming Mode: Responsive');
        break;

      case 'night':
        // Dim red/orange
        await hdr.setColor(255, 50, 0);
        await hdr.setBrightness(25);
        await hdr.enableSystemGrabber(false);
        captureBtn.classList.remove('active');
        showStatus('Night Mode: Sleep Friendly');
        break;

      case 'party':
        // Party effect
        await hdr.setEffect('Rainbow swirl');
        await hdr.setBrightness(100);
        effectSelect.value = 'Rainbow swirl';
        showStatus('Party Mode: Rainbow!');
        break;
    }

    // Update brightness slider
    const result = await hdr.sendCommand({ command: 'serverinfo' });
    if (result && result.info && result.info.adjustment) {
      brightnessSlider.value = result.info.adjustment[0].brightness;
      brightnessValue.textContent = result.info.adjustment[0].brightness;
    }
  });
});

// Load on startup
loadStatus();