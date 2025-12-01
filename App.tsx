import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Settings, 
  PenTool, 
  BookOpen, 
  RefreshCw, 
  Sparkles, 
  BarChart2, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SettingsModal } from './components/SettingsModal';
import { AppSettings, DailyContent, AnalysisResult } from './types';
import { generateDailyContent, generateWritingPlan, analyzeWriting, isGeminiAvailable } from './services/llmService';

const DEFAULT_SETTINGS: AppSettings = {
  provider: isGeminiAvailable() ? 'gemini' : 'ollama',
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3',
  targetWords: 700,
};

const SAMPLE_CONTENT: DailyContent = {
  date: new Date().toISOString().split('T')[0],
  topic: "The Sound of Silence",
  description: "Reflect on a time when silence communicated more than words ever could.",
  vocabulary: [
    { word: "Ineffable", definition: "Too great or extreme to be expressed or described in words.", example: "The beauty of the sunset was ineffable." },
    { word: "Resonance", definition: "The quality in a sound of being deep, full, and reverberating.", example: "Her speech had a deep resonance with the audience." }
  ]
};

const App: React.FC = () => {
  // State
  const [text, setText] = useState<string>('');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('lexicon_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [dailyContent, setDailyContent] = useState<DailyContent | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  
  // Loading States
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Refs for auto-resize
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load Content
  useEffect(() => {
    const loadContent = async () => {
      // Check if we have today's content in storage
      const today = new Date().toISOString().split('T')[0];
      const savedContent = localStorage.getItem(`lexicon_content_${today}`);
      
      if (savedContent) {
        setDailyContent(JSON.parse(savedContent));
      } else {
        // Generate new content
        setIsLoadingTopic(true);
        try {
          const newContent = await generateDailyContent(settings);
          setDailyContent(newContent);
          localStorage.setItem(`lexicon_content_${today}`, JSON.stringify(newContent));
        } catch (error) {
          console.error("Failed to generate content, using sample", error);
          setDailyContent(SAMPLE_CONTENT);
        } finally {
          setIsLoadingTopic(false);
        }
      }
    };

    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount, we don't re-run if settings change automatically to avoid trashing daily topic

  // Save Settings
  useEffect(() => {
    localStorage.setItem('lexicon_settings', JSON.stringify(settings));
  }, [settings]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const progress = Math.min((wordCount / settings.targetWords) * 100, 100);

  const handleGeneratePlan = async () => {
    if (!dailyContent) return;
    setIsGeneratingPlan(true);
    try {
      const newPlan = await generateWritingPlan(settings, dailyContent.topic);
      setPlan(newPlan);
    } catch (error) {
      alert("Failed to generate plan. Check connection.");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleAnalyze = async () => {
    if (!dailyContent || text.length < 50) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeWriting(settings, text, dailyContent.topic);
      setAnalysis(result);
    } catch (error) {
      alert("Failed to analyze text. Check connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const refreshTopic = async () => {
    setIsLoadingTopic(true);
    try {
       const newContent = await generateDailyContent(settings);
       setDailyContent(newContent);
       // Update today's cache
       const today = new Date().toISOString().split('T')[0];
       localStorage.setItem(`lexicon_content_${today}`, JSON.stringify(newContent));
       // Reset states
       setPlan(null);
       setAnalysis(null);
       setText('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingTopic(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-orange-100 selection:text-orange-900 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-paper/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
              <PenTool size={18} />
            </div>
            <h1 className="font-serif font-bold text-xl tracking-tight">Lexicon</h1>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Word Count Pill */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              wordCount >= settings.targetWords ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'
            }`}>
              {wordCount >= settings.targetWords ? <CheckCircle2 size={16}/> : <div className="w-4 h-4 rounded-full border-2 border-stone-300 border-t-stone-500 animate-spin opacity-0" />}
              <span>{wordCount} / {settings.targetWords} words</span>
            </div>

            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {/* Progress Bar (Mobile/Desktop) */}
        <div className="h-1 w-full bg-stone-100">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar / Top Section: Topic & Tools */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Date */}
          <div className="text-stone-400 text-sm font-medium uppercase tracking-wider">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>

          {/* Topic Card */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Today's Prompt</span>
              <button onClick={refreshTopic} className="text-stone-300 hover:text-accent transition-colors" title="New Topic">
                <RefreshCw size={14} className={isLoadingTopic ? "animate-spin" : ""} />
              </button>
            </div>
            
            {isLoadingTopic ? (
               <div className="animate-pulse space-y-3">
                 <div className="h-6 bg-stone-100 rounded w-3/4"></div>
                 <div className="h-4 bg-stone-100 rounded w-full"></div>
                 <div className="h-4 bg-stone-100 rounded w-5/6"></div>
               </div>
            ) : dailyContent ? (
              <>
                <h2 className="font-serif text-2xl text-ink font-bold mb-3 leading-snug">
                  {dailyContent.topic}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {dailyContent.description}
                </p>

                {/* Vocabulary */}
                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-stone-500 mb-2">
                    <BookOpen size={14} />
                    <span className="text-xs font-semibold uppercase">Vocabulary</span>
                  </div>
                  {dailyContent.vocabulary.map((vocab, idx) => (
                    <div key={idx} className="bg-stone-50 p-3 rounded-lg border border-stone-100 hover:border-accent/20 transition-colors">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-ink">{vocab.word}</span>
                        <span className="text-xs text-stone-400">Word of the Day</span>
                      </div>
                      <p className="text-xs text-stone-600 italic mb-1">{vocab.definition}</p>
                      <p className="text-xs text-stone-500">"{vocab.example}"</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
               <div className="text-red-500 text-sm">Failed to load content. Check your API settings.</div>
            )}
          </div>

          {/* Action Tools */}
          <div className="space-y-3">
             <button 
                onClick={handleGeneratePlan}
                disabled={isGeneratingPlan || !dailyContent}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-stone-200 hover:border-accent hover:text-accent rounded-xl text-sm font-medium text-stone-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
             >
                {isGeneratingPlan ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {plan ? "Regenerate Plan" : "Generate Writing Plan"}
             </button>

             <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || text.length < 50}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-stone-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-sm font-medium text-stone-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
             >
                {isAnalyzing ? <RefreshCw className="animate-spin" size={16} /> : <BarChart2 size={16} />}
                Analyze Writing
             </button>
             {text.length < 50 && (
               <p className="text-xs text-center text-stone-400">Write at least 50 words to analyze.</p>
             )}
          </div>

          {/* Analysis Result */}
          {analysis && (
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-3">
                 <h3 className="font-bold text-ink">Analysis</h3>
                 <span className={`text-lg font-bold ${analysis.score > 80 ? 'text-green-600' : 'text-blue-600'}`}>
                    {analysis.score}/100
                 </span>
               </div>
               <p className="text-sm text-stone-600 mb-4">{analysis.feedback}</p>
               
               <div className="space-y-2">
                 <span className="text-xs font-semibold text-stone-500 uppercase">Suggestions</span>
                 <ul className="text-sm text-stone-600 space-y-2 list-disc list-inside">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                 </ul>
               </div>
            </div>
          )}
        </div>

        {/* Right Section: Editor */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Plan View (Accordion-style insert) */}
          {plan && (
            <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100 text-stone-700 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-lg text-accent">Writing Plan</h3>
                <button onClick={() => setPlan(null)} className="text-stone-400 hover:text-stone-600"><XIcon size={16}/></button>
              </div>
              <div className="prose prose-sm prose-orange max-w-none">
                <ReactMarkdown>{plan}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Main Editor */}
          <div className="relative min-h-[60vh] bg-white rounded-xl shadow-sm border border-stone-100 p-8 sm:p-10 cursor-text group focus-within:ring-2 focus-within:ring-accent/10 transition-shadow" onClick={() => textareaRef.current?.focus()}>
            
            {!text && (
              <div className="absolute top-10 left-10 right-10 pointer-events-none text-stone-300 font-serif text-lg italic select-none">
                Start writing here... Let your thoughts flow...
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent resize-none outline-none border-none font-serif text-lg sm:text-xl leading-relaxed text-ink placeholder-transparent"
              spellCheck={false}
              placeholder="Start writing..."
              style={{ minHeight: '60vh' }}
            />
          </div>
          
          {/* Footer Stats for mobile */}
          <div className="sm:hidden flex items-center justify-between text-stone-500 text-sm px-2">
             <span>{wordCount} words</span>
             <span>Goal: {settings.targetWords}</span>
          </div>

        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={settings}
        onSave={setSettings}
      />
    </div>
  );
};

// Simple icon wrapper because Lucide doesn't export 'XIcon' usually, it exports 'X'
const XIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
)

export default App;
