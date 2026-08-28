"use client";

import { useRef, useEffect } from "react";

interface MonacoEditorProps {
  themeId: string;
  code: string;
  language: string;
  editorId: string;
}

export default function MonacoEditor({ themeId, code, language, editorId }: MonacoEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    async function init() {
      if (typeof window === "undefined") return;

      window.MonacoEnvironment = {
        getWorker(_workerId: string, label: string) {
          if (label === "json") {
            return new Worker(
              new URL("monaco-editor/esm/vs/language/json/json.worker.js", import.meta.url)
            );
          }
          if (label === "css" || label === "scss" || label === "less") {
            return new Worker(
              new URL("monaco-editor/esm/vs/language/css/css.worker.js", import.meta.url)
            );
          }
          if (label === "html" || label === "handlebars" || label === "razor") {
            return new Worker(
              new URL("monaco-editor/esm/vs/language/html/html.worker.js", import.meta.url)
            );
          }
          if (label === "typescript" || label === "javascript") {
            return new Worker(
              new URL("monaco-editor/esm/vs/language/typescript/ts.worker.js", import.meta.url)
            );
          }
          return new Worker(
            new URL("monaco-editor/esm/vs/editor/editor.worker.js", import.meta.url)
          );
        },
      };

      const monaco = await import("monaco-editor");
      const themeData = (await import("@/data/resources/vscode/webVscodeThemes")).themes[themeId] || (await import("@/data/resources/vscode/webVscodeThemes")).themes.x;
      monaco.editor.defineTheme("xscriptor", themeData.monaco);

      if (!editorRef.current && ref.current) {
        editorRef.current = monaco.editor.create(ref.current, {
          value: code,
          language,
          theme: "xscriptor",
          fontSize: 12,
          fontFamily: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
          lineNumbers: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 12, bottom: 12 },
          bracketPairColorization: { enabled: true },
          automaticLayout: true,
          tabSize: 2,
          cursorStyle: "line",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          wordWrap: "off",
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        });
      } else if (editorRef.current) {
        const model = editorRef.current.getModel();
        if (model) {
          if (model.getValue() !== code) model.setValue(code);
          if (model.getLanguageId() !== language) {
            monaco.editor.setModelLanguage(model, language);
          }
        }
        editorRef.current.updateOptions({ theme: "xscriptor" });
      }
    }

    init();

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [themeId, code, language, editorId]);

  return <div ref={ref} className="absolute inset-0" />;
}
