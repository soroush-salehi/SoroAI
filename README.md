# SoroAI

> A focused, provider-agnostic assistant interface.

SoroAI is a small, dependency-free chat UI prototype. It demonstrates conversation handling and a clear provider boundary without pretending that a model is connected. Add a server-side provider adapter before using real API credentials.

## Features

- Responsive chat layout
- Conversation history in the current tab
- Demo responses clearly labeled as local
- No API keys or secrets in browser code

## Tech stack

HTML, CSS and vanilla JavaScript

## Run locally

Open `index.html` in a modern browser.

## Scope and limitations

The current build is a frontend prototype only. It does not call an AI model or send messages to a server.

## Project structure

```
SoroAI/
├── index.html   # self-contained interface and application logic
└── README.md    # overview, setup and scope
```

## Development principles

- Keep the interface accessible, responsive and dependency-light.
- Prefer clear, readable code over unnecessary abstractions.
- Never commit credentials, private data or generated user files.
- Document limitations honestly and add tests as the project grows.

## License

No license has been selected yet. Until a license is added, all rights are reserved by the copyright holder.
