# ♿ AccessiRoute — Accessible Public Transit Finder

> **WarriorHacks 2.0 Submission**  
> [![Hackathon](https://img.shields.io/badge/Hackathon-WarriorHacks_2.0-blue)](https://warriorhacks.org)
> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
> [![Tech](https://img.shields.io/badge/Made%20with-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS3-success)]()

**AccessiRoute** is an accessibility-first public transit finder built for wheelchair users, senior citizens, and low-vision commuters across Indian urban transit networks (Hyderabad Transit Pilot).

---

## 📌 Problem Statement
Over 26 million persons with disabilities and millions of elderly commuters in India face daily physical exclusion in urban transportation:
- High footboard bus steps prevent wheelchair and senior citizen boarding.
- Foot-over-bridges at suburban railway stations frequently lack lifts or working ramps.
- Commuters discover broken elevators or blocked gates only *after* arriving at the station.
- Standard navigation apps only optimize for travel time or ticket price, completely ignoring accessibility barriers.

## 💡 Solution
AccessiRoute calculates a dedicated **Accessibility Score (0–10)** for every travel route by auditing:
- Step-free access and ramp presence
- Working station elevators
- Tactile paving coverage for low-vision navigation
- Level low-floor boarding vs. steep footboard stairs

---

## 🚀 Key Features
- 🔍 **Personalized Route Planner**: Choose your origin, destination, and select specific needs (Wheelchair, Senior Citizen, Low Vision).
- 📊 **Dynamic Accessibility Score (0–10)**: Color-coded scores (Green ≥7, Amber 4–6, Red ≤3) to compare transit modes instantly.
- 📋 **Gate-Level Facility Breakdown**: Modal checklist highlighting specific station gate ramps, lift statuses, and skywalks.
- 🔊 **Voice Screen Reader**: Web Speech API audio summaries designed for low-vision and visually impaired commuters.
- 🌓 **One-Click High Contrast Mode (WCAG AAA)**: Tailored pure-black background with vibrant yellow borders and text.

---

## 🛠️ Tech Stack
- **Frontend**: Semantic HTML5, Vanilla CSS3 (Custom Properties & Tokens)
- **Logic**: Vanilla JavaScript (ES6+), Web Speech API
- **Deployment**: GitHub Pages + Custom `.tech` Domain
- **Build Tools**: Zero build tools, zero dependencies, instant load time

---

## 📂 Folder Structure
```text
accessiroute/
├── .gitignore
├── CNAME
├── LICENSE
├── README.md
├── data.js
├── index.html
├── script.js
└── style.css
```

---

## 💻 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/accessiroute.git
   cd accessiroute
   ```
2. Open `index.html` directly in your browser, or run a lightweight Python server:
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

---

## 🌐 Deployment
Configured for automated static hosting via **GitHub Pages** with DNS routing for custom `.tech` domains.

---

## 📸 Screenshots
*(Insert screenshots of Homepage with scored routes, Gate Breakdown Modal, and High Contrast Mode)*

---

## 🔮 Future Roadmap
- Crowdsourced real-time elevator breakdown reporting via SMS/WhatsApp.
- Integration with OpenStreetMap accessibility tags (`wheelchair=yes`, `tactile_paving=yes`).
- Expanding beyond Hyderabad to Bengaluru (Namma Metro) and Delhi NCR transit networks.

---

## 👤 Author & Acknowledgements
- Developed solo by Ashutosh for **WarriorHacks 2.0** (Westwood CS Club).
- Dedicated to building barrier-free urban infrastructure for all commuters.
