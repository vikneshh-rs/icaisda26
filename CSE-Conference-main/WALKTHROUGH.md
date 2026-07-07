# Codebase Walkthrough: ICAISDA-2026 Conference Platform

Welcome to the project analysis and codebase walkthrough for **ICAISDA-2026** (Second International Conference on Artificial Intelligence and Secure Data Analytics), hosted by the Department of Computer Science and Engineering (CSE) at Puducherry Technological University (PTU).

This document provides a comprehensive guide to the project's technical architecture, file structure, component interactions, and key findings.

---

## 1. Project Overview

The project is a React-based web application deployed using Vite, styled with Tailwind CSS, and served via a Node/Express server. It contains the informational and interaction portal for the ICAISDA-2026 conference, including tracks, guidelines, venue/tourist spots, dates, committees, and contact details.

### Key Technology Stack
*   **Frontend Library:** React (v19)
*   **Build Tool:** Vite (v6)
*   **CSS Styling:** Tailwind CSS (v3) + PostCSS
*   **Routing:** React Router DOM (v7, utilizing `HashRouter`)
*   **Animation & Graphics:** Framer Motion, Three.js, Vanta.js (for dynamic network canvas backgrounds), React Scroll Parallax
*   **Icons:** Lucide React, React Icons
*   **Backend Server:** Node.js + Express (v5)

---

## 2. Directory Structure

Below is the directory tree highlighting the key folders and files:

```
CSE-Conference-main/
├── server/                     # Production Node/Express Server
│   ├── server.js               # Express entrypoint (Serves static React files)
│   └── package.json            # Server configuration
├── src/                        # React Frontend Source Code
│   ├── assets/                 # Static images, icons, logos
│   │   ├── Images/             # Slideshows, portraits, site assets
│   │   └── index.js            # Asset exports
│   ├── Components/             # Reusable UI Blocks (grouped by page context)
│   │   ├── Call/               # Call for Papers components (CallIntro.jsx)
│   │   ├── Committees/         # Committee components (Advisory.jsx, OrganizCommittee.jsx)
│   │   ├── Contact/            # Contact detail cards
│   │   ├── Home/               # Homepage sections (Hero, PTU, CSE, Speakers, etc.)
│   │   ├── Registration/       # Auth UI (Loginpage, signupPage, OTPVerify)
│   │   └── Submission/         # Author submission guidelines component
│   ├── Data/                   # Constant data stores
│   │   ├── Committee.js        # Committee members lists (state, national, international)
│   │   ├── KeyHighlights.js    # Key highlights details list
│   │   └── Tracks.js           # Conference track details
│   ├── Layout/                 # Page skeleton layout (Header, Footer, Layout wrapper)
│   ├── Pages/                  # Page-level route views (Homepage, Venue, Timeline, etc.)
│   ├── App.css                 # Root styles
│   ├── App.jsx                 # Route configurations and router provider
│   ├── index.css               # Tailwind directives and custom utility classes
│   └── main.jsx                # React application entry point
├── package.json                # Project dependencies (including backend deps)
├── tailwind.config.js          # Tailwind config
├── vite.config.js              # Vite bundler configuration
├── index.html                  # HTML template
└── README.md                   # Default template readme
```

---

## 3. Architecture & Routing

### Routing Layer (`src/App.jsx`)
The application is wrapped with a `ParallaxProvider` and uses `HashRouter` to manage client-side routes under a global `Layout` structure:

```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Homepage />} />
    <Route path="callforpaper" element={<CallforPaper />} />
    <Route path="papersubmission" element={<PaperSubmission />} />
    <Route path="registration" element={<Registration />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="committees" element={<Committees />} />
    <Route path="contact" element={<Contact />} />
    <Route path="timeline" element={<Timeline />} />
    <Route path="speakers" element={<Speakers />} />
    <Route path="venue" element={<Venue />} />
  </Route>
</Routes>
```

### Layout Skeleton (`src/Layout/Layout.jsx`)
*   **Header (`Header.jsx`):** Renders the navigation bar (with mobile side-menu support) and handles standard styling adjustments upon scroll.
*   **Footer (`Footer.jsx`):** Renders the copyright and designer attribution information.
*   **Outlet:** Displays the routed page component.

---

## 4. Key Page Walkthroughs

### 1. Homepage (`src/Pages/Homepage.jsx`)
Assembles several landing-page components:
*   [Hero.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Hero.jsx): Uses parallax effects on the main banner, showing the conference title and dates.
*   [Intro.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Intro.jsx): Introduces the conference scope.
*   [PTU.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/PTU.jsx): Details the history and achievements of PTU.
*   [CSE.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/CSE.jsx): Outlines the Computer Science Department.
*   [Speakers.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Speakers.jsx) (Home version): Displays key speakers, important dates, and links to proceeding publications from ICAISDA-2025.

