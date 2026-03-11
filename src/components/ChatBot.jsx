import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const SYSTEM_PROMPT = `Kamu adalah VitaBot, asisten AI dari aplikasi VitaCheck. Kamu bisa menjawab pertanyaan apa saja — sama seperti asisten AI pada umumnya. Gunakan bahasa Indonesia yang natural dan ramah. Berikan jawaban yang lengkap, akurat, dan berguna.`;

const QUICK_QUESTIONS = [
  'Apa itu BMI dan cara menghitungnya?',
  'Cara menurunkan berat badan yang efektif?',
  'Apa manfaat olahraga rutin?',
  'Rekomendasikan makanan sehat sehari-hari',
];

// Render markdown menjadi elemen React yang rapi
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading ##
    if (/^##\s/.test(line)) {
      elements.push(
        <p key={i} className="font-bold text-primary-700 mt-2 mb-0.5">
          {parseInline(line.replace(/^##\s/, ''))}
        </p>
      );
      i++;
      continue;
    }

    // Heading #
    if (/^#\s/.test(line)) {
      elements.push(
        <p key={i} className="font-bold text-primary-900 mt-2 mb-0.5 text-base">
          {parseInline(line.replace(/^#\s/, ''))}
        </p>
      );
      i++;
      continue;
    }

    // Bullet list - atau *
    if (/^[\*\-]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[\*\-]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[\*\-]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={i} className="mt-1 mb-1 space-y-0.5 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex gap-1.5 items-start">
              <span className="text-primary-500 mt-0.5 flex-shrink-0">•</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="mt-1 mb-1 space-y-0.5 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex gap-1.5 items-start">
              <span className="text-primary-500 font-semibold flex-shrink-0 w-4">{j + 1}.</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Garis pemisah ---
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={i} className="border-gray-200 my-2" />);
      i++;
      continue;
    }

    // Baris kosong
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraf biasa
    elements.push(
      <p key={i} className="leading-relaxed">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5 text-sm">{elements}</div>;
}

// Parsing inline: **bold**, *italic*, `code`
function parseInline(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={key++} className="font-semibold text-gray-900">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++} className="italic">{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<code key={key++} className="bg-gray-100 px-1 rounded text-xs font-mono text-primary-700">{match[4]}</code>);
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length > 0 ? parts : text;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Halo! Saya VitaBot 👋, asisten AI dari VitaCheck. Saya bisa membantu menjawab berbagai pertanyaan — mulai dari kesehatan, nutrisi, hingga topik umum lainnya. Ada yang bisa saya bantu?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQ, setShowQuickQ] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
    }
  }, [input]);

  const sendMessage = async (text) => {
    const userMessage = (text || input).trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setShowQuickQ(false);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content:
                '⚠️ API key belum dikonfigurasi. Tambahkan `VITE_GEMINI_API_KEY` di file `.env` untuk mengaktifkan fitur VitaBot.\n\nContoh:\n```\nVITE_GEMINI_API_KEY=your_api_key_here\n```\nDapatkan API key gratis di: https://aistudio.google.com/apikey',
            },
          ]);
          setIsLoading(false);
        }, 500);
        return;
      }

      // Build conversation history with system prompt embedded
      const conversationHistory = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nMengerti peranmu?' }] },
        { role: 'model', parts: [{ text: 'Mengerti! Saya VitaBot, asisten kesehatan AI dari VitaCheck. Siap membantu!' }] },
        ...messages.slice(1).map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      ];

      conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: conversationHistory,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 3000,
            },
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData?.error?.message || `HTTP ${response.status}`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Maaf, saya tidak dapat merespons saat ini. Silakan coba lagi.';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('ChatBot error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Maaf, terjadi kesalahan: ${error.message}\n\nPastikan:\n• Koneksi internet aktif\n• API key valid\n• Dev server sudah di-restart setelah menambah .env`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (q) => {
    sendMessage(q);
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          style={{ height: '500px' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-900 to-primary-500 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-white font-semibold text-sm">VitaBot</p>
                  <Sparkles size={12} className="text-yellow-300" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-white/70 text-xs">Asisten Kesehatan AI</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Tutup chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white mt-0.5 ${
                    msg.role === 'user' ? 'bg-secondary-500' : 'bg-primary-500'
                  }`}
                >
                  {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white rounded-2xl rounded-br-sm whitespace-pre-wrap'
                      : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm shadow-soft border border-gray-100'
                  }`}
                >
                  {msg.role === 'user' ? msg.content : renderMarkdown(msg.content)}
                </div>
              </div>
            ))}

            {/* Quick questions — shown only at the start */}
            {showQuickQ && messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-gray-400 text-center">Pertanyaan cepat:</p>
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="w-full text-left text-xs px-3 py-2 rounded-xl border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors leading-snug"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-primary-500 text-white mt-0.5">
                  <Bot size={13} />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-soft border border-gray-100">
                  <div className="flex gap-1 items-center h-4">
                    <span
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: '160ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                      style={{ animationDelay: '320ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={(el) => {
                  inputRef.current = el;
                  textareaRef.current = el;
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya tentang kesehatan..."
                rows={1}
                className="flex-1 resize-none px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400 leading-snug"
                style={{ minHeight: '40px', maxHeight: '96px' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-primary-500 hover:bg-primary-700 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-200 flex-shrink-0"
                aria-label="Kirim pesan"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 text-center">
              VitaBot dapat salah — verifikasi info penting
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-gray-500 hover:bg-gray-600 rotate-0'
            : 'bg-gradient-to-br from-primary-500 to-primary-900 hover:scale-110 hover:shadow-xl'
        }`}
        aria-label={isOpen ? 'Tutup VitaBot' : 'Buka VitaBot'}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-0'}`}>
          {isOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <MessageCircle size={24} className="text-white" />
          )}
        </div>
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </>
  );
}
