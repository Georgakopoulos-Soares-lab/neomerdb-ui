# NeomerDB UI

This is the frontend for the NeomerDB platform, developed for the Georgakopoulos-Soares Lab. It is a
scientific web application that provides rich data visualization and interactive tools for exploring
nullomer-related genomics and patient data.

## 🌐 Live Demo

> [https://neomerdbui.netlify.app](https://neomerdbui.netlify.app)

---

## 📦 Tech Stack

- **React** (via Vite)
- **TanStack Router** for routing
- **TanStack Table** for flexible, dynamic data tables
- **Material UI (MUI)** for UI components
- **ECharts** for interactive data visualizations
- **TypeScript**

---

## 🧬 Pages Overview

### 1. **Nullomer Pages**

- **`/neomer/genomes`** & **`/neomer/exomes`**
- Data tables for nullomers
- Features: column visibility, filtering, sorting, rearranging, download selected rows, stats view

### 2. **Donor Pages**

- **`/patients/genomes`** & **`/patients/exomes`**
- Patient-level donor tables with similar table functionalities

### 3. **Patient Page**

- **`/patient/:id`**
- Shows individual donor data with nullomer stats and cancer visualizations

### 4. **Visualizations**

- **`/visualizations`**
- Interactive charts (Sunburst, Pie, Heatmaps, Histograms, Multi-donut charts)

### 5. **Download Page**

- **`/download`**
- Download filtered/exported data and public datasets

### 6. **About Page**

- **`/about`**
- Project background, team, funding

### 7. **Privacy & License Page**

- **`/privacy`**
- Licensing and data usage terms (CC BY-SA 4.0)

### 8. **Help Page**

- **`/help`**
- Interactive guide with tabs and carousels explaining how to use each feature and page (screenshots
  included)

---

## 🚀 Getting Started

```bash
git clone https://github.com/Georgakopoulos-Soares-lab/neomer_db_front.git
cd neomer_db_front
npm install
npm run dev
```

---

## 🛠 Development Notes

- Uses TanStack Router v1
- ECharts options modularized per visualization type
- Large data rendering optimized with `react-window`

---

## 📄 License

This project is licensed under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA
4.0)**.

For more info, see:
[https://creativecommons.org/licenses/by-sa/4.0/](https://creativecommons.org/licenses/by-sa/4.0/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

---

## 👩‍🔬 Maintainers

- Kerasiotis Ioannis

---

### 🔒 Privacy & Licensing

Covers usage terms, licensing models, and data policies.
