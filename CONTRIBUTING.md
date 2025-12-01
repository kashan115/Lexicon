# Contributing to Lexicon Journal

Thank you for your interest in contributing to Lexicon Journal! We welcome contributions from everyone.

## How to Contribute

### 1. Reporting Issues
- Check the issue tracker to see if the issue has already been reported.
- If not, create a new issue with a clear title and description.
- Include steps to reproduce bugs or detailed requirements for feature requests.

### 2. Suggesting Features
- We love new ideas! Open a discussion or an issue to propose changes.
- Focus on features that help writers improve their craft (e.g., new analysis metrics, writing drills).

### 3. Pull Requests
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## Local Development
1. Clone the repository.
2. Open `index.html` in your browser or serve via a local server (e.g., `npx serve`).
3. To test LLM features, ensure you have:
   - A Google Gemini API Key (for cloud AI).
   - Or [Ollama](https://ollama.com/) installed and running locally for offline AI.

## Code Style
- We use React and TypeScript.
- Tailwind CSS is used for styling.
- Keep components small and focused.
- Ensure all AI prompts are defined in `services/llmService.ts`.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.