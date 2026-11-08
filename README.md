# SoroAI

A local-first assistant workspace prototype with a conversation list and a clean writing surface.

## Current features
- Create and switch between conversations.
- Persist conversation history in the current browser using localStorage.
- Suggested prompt chips and a responsive workspace layout.
- Clear separation between the interface and application logic.

## Stack
HTML, CSS, Vanilla JavaScript.

## Run
Open `index.html` through a local static web server.

## Important limitations
SoroAI is not connected to an AI model yet. Assistant replies are clearly marked as local-mode placeholders. Real model access requires a PHP server endpoint, server-side API credentials, rate limiting, and appropriate privacy controls. Do not put provider secrets in browser JavaScript.

## Roadmap
Secure PHP API adapter, model settings, conversation search, export/import, and tests.