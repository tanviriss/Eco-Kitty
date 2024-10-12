// quagga.d.ts
declare module 'quagga' {
  export interface QuaggaJSResultObject {
    codeResult: {
      code: string | null;
      format: string;
    };
  }

  export interface QuaggaJSInitConfig {
    inputStream: {
      name?: string;
      type: 'ImageStream' | 'VideoStream' | 'LiveStream';
      target?: HTMLElement | null;
      constraints?: {
        width?: { min: number };
        height?: { min: number };
        facingMode?: 'environment' | 'user';
        aspectRatio?: { min: number; max: number };
      };
      area?: {
        top?: string;
        right?: string;
        left?: string;
        bottom?: string;
      };
      singleChannel?: boolean;
    };
    locator?: {
      patchSize: string;
      halfSample: boolean;
    };
    numOfWorkers?: number;
    decoder?: {
      readers: string[];
    };
    locate?: boolean;
  }

  export function init(
    config: QuaggaJSInitConfig,
    callback?: (err: any) => void
  ): void;

  export function start(): void;

  export function stop(): void;

  export function onDetected(callback: (result: QuaggaJSResultObject) => void): void;

  export function offDetected(callback: (result: QuaggaJSResultObject) => void): void;
}