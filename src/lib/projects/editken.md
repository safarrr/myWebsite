---
title: 'Editken'
date: '2026-07-30'
description: 'An experimental browser-based design editor built with SvelteKit and Konva for creating pages and arranging text, shapes, and images.'
tech:
  - 'SvelteKit'
  - 'Svelte'
  - 'TypeScript'
  - 'Konva'
  - 'Tailwind CSS'
thumbnail: '/projects/editken.png'
demo: 'https://editken.safarudin.my.id'
---

# Editken

**Editken** is an experimental browser-based design editor built with **SvelteKit** and **Konva**. It provides a focused canvas workspace for creating pages and arranging text, shapes, and images without installing a desktop application.

The project is a proof of concept created for learning, experimentation, and exploring how interactive design tools work on the web. It is currently intended for desktop use rather than production work.

## Why I Built It

Visual editors bring together several interesting frontend challenges: translating pointer movement into canvas coordinates, keeping controls synchronized with selected objects, managing visual elements, and preserving project data between sessions.

I built Editken to explore those challenges while creating something practical and enjoyable to use. The interface is intentionally restrained so the canvas and the user's work remain the main focus.

## Core Features

- Create and manage multiple pages in a project.
- Add and arrange text, geometric shapes, and images on a canvas.
- Select and manipulate visual elements through a desktop-focused editor.
- Save projects locally in the browser for later editing.
- Switch between light and dark interface themes.

## How It Works

The application uses **SvelteKit** for routing, interface composition, and the overall application structure. **Svelte** keeps the editor state and controls reactive, while **Konva** powers the interactive canvas and its drawable elements.

Projects are stored in the browser instead of being sent to a remote backend. This keeps the experiment simple and private by default, but clearing browser data may remove saved projects.

## Tech Stack

- **SvelteKit** and **Svelte** for the application and reactive interface.
- **TypeScript** for safer editor state and component contracts.
- **Konva** for rendering and interacting with canvas elements.
- **Tailwind CSS** for the editor and landing-page interface.
- **Browser storage** for local project persistence.

## Project Status

Editken is currently a desktop-only proof of concept. Mobile devices are not supported, and projects are stored locally, so it should not be treated as a production design tool. The project remains an exploration of browser graphics, interaction design, and editor architecture.

[Try Editken in your browser](https://editken.safarudin.my.id).
