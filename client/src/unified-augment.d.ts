import 'unified';
import type { Extension } from 'micromark-util-types';

declare module 'unified' {
  interface Data {
    micromarkExtensions?: Extension[];
  }
}

export {};
