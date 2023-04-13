export class useStorage {
  /**
   * localStorage
   */
  public static getStorage<T = Record<string, any>>(
    key: string,
    storage: Storage = localStorage,
  ) {
    const ls = storage;
    if (!ls) {
      return undefined;
    }

    let v = ls.getItem(key);
    if (!v) {
      return undefined;
    }

    if (v.indexOf('obj-') === 0) {
      v = v.slice(4);
      return JSON.parse(v) as T;
    }

    if (v.indexOf('str-') === 0) {
      return v.slice(4);
    }

    return undefined;
  }

  public static setStorage(
    key: string,
    value: any,
    storage: Storage = localStorage,
  ) {
    if ([2, 3].includes(arguments.length)) {
      let v = value;
      if (typeof v === 'object') {
        v = JSON.stringify(v);
        v = 'obj-' + v;
      } else {
        v = 'str-' + v;
      }
      const ls = storage;
      if (ls) {
        ls.setItem(key, v);
      }
    }
  }

  public static removeStorage(key: string, storage: Storage = localStorage) {
    const ls = storage;
    if (ls && key) {
      ls.removeItem(key);
    }
  }

  public static clearStorage(storage: Storage = localStorage) {
    const ls = storage;
    if (ls) {
      ls.clear();
    }
  }

  /**
   * sessionStorage
   */
  public static getSession<T = Record<string, any>>(key: string) {
    return this.getStorage<T>(key, sessionStorage);
  }

  public static setSession(key: string, value: any) {
    this.setStorage(key, value, sessionStorage);
  }

  public static removeSession(key: string) {
    this.removeStorage(key, sessionStorage);
  }

  public static clearSession() {
    this.clearStorage(sessionStorage);
  }
}

export function addCSS(
  cssText: string,
  styleId: string = `global-customer-css-${Date.now()}`,
) {
  const styleTag = document.createElement('style');
  styleTag.id = styleId;
  const content = document.createTextNode(cssText);
  styleTag.appendChild(content);
  document.head.appendChild(styleTag);
  return styleTag;
}

export function removeCSS(styleIdOrDom: string | HTMLStyleElement) {
  if (typeof styleIdOrDom === 'string') {
    const style = document.head.querySelector(`#${styleIdOrDom}`);
    style?.remove();
  } else {
    styleIdOrDom?.remove?.();
  }
}

export function addClass(
  dom: string | HTMLElement,
  className: string | string[],
) {
  const classNames = Array.isArray(className) ? className : [className];
  const target = (
    typeof dom === 'string' ? document.querySelector(dom) : dom
  ) as HTMLElement | null;
  if (!target) return;
  classNames.forEach(e => {
    if (!target?.classList?.contains?.(e)) {
      target?.classList?.add?.(e);
    }
  });
}

export function removeClass(
  dom: string | HTMLElement,
  className: string | string[],
) {
  const classNames = Array.isArray(className) ? className : [className];
  const target = (
    typeof dom === 'string' ? document.querySelector(dom) : dom
  ) as HTMLElement | null;
  if (!target) return;
  classNames.forEach(e => {
    if (target?.classList?.contains?.(e)) {
      target.classList.remove(e);
    }
  });
}

export function toggleClass(
  dom: string | HTMLElement,
  className: string | string[],
) {
  const classNames = Array.isArray(className) ? className : [className];
  const target = (
    typeof dom === 'string' ? document.querySelector(dom) : dom
  ) as HTMLElement | null;
  if (!target) return;
  classNames.forEach(e => {
    if (target?.classList?.contains?.(e)) {
      target.classList.remove(e);
    } else {
      target?.classList?.add?.(e);
    }
  });
}

export const JSONSafeParse = <T extends object>(
  text: string,
  reviver?: ((this: any, key: string, value: any) => any) | undefined,
) => {
  try {
    return JSON.parse(text, reviver) as T;
  } catch (error) {
    console.debug('[JSONSafeParse Error]', error);
    return null;
  }
};

export const AorB = (
  condition: boolean | (() => boolean),
  A: JSX.Element | null,
  B: JSX.Element | null,
) => ((typeof condition === 'function' ? condition() : condition) ? A : B);

export const vIf = (condition: boolean | (() => boolean), A: JSX.Element) =>
  AorB(condition, A, null);