### 2. Call For Papers (`src/Pages/CallforPaper.jsx`)
*   Imports [CallIntro.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Call/CallIntro.jsx) which has interactive tabs.
*   Users can toggle between tracks: Artificial Intelligence, AI Applications in Industry, Secure Data Analytics, Secure Communications, and Workshops.

### 3. Paper Submission Guidelines (`src/Pages/PaperSubmission.jsx`)
*   Houses [Guidelines.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Submission/Guidelines.jsx).
*   Lists constraints such as page limits (10 pages max), similarity index indices (under 10% similarity), publication avenues, fees, and awards.

### 4. Committees (`src/Pages/Committees.jsx`)
*   Renders [OrganizCommittee.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Committees/OrganizCommittee.jsx) showing patrons, secretaries, and joint-secretaries in modern dark-blue/gradient cards.
*   Renders [Advisory.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Committees/Advisory.jsx) showing sliding carousels containing department advisory, state-level advisory, national advisory, and international advisory lists fetched from [Committee.js](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Data/Committee.js).

### 5. Speakers (`src/Pages/Speakers.jsx`)
*   Loads detailed profiles of Distinguished Keynote Speakers.
*   Integrates **Vanta.js (NET)** inside a canvas using a React ref and hooks (`vantaRef.current`) to show interactive connecting points floating in the background.

### 6. Venue (`src/Pages/Venue.jsx`)
*   Provides coordinates and contacts for the **PTU Auditorium**.
*   Displays general information regarding accommodation options.
*   Implements a sliding background slideshow of tourist destinations around Puducherry (Rock Beach, Auroville, Sri Aurobindo Ashram, Arikamedu, Eden Beach, etc.).

---

## 5. Key Findings & Observations

### ⚠️ Significant Inconsistencies

1.  **Date Discrepancies:**
    There is a critical mismatch between the dates shown on the Timeline page vs the dates shown on the home page's Speakers component:
    *   **In [Timeline.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Pages/Timeline.jsx):**
        *   Paper Submission Deadline: **1st August 2026**
        *   Acceptance Intimation: **1st September 2026**
        *   Registration Deadline: **1st October 2026**
        *   Conference Date: **29-30 December 2026**
    *   **In [Speakers.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Speakers.jsx) (Homepage section):**
        *   Paper Submission Deadline: **3rd August, 2026**
        *   Acceptance Intimation: **6th September, 2026**
        *   Registration Deadline: **5th October, 2026**
        *   Conference Date: **12 - 13, November, 2026**
    *   **In [Hero.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Hero.jsx):**
        *   Conference Date: **12- 13, November, 2026**

2.  **HTML Title Tag:**
    *   In [index.html](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/index.html#L13), the page title is still set to **`PTU - ICAISDA'25`**, which belongs to the previous year's event. It should be updated to `ICAISDA 2026`.

3.  **Unfinished Backend & API Integration:**
    *   The project root [package.json](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/package.json) contains multiple database and authentication packages (`mysql`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`).
    *   Components like [Loginpage.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Registration/Loginpage.jsx#L10), [signupPage.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Registration/signupPage.jsx#L20), and [OTPVerify.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Registration/OTPVerify.jsx#L13) make Axios calls to `http://localhost:5000/api/...`.
    *   However, the Express server in [server.js](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/server/server.js) only serves static client files and does not contain implementation code for the API routes. 

4.  **Orphan / Unused Code:**
    *   [App.js](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/App.js) is a legacy route file that is not imported or used.
    *   `signupPage.jsx` and `OTPVerify.jsx` are not registered inside the route configuration of [App.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/App.jsx).
    *   [Accommodation.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Accommodation.jsx) and [Highlights.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Home/Highlights.jsx) are imported on the Homepage, but commented out.

5.  **Minor Code Typo:**
    *   In [CallIntro.jsx](file:///c:/Users/User/Downloads/CSE-Conference-main%20%283%29/CSE-Conference-main/src/Components/Call/CallIntro.jsx#L216), there is a CSS styling typo `bg-puprle-300` instead of `bg-purple-300`.

---

## 6. How to Run Locally

### 1. Running the Frontend (Development)
From the root folder, install the client dependencies and run the Vite server:
```powershell
# Install root node modules
npm install

# Run the dev server
npm run dev
```
By default, the Vite server will run at `http://localhost:5173/`.

### 2. Building for Production
To package the build assets into the `dist` directory:
```powershell
npm run build
```

### 3. Running the Server (Production Preview)
The Express server points to the root `dist` folder. To run the production server:
```powershell
# Navigate to the server folder
cd server

# Install production server dependencies
npm install

# Run the Express server
npm start
```
The server runs on port `5000` (or `process.env.PORT`) and serves the build files.
