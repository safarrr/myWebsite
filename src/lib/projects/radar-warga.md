---
title: 'Radar Warga'
date: '2026-01-08'
description: 'A public facility reporting platform that helps residents submit damage reports and helps officers decide which reports should be handled first.'
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

# Radar Warga

### Background

Radar Warga was built to make public facility reports easier to collect and follow up. In many cases, reports about broken roads, damaged streetlights, clogged drains, or similar problems are scattered across social media, chat groups, or private messages. Because of that, it becomes hard to track which reports are new, which ones are being handled, and which ones should be prioritized.

The goal of this project was simple: give residents a clearer way to submit reports, and give officers a dashboard where they can manage those reports from one place.

### What It Does

With Radar Warga, residents can submit a report with a location, description, and photo of the damage. The report is stored in the system and shown in a dashboard, so the team can review it, update the status, and decide what needs attention first.

We also added image analysis using **YOLO**. The uploaded photo is sent to a separate Python and Flask service, then processed to help identify the type of damage and estimate its priority level. The result is sent back to the Laravel backend and attached to the report.

This does not replace manual review, but it helps provide an initial reference so reports can be sorted more consistently.

### How It Works

1. Residents submit a report with location, description, and photo.
2. The Laravel backend stores the report data in MySQL.
3. The uploaded photo is sent to a separate Python and Flask service.
4. YOLO processes the image and returns the analysis result.
5. The backend updates the report with category and priority information.
6. Officers can review and manage the reports from the dashboard.

### Tech Stack

- **Main App**: Laravel, Inertia.js, React, MySQL
- **Image Analysis Service**: Python, Flask, YOLO

<div class="grid md:grid-cols-2 gap-8 items-center not-prose">
<div class="prose prose-invert">

### Achievement

This project was created during the **“Next-Gen Software Engineering with Artificial Intelligence”** IT Bootcamp by **Universitas Bina Sarana Informatika (UBSI)** at **Hotel Asyana, Sentul Bogor**, held on **January 7 to 8, 2026**.

I worked as the **Project Manager**, helping coordinate the team, plan the system flow, and make sure the frontend, backend, and image analysis service could work together. Radar Warga won **3rd Place** in the event.

</div>

<div>
  <img src="/projects/radar-warga-gallery-2.jpeg" alt="Radar Warga achievement" class="rounded-xl shadow-lg border border-zinc-800 w-full" />
</div>
</div>
