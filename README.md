# Screen Time Break Reminder

lightweight Chrome extension that helps users reduce eye strain by encouraging regular breaks using the 20-20-20 rule: Every 20 minutes, look away from your screen for 20 seconds at something 20 feet away.

# Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **"Load unpacked"** and select the project folder.
5. You’re ready to go! A popup will appear every 20 minutes.

# How It Works

- A background script triggers a message every X minutes.
- A content script listens for that message and injects a modal overlay into the current page.
- The overlay prevents interaction for 20 seconds, then disappears.
