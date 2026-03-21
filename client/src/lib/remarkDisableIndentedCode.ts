import type { Processor } from 'unified';

/**
 * CommonMark treats 4+ space-indented blocks as code. Pasted notes often carry
 * that indentation, so entire answers render as one raw `<pre>`. Fenced blocks
 * (` ``` `) still work; only indented-code is disabled.
 */
export function remarkDisableIndentedCode(this: Processor) {
  const list = this.data('micromarkExtensions') ?? [];
  this.data('micromarkExtensions', [...list, { disable: { null: ['codeIndented'] } }]);
}
