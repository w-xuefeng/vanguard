import { useEffect, useRef, useState } from "react";
import styles from "./editor.less";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css" || label === "scss" || label === "less") {
      return "./css.worker.bundle.js";
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  },
};

export interface IEditorProps {
  code: string | Record<string, any> | any[];
}

export function Editor(props: IEditorProps) {
  const monacoElRef = useRef<HTMLDivElement>(null);
  let resizeObserver: ResizeObserver;
  let editor: monaco.editor.IStandaloneCodeEditor;

  const getCode = (code?: string | Record<string, any>) => {
    return typeof code === "object"
      ? JSON.stringify(code, null, 2)
      : code ?? "";
  };

  const resizeObserverCallback = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.target === monacoElRef.current) {
        const { width, height } = entry.contentRect;
        editor?.layout({ width, height });
      }
    }
  };

  const initResizeObserver = () => {
    resizeObserver = new ResizeObserver(resizeObserverCallback);
    resizeObserver.observe(monacoElRef.current!);
  };

  useEffect(() => {
    if (monacoElRef.current) {
      editor = monaco.editor.create(monacoElRef.current as HTMLElement, {
        value: getCode(props.code),
        theme: "vs-dark",
        language: "json",
      });
      initResizeObserver();
    }
  }, []);

  useEffect(() => {
    editor?.setValue(getCode(props.code));
  }, [props.code]);

  return (
    <div className={styles["editor-container"]}>
      <div className={styles.editor} ref={monacoElRef}></div>
    </div>
  );
}
