# Lexicon Journal 🖋️

A distraction-free, daily writing journal designed to improve your vocabulary, clarity, and writing discipline. 

**Open Source | Privacy-Focused | AI-Powered**

## Features

- **Daily Writing Prompts**: Unique, thought-provoking topics generated daily.
- **30-Day Writing Course**: A built-in curriculum to take you from beginner to confident writer.
- **AI Writing Assistant**:
  - **Auto-Complete**: Stuck? Let AI suggest the next sentence.
  - **Grammar Fixer**: Instant proofreading without changing your voice.
  - **Analysis**: Get feedback on your clarity, depth, and vocabulary usage.
- **Vocabulary Building**: Learn 2 sophisticated words related to your daily topic.
- **Book Recommendations**: Monthly curated reading list for writers.
- **Local Data**: All your writing is stored locally in your browser.

## AI Setup

Lexicon Journal supports two AI providers:

### 1. Google Gemini (Cloud)
- Requires an API Key.
- Fast, high-quality responses.
- Best for general users.

### 2. Ollama (Local & Private)
- Run LLMs (like Llama 3, Mistral) locally on your machine.
- **Privacy First**: No data leaves your computer.
- **Free**: No API costs.

**How to connect Ollama:**
1. Download and install [Ollama](https://ollama.com/).
2. Run a model in your terminal: `ollama run llama3`
3. **Important**: You must allow browser origins. Run Ollama with the origin flag:
   ```bash
   OLLAMA_ORIGINS="*" ollama serve
   ```
4. In Lexicon Journal, go to **Settings**, select **Local (Ollama)**, and ensure the URL matches (usually `http://localhost:11434`).

## Running the App

This is a static React application.

1. Clone the repo.
2. Open `index.html` in your browser.
3. Start writing!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.