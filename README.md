<div align="center">

# 🩺 Sehat

**Minimal health calculations for people who don't want a PhD in nutrition science just to figure out their BMI.**

[![Version](https://img.shields.io/badge/version-v0.1.0-6366f1?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-10b981?style=for-the-badge)](LICENSE)
[![Made with](https://img.shields.io/badge/made%20with-vanilla%20JS-f59e0b?style=for-the-badge)](#)
[![No BS](https://img.shields.io/badge/dependencies-zero-ef4444?style=for-the-badge)](#)

<!-- Hero image placeholder -->
<img src="/assets/Hero.png" alt="Sehat hero banner" width="100%">

</div>

---

## Why This Exists

Earlier this year I went through a rough health patch. You know the drill — Google says you have 14 different terminal illnesses, WebMD is unhelpful, and every health app out there wants your email, your location, and your firstborn before it tells you your BMI.

So I built the thing I actually wanted: something calm, honest, and fast. Not a calculator pretending to be a wellness lifestyle brand. **This is v0.1.0 — the starting point, not the finish line.**

<br>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**📐 BMI Calculator**
Category, healthy-range guidance, and short explanations. No judgment, just math.

**🧬 Body-Fat Estimate**
Based on BMI, age, and biological sex.

</td>
<td width="50%" valign="top">

**⚖️ Ideal-Weight Estimate**
Robinson Formula (1983), with optional comparison to your current weight.

**🍽️ Daily Nutrition Calculator**
Maintenance, weight-loss, and weight-gain targets, plus protein, water, and fiber estimates.

</td>
</tr>
</table>

A UI that doesn't fight you — minimal, modal-based, no 9-step onboarding flow.

<br>

## 🛠️ Tech Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=flat-square&logo=googlefonts&logoColor=white)

</div>

Nothing fancy. No framework wars fought here. If you were expecting React, sorry to disappoint — sometimes the right tool is just... the platform.

<br>

## 🔬 Scientific Methods

*Yes, it's actually evidence-based.*

| Calculation | Method |
|---|---|
| BMI | Standard body-mass index formula |
| Body Fat | Deurenberg Formula |
| Ideal Weight | Robinson Formula (1983) |
| Daily Nutrition | Mifflin–St Jeor Equation |

Real formulas. Not vibes.

<br>

## 🚀 Installation

There isn't one. That's the whole point.

Clone the repo, open [`index.html`](index.html) in a browser, done. If you managed to mess that up, this might not be the project for you.

<details>
<summary><b>Running Locally (for the overachievers)</b></summary>
<br>

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Congratulations, you've deployed a server.

</details>

<br>

## 📁 Project Structure

```text
.
├── index.html
├── script.js
├── style.css
├── LICENSE
└── README.md
```

Five files. No `node_modules` black hole. You're welcome.

<br>

## 🎨 Design Philosophy

> Sehat is intentionally minimal, because your health data deserves better than a dashboard that looks like a crypto trading app.

Calm spacing, quiet color, a clear path from input to result. Readability over noise, every time.

<br>

## 🗺️ Roadmap

<table>
<tr>
<td width="50%" valign="top">

**✅ Shipped**
- BMI calculator
- Body-fat calculator
- Ideal-weight calculator
- Daily nutrition calculator
- Minimal, modal-based interface

</td>
<td width="50%" valign="top">

**🔜 Coming Eventually**
- Learn Hub
- Trusted Resources
- Additional calculators
- PWA support
- Accessibility improvements
- UI refinements

</td>
</tr>
</table>

<br>

## 🤝 Contributing

Contributions welcome, as long as they make sense. Keep changes focused, document new behavior, and don't turn this into a bloated mess with 47 dependencies for a BMI calculator. Respect the minimalism or take it elsewhere.

<br>

## 📄 License

<div align="center">

Licensed under **MIT**. See [LICENSE](LICENSE).
Do what you want, just don't blame me if something breaks.

<br>

Made with 123+ cups of coffee !

</div>