import React, { useState, useRef, useEffect } from 'react';
import { FiLink, FiCopy, FiCheck, FiChevronDown, FiChevronUp, FiCpu } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { FaChartBar, FaBook, FaRegUser, FaImage } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import "./Ai.css";
import Cookies from 'js-cookie';
import { trackUserAction } from '../../Utility/ActivityLogger';
import { useUser } from '../../Utility/UserDetails';

// ─── Thinking Process Collapsible Component ──────────────────────────────────
function ThinkingAccordion({ thinkingText, isThinking = false, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    // Automatically keep open while active thinking is streaming in
    if (isThinking) {
      setIsOpen(true);
    }
  }, [isThinking]);

  if (!thinkingText) return null;

  return (
    <div className="w-full mb-3.5 rounded-2xl overflow-hidden border border-white/20 bg-black/30 backdrop-blur-md transition-all shadow-md text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white/10 hover:bg-white/15 transition-colors text-left text-xs text-purple-100 font-medium select-none cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {isThinking ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-400"></span>
            </span>
          ) : (
            <FiCpu className="text-purple-300 text-sm" />
          )}
          <span className="font-semibold tracking-wide flex items-center gap-1.5">
            {isThinking ? (
              <span className="text-purple-200 animate-pulse">Thinking Process (Cloura)...</span>
            ) : (
              <span className="text-purple-200">Thought Process (Cloura)</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-purple-200/80 bg-black/20 px-2 py-0.5 rounded-lg border border-white/10">
          <span>{isOpen ? "Hide reasoning" : "View reasoning"}</span>
          {isOpen ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3.5 text-[12px] font-mono leading-relaxed text-purple-100/90 bg-black/25 max-h-56 overflow-y-auto custom-scrollbar border-t border-white/10 whitespace-pre-wrap select-text">
          {thinkingText}
          {isThinking && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-purple-300 animate-pulse align-middle" />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Code Block Component with Copy Button ────────────────────────────────────
function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-2xl overflow-hidden border border-white/15 bg-[#16161e] shadow-xl text-left">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1f1f2e] border-b border-white/10 text-xs text-gray-300 select-none">
        <span className="font-mono uppercase tracking-wider text-[11px] text-purple-300 font-semibold">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-gray-200 transition-all text-xs cursor-pointer focus:outline-none"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-400 text-sm" />
              <span className="text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy className="text-sm" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed custom-scrollbar bg-[#16161e]">
        <SyntaxHighlighter
          language={language || "text"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "13px",
            lineHeight: "1.5"
          }}
          wrapLongLines={true}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// ─── Markdown Renderer with Code and Table Formatting ────────────────────────
function MarkdownMessage({ content, isUser = false }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ _node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");

          if (!inline && (match || codeString.includes("\n"))) {
            return (
              <CodeBlock
                language={match ? match[1] : ""}
                value={codeString}
              />
            );
          }

          return (
            <code
              className={`px-1.5 py-0.5 rounded text-xs font-mono font-medium ${
                isUser
                  ? "bg-black/10 text-purple-900 border border-black/10"
                  : "bg-black/30 text-purple-200 border border-white/10"
              }`}
              {...props}
            >
              {children}
            </code>
          );
        },
        table({ children }) {
          return (
            <div
              className={`overflow-x-auto my-3 rounded-2xl border shadow-sm ${
                isUser ? "border-black/10 bg-white/40" : "border-white/20 bg-black/25"
              }`}
            >
              <table className="w-full border-collapse text-left text-xs">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return (
            <thead
              className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                isUser
                  ? "bg-black/10 text-gray-800 border-black/10"
                  : "bg-purple-950/60 text-purple-200 border-white/20"
              }`}
            >
              {children}
            </thead>
          );
        },
        th({ children }) {
          return <th className="px-4 py-3 font-semibold">{children}</th>;
        },
        tbody({ children }) {
          return (
            <tbody
              className={`divide-y ${
                isUser ? "divide-black/10 text-gray-900" : "divide-white/10 text-white/90"
              }`}
            >
              {children}
            </tbody>
          );
        },
        tr({ children }) {
          return (
            <tr
              className={`transition-colors ${
                isUser ? "hover:bg-black/5" : "hover:bg-white/5"
              }`}
            >
              {children}
            </tr>
          );
        },
        td({ children }) {
          return <td className="px-4 py-2.5 leading-relaxed">{children}</td>;
        },
        p({ children }) {
          return <p className="mb-2.5 last:mb-0 leading-relaxed">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc pl-5 mb-2.5 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal pl-5 mb-2.5 space-y-1">{children}</ol>;
        },
        li({ children }) {
          return <li className="leading-relaxed">{children}</li>;
        },
        blockquote({ children }) {
          return (
            <blockquote
              className={`border-l-4 pl-4 py-1 my-2.5 rounded-r-xl italic ${
                isUser
                  ? "border-purple-600 bg-black/5 text-gray-800"
                  : "border-purple-300 bg-white/10 text-purple-100"
              }`}
            >
              {children}
            </blockquote>
          );
        },
        h1({ children }) {
          return <h1 className="text-base font-bold my-2">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-sm font-bold my-2">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-xs font-bold my-1.5">{children}</h3>;
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline font-medium hover:opacity-80 transition-opacity ${
                isUser ? "text-purple-700" : "text-purple-200"
              }`}
            >
              {children}
            </a>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ─── Main AI Component ────────────────────────────────────────────────────────
function AI() {
  const [doubtQuery, setDoubtQuery] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [streamedThinking, setStreamedThinking] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const { userDetails } = useUser();
  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      content: `Hello From ${userDetails?.user_name || "Student"}! What's up?`
    },
    {
      role: "assistant",
      content: "I am doing great! Ask me any coding doubt or concept, and I will explain with clean code and tables."
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change or stream updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, streamedAnswer, streamedThinking, isProcessing]);

  const handleAskDoubt = async () => {
    const query = doubtQuery.trim();
    if (!query || isProcessing) return;

    // 1. Add user question to history and clear input field
    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        content: query
      }
    ]);
    setDoubtQuery("");
    setIsProcessing(true);
    setStreamedAnswer("");
    setStreamedThinking("");
    setIsThinking(true);

    try {
      const response = await fetch("http://localhost:3000/doubts/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          doubt: query,
          context: chatHistory,
          user_id: Cookies.get("user_id")
        })
      });

      trackUserAction("AI_LEARN", "Learned with AI", `Asked AI: ${query.slice(0, 70)}`);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("ReadableStream not supported by the browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let isStreamComplete = false;
      let accumulatedThinking = "";
      let accumulatedAnswer = "";
      let lineBuffer = "";

      // 2. Read stream chunk by chunk and parse NDJSON lines (thinking first, then content)
      while (!isStreamComplete) {
        const { value, done } = await reader.read();
        isStreamComplete = done;

        if (value) {
          lineBuffer += decoder.decode(value, { stream: !isStreamComplete });
          const lines = lineBuffer.split("\n");
          lineBuffer = lines.pop() || "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            try {
              const chunkObj = JSON.parse(trimmedLine);
              if (chunkObj.type === "thinking") {
                accumulatedThinking += chunkObj.content;
                setStreamedThinking(accumulatedThinking);
                setIsThinking(true);
              } else if (chunkObj.type === "content") {
                accumulatedAnswer += chunkObj.content;
                setStreamedAnswer(accumulatedAnswer);
                setIsThinking(false);
              } else if (chunkObj.type === "done") {
                setIsThinking(false);
              }
            } catch {
              // Backward compatibility fallback for raw text stream
              accumulatedAnswer += trimmedLine;
              setStreamedAnswer(accumulatedAnswer);
            }
          }
        }
      }

      // Flush remaining lineBuffer if any
      if (lineBuffer.trim()) {
        try {
          const chunkObj = JSON.parse(lineBuffer.trim());
          if (chunkObj.type === "thinking") {
            accumulatedThinking += chunkObj.content;
          } else if (chunkObj.type === "content") {
            accumulatedAnswer += chunkObj.content;
          }
        } catch {
          accumulatedAnswer += lineBuffer.trim();
        }
      }

      // 3. Commit the complete accumulated answer and thoughts to chat history
      if (accumulatedAnswer.trim() || accumulatedThinking.trim()) {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            content: accumulatedAnswer || "Here is the response.",
            thinking: accumulatedThinking.trim() || null
          }
        ]);
      }
      setStreamedAnswer("");
      setStreamedThinking("");
      setIsThinking(false);
    } catch (error) {
      console.error("Error during streaming:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, an error occurred while generating the answer. Please try again."
        }
      ]);
      setStreamedAnswer("");
      setStreamedThinking("");
      setIsThinking(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* 1. Outer container remains strictly bounded to the screen height */}
      <div className="w-full h-full p-6 flex flex-col box-border relative">

        <div className="flex items-center gap-4 mb-6 shrink-0">
          <img
            src="/Dashboard/Courses/Back.svg"
            alt="Back"
            className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => window.history.back()}
          />
          <h1 className="text-2xl font-bold text-gray-900 history-page-title tracking-tight">AI</h1>
        </div>

        {/* 2. Main content area */}
        <div className='mainContent flex flex-col flex-1 min-h-0 w-full'>

          {/* 3. The answer/chat container handles scrolling */}
          <div
            id='answerDiv'
            className="white small-box-shadow text-white w-[95%] md:w-[760px] flex-1 rounded-3xl p-7 px-8 m-2 mx-auto overflow-y-auto custom-scrollbar"
          >
            <div className="w-full text-black">

              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=Cloura"
                  alt="Cloura AI"
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-2xl font-medium">Cloura AI</h2>
              </div>

              {/* Chat Messages */}
              <div className="flex flex-col gap-6">
                {chatHistory.map((chat, index) => {
                  const isUser = chat.role === "user";
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3.5 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <img
                          src="https://api.dicebear.com/7.x/bottts/svg?seed=Cloura"
                          alt="AI"
                          className="w-10 h-10 rounded-full shrink-0 shadow-sm mt-1"
                        />
                      )}

                      <div
                        className={`rounded-3xl p-4 px-6 text-sm leading-relaxed small-box-shadow ${
                          isUser
                            ? "bg-gradient-to-b from-[#d8d8f5] to-[#a8a8df] text-black max-w-[80%]"
                            : "bg-gradient-to-r from-[#6c63ff] to-[#8b84ff] text-white w-full max-w-[88%]"
                        }`}
                      >
                        {!isUser && chat.thinking && (
                          <ThinkingAccordion
                            thinkingText={chat.thinking}
                            isThinking={false}
                            defaultOpen={false}
                          />
                        )}
                        <MarkdownMessage content={chat.content} isUser={isUser} />
                      </div>

                      {isUser && (
                        <img
                          src={userDetails?.image || "/About-us/members/Anshul.png"}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm mt-1"
                        />
                      )}
                    </div>
                  );
                })}

                {/* Live Streamed AI Response (Thinking First, then Answer) */}
                {(streamedAnswer || streamedThinking) && (
                  <div className="flex items-start gap-3.5 justify-start">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=Cloura"
                      alt="Cloura"
                      className="w-10 h-10 rounded-full shrink-0 shadow-sm mt-1"
                    />

                    <div className="small-box-shadow bg-gradient-to-r from-[#6c63ff] to-[#8b84ff] px-6 py-4 rounded-3xl w-full max-w-[88%] text-white text-sm leading-relaxed">
                      {streamedThinking && (
                        <ThinkingAccordion
                          thinkingText={streamedThinking}
                          isThinking={isThinking}
                          defaultOpen={true}
                        />
                      )}
                      {streamedAnswer ? (
                        <>
                          <MarkdownMessage content={streamedAnswer} isUser={false} />
                          <span className="inline-block w-2 h-4 ml-1 bg-white/80 animate-pulse align-middle" />
                        </>
                      ) : isThinking ? (
                        <div className="text-xs text-purple-100/90 italic flex items-center gap-2 pt-1 font-sans">
                          <span>Formulating structured answer...</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                {/* Initial Thinking Indicator while waiting for first chunk */}
                {isProcessing && !streamedAnswer && !streamedThinking && (
                  <div className="flex items-center gap-3.5 justify-start">
                    <img
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=Cloura"
                      alt="Cloura"
                      className="w-10 h-10 rounded-full shrink-0 shadow-sm"
                    />
                    <div className="small-box-shadow bg-gradient-to-r from-[#6c63ff] to-[#8b84ff] px-5 py-3 rounded-3xl text-white text-xs flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span>Cloura is initializing thought process...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

            </div>
          </div>

          {/* Input & Action Bar */}
          <div className='flex w-full mt-6 shrink-0 justify-center'>
            <div className="relative w-[760px]">

              <FiLink
                onClick={() => setShowMenu(!showMenu)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C63FF] text-lg cursor-pointer z-10"
              />

              {showMenu && (
                <div className="absolute bottom-16 left-0 w-48 white small-box-shadow rounded-3xl p-5 z-50 text-black">
                  <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#6C63FF] transition-colors">
                    <FaChartBar />
                    <span className="text-xs font-semibold">Your Progress</span>
                  </div>

                  <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#6C63FF] transition-colors">
                    <FaBook />
                    <span className="text-xs font-semibold">Your Course</span>
                  </div>

                  <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#6C63FF] transition-colors">
                    <FaRegUser />
                    <span className="text-xs font-semibold">Your Profile</span>
                  </div>

                  <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#6C63FF] transition-colors">
                    <FaImage />
                    <span className="text-xs font-semibold">Images</span>
                  </div>
                </div>
              )}

              <input
                type='text'
                placeholder={
                  isProcessing
                    ? isThinking
                      ? "Cloura is thinking through your doubt..."
                      : "Cloura is typing answer..."
                    : "Hye I have a doubt..."
                }
                className='border w-full pl-12 pr-12 h-12 rounded-full px-3 text-sm text-black placeholder-gray-550 white small-box-shadow disabled:opacity-60'
                value={doubtQuery}
                onChange={(e) => setDoubtQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isProcessing) {
                    handleAskDoubt();
                  }
                }}
                disabled={isProcessing}
              />

              <button
                type="button"
                onClick={handleAskDoubt}
                disabled={isProcessing || !doubtQuery.trim()}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black text-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity focus:outline-none"
              >
                <IoSend />
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AI;