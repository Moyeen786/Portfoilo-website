# 🚀 Shaik Moyeen - 3D Animated Portfolio & Digital CV

A high-performance, responsive, 3D animated personal portfolio website and interactive resume for **Shaik Moyeen**, Computer Science and Engineering student at **Amrita School of Engineering, Coimbatore**.

---

## 🌟 Key Features

- **Interactive 3D Three.js Background**: Real-time floating geometric meshes (Icosahedrons, Torus rings, glowing particles) with mouse parallax and scroll tracking.
- **Holographic 3D Avatar Card**: Multi-layered 3D holographic frame showcasing Shaik Moyeen's portrait with rotating neon orbital rings and floating tech badges.
- **3D Tilt Cards**: Specular lighting, perspective tilt, and hover depth across projects, skills, and metrics cards.
- **Dynamic Typewriter**: Smooth animated roles cycling in real-time.
- **Interactive Project Hub & Architecture Deep Dives**: Detailed modals highlighting algorithmic choices (Greedy, DP, Divide & Conquer), embedded hardware pipelines, and full-stack web architectures.
- **Integrated Digital Resume Modal**: Printable and downloadable ATS-friendly CV directly accessible with one click (`window.print()`).
- **Interactive Copy-to-Clipboard**: Copy email and phone number with animated toast notifications.
- **Web Audio Sound Effects**: Subtle synthesizer interaction sounds for an ultra-futuristic cyber feel.
- **GitHub & LinkedIn Integration**: Direct links to [GitHub (@Moyeen786)](https://github.com/Moyeen786) and [LinkedIn](https://www.linkedin.com/in/moyeen-shaik-b19a98306/).

---

## 📂 Project Structure

```
portfolio/
├── index.html                  # Main portfolio single-page application
├── README.md                   # Project documentation & deployment guide
└── assets/
    ├── css/
    │   └── style.css           # 3D transforms, neon glows, glassmorphism, animations
    ├── js/
    │   ├── three-scene.js      # Three.js 3D WebGL background scene
    │   └── main.js             # 3D tilt, modals, filters, typewriter, audio, toasts
    └── images/
        └── profile.jpg         # Shaik Moyeen's profile photo
```

---

## 💻 How to Run Locally

### Method 1: Double-click to Open
Simply double-click [`index.html`](file:///C:/Users/moyee/.gemini/antigravity/scratch/portfolio/index.html) in your file manager to open it in any web browser (Chrome, Edge, Firefox, Brave).

### Method 2: Using Python Simple HTTP Server
In your terminal, navigate to the portfolio folder and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

1. Create a new GitHub repository named `portfolio` or `<your-username>.github.io` on your GitHub account (`https://github.com/Moyeen786`).
2. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial 3D portfolio release"
   git branch -M main
   git remote add origin https://github.com/Moyeen786/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** on your GitHub repository, choose the `main` branch, and click **Save**.
4. Your 3D portfolio will be live at `https://moyeen786.github.io/portfolio/`!
