---
title: 'Radar Warga'
date: '2026-01-08'
description: 'AI-powered public facility reporting platform leveraging Computer Vision for automatic priority analysis.'
tech:
  - 'Laravel'
  - 'Inertia.js'
  - 'React'
  - 'MySQL'
  - 'Python'
  - 'Flask'
  - 'YOLO'
thumbnail: '/projects/radar-warga.png'
gallery:
  - '/projects/radar-warga-gallery-1.jpeg'
  - '/projects/radar-warga-gallery-3.jpeg'
  - '/projects/radar-warga-gallery-4.jpeg'
  - '/projects/radar-warga-gallery-5.jpeg'
#   - '/projects/radar-warga-gallery-2.jpeg'
---

# Radar Warga: AI-Driven Public Facility Reporting Revolution

### Background

Public facility damages—ranging from dangerous potholes and broken streetlights to clogged drainage systems—are often addressed too late. The core issue isn't a lack of citizen concern, but rather the **inefficiency of the reporting workflow**. Reports scattered across various social media channels make status monitoring difficult, and without centralized data, prioritizing repairs becomes subjective.

### Smart Solution

**Radar Warga** serves as an _End-to-End_ solution bridging the gap between citizens and city management. This platform unifies citizen reports into a single, integrated dashboard that is transparent and accountable.

The system's standout feature is the integration of **Artificial Intelligence (Computer Vision)** using the **YOLO** algorithm. Every uploaded photo of damage is automatically analyzed to:

1.  **Validate Reports:** Ensure the photo is relevant to damage categories.
2.  **Classify Damage Severity:** Objectively determine repair urgency (Low, Medium, High).

This analysis process runs _asynchronously_, ensuring the user experience remains fast and responsive despite the heavy AI computation occurring in the background.

### Technical Architecture & Workflow

The system is built on a robust stack ensuring reliability and scalability:

- **Core Stack**: Laravel, Inertia.js, React, MySQL
- **AI Service**: Python, Flask, YOLO (Computer Vision)

**How It Works:**

1.  **Data Ingestion**: The Laravel backend receives the user's report data and stores the text details and images in MySQL.
2.  **Async Processing**: The system asynchronously sends the image to the independent AI Service (built with Python & Flask).
3.  **AI Analysis**: The YOLO model processes the image to detect specific damage types and classify severity.
4.  **Callback Mechanism**: Once analysis is complete, the results are sent back to the Laravel backend via a callback.
5.  **Final Update**: The report record is updated with the AI-generated score, category, and specific damage details, prioritizing it for the relevant authorities.

<div class="grid md:grid-cols-2 gap-8 items-center not-prose">
<div class="prose prose-invert">

### Achievements

This project was developed in a short timeframe during the **“Next-Gen Software Engineering with Artificial Intelligence”** IT Bootcamp organized by **Universitas Bina Sarana Informatika (UBSI)**, held at **Hotel Asyana, Sentul Bogor** on **January 7–8, 2026**.

As the **Project Manager**, I was responsible for coordinating the team, designing the system architecture, and ensuring seamless integration between the Frontend, Backend, and AI Service. Our hard work paid off by securing **3rd Place**, proving that advanced technology can be effectively applied to solve real-world community problems.

</div>

<div>
  <img src="/projects/radar-warga-gallery-2.jpeg" alt="Achievements" class="rounded-xl shadow-lg border border-zinc-800 w-full" />
</div>
</div>
