// npm i lucide-react react-markdown react-syntax-highlighter @gsap/react gsap

// src/components/ChatBot.jsx

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Send, Bot, User } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `**Welcome to Lexide AI**  

I'm your expert legal co-pilot — trained on millions of cases, statutes, and contracts.

Ask me anything:  
• Draft an NDA or employment agreement  
• Explain a law in simple terms  
• Review a contract for risks  
• Find case law or precedents  

How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState(""); // Live typing

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Network error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          try {
            const json = JSON.parse(line.slice(6));
            const token = json.choices?.[0]?.delta?.content || "";
            if (token) {
              setStreamingContent((prev) => prev + token);
            }
          } catch {}
        }
      }
    } catch (err) {
      setStreamingContent("Connection lost. Please try again.");
    } finally {
      setLoading(false);
      if (streamingContent) {
        setMessages((prev) => [...prev, { role: "assistant", content: streamingContent }]);
        setStreamingContent("");
      }
    }
  };

  // Auto scroll
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamingContent]);

  // GSAP only on full messages
  useEffect(() => {
    gsap.fromTo(
      ".message-item:not(.streaming)",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [messages]);

  useEffect(() => inputRef.current?.focus(), []);

  const CodeBlock = ({ children, className }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).replace(/\n$/, "");

    const copy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative group my-6 -mx-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
        <div className="absolute top-0 right-0 p-3 z-10">
          <button
            onClick={copy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              copied ? "bg-green-600 text-white" : "bg-white/80 hover:bg-white text-gray-700 shadow-md"
            }`}
          >
            {copied ? <>Copied!</> : <>Copy</>}
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={match?.[1] || "text"}
          PreTag="div"
          customStyle={{ margin: 0, padding: "3.5rem 1.5rem 1.5rem", borderRadius: "1rem" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-300"
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-item flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex-shrink-0 flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}

              <div
                className={`max-w-2xl px-6 py-4 rounded-3xl shadow-md border backdrop-blur-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-700"
                    : "bg-white/90 text-gray-800 border-gray-200"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown
                    components={{
                      code: ({ inline, className, children }) =>
                        inline ? (
                          <code className="bg-gray-200 text-gray-800 px-2.5 py-1 rounded-lg font-medium text-sm">
                            {children}
                          </code>
                        ) : (
                          <CodeBlock className={className}>{children}</CodeBlock>
                        ),
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-blue-700 mt-5 mb-3">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-semibold text-blue-600 mt-4 mb-2">{children}</h2>,
                      strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                      ul: ({ children }) => <ul className="list-disc pl-6 my-3 space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-6 my-3 space-y-2">{children}</ol>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-5 py-2 italic text-gray-700 bg-blue-50/50 rounded-r-lg my-4">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-lg leading-relaxed">{msg.content}</p>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex-shrink-0 flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* LIVE STREAMING MESSAGE */}
          {streamingContent && (
            <div className="message-item streaming flex gap-4 justify-start">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex-shrink-0 flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="max-w-2xl px-6 py-4 rounded-3xl bg-white/90 border border-gray-200 shadow-md min-h-[60px]">
                <ReactMarkdown content={streamingContent} />
              </div>
            </div>
          )}

          {/* Loading dots when waiting for first token */}
          {loading && !streamingContent && (
            <div className="flex gap-4 justify-start">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="bg-white/90 px-6 py-4 rounded-3xl shadow-md border border-gray-200">
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />
                  <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150" />
                  <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex gap-4 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about laws, contracts, cases, or draft documents..."
              className="flex-1 px-6 py-4 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 placeholder-gray-500 text-gray-800 text-lg"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl shadow-xl transition-all disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
            Lexide AI provides insights • Always verify with a licensed advocate
          </p>
        </div>
      </div>
    </div>
  );
}

// Tiny helper to avoid re-creating components on every token
const Markdown = React.memo(({ content }) => (
  <ReactMarkdown
    components={{
      code: ({ inline, className, children }) => {
        if (inline) {
          return <code className="bg-gray-200 text-gray-800 px-2.5 py-1 rounded-lg font-medium text-sm">{children}</code>;
        }
        const match = /language-(\w+)/.exec(className || "");
        const codeString = String(children).replace(/\n$/, "");
        const [copied, setCopied] = useState(false);
        const copy = async () => {
          await navigator.clipboard.writeText(codeString);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        };
        return (
          <div className="relative group my-6 -mx-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <button
              onClick={copy}
              className="absolute top-3 right-3 z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white/80 hover:bg-white shadow-md transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <SyntaxHighlighter style={oneDark} language={match?.[1] || "text"} PreTag="div"
              customStyle={{ margin: 0, padding: "3.5rem 1.5rem 1.5rem", borderRadius: "1rem" }}>
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      },
      // keep your other components (h1, ul, etc.)
    }}
  >
    {content}
  </ReactMarkdown>
));

// ORIGINAL NON-STREAMING FUNCTION
// const sendMessage = async () => {
//   if (!input.trim() || loading) return;

//   const userMessage = { role: "user", content: input.trim() };
//   const updatedMessages = [...messages, userMessage];

//   setMessages(updatedMessages);
//   setInput("");
//   setLoading(true);

//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "Referer": window.location.origin,
//         "X-Title": "Lexide AI",
//       },
//       body: JSON.stringify({
//         model: "mistralai/devstral-2512:free",
//         messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
//       }),
//     });

//     if (!res.ok) throw new Error(`API Error: ${res.status}`);

//     const data = await res.json();
//     const reply = data.choices?.[0]?.message?.content || "I'm having trouble responding. Please try again.";

//     setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
//   } catch (err) {
//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", content: `Connection Error: ${err.message}\n\nPlease check your internet or API key.` },
//     ]);
//   } finally {
//     setLoading(false);
//   }
// };