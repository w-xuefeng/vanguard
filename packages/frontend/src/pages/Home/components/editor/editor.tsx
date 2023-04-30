import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import styles from "./editor.less";

export interface IEditorProps<T = string | Record<string, any> | any[]> {
  code: T;
  onSave?: (code?: T) => void;
}

export let editor: monaco.editor.IStandaloneCodeEditor;

export function Editor<T>(props: IEditorProps<T>) {
  const monacoElRef = useRef<HTMLDivElement>(null);
  let resizeObserver: ResizeObserver;

  const getCode = (code?: T) => {
    return typeof code === "object"
      ? JSON.stringify(code, null, 2)
      : (code ?? "") as string;
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
      editor.onKeyDown((e) => {
        if (
          (e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyS &&
          typeof props.onSave === "function"
        ) {
          e.preventDefault();
          props.onSave(props.code);
        }
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
