import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { remarkDisableIndentedCode } from '../lib/remarkDisableIndentedCode';
import { unwrapLeadingMarkdownFence } from '../lib/normalizeMarkdown';

const remarkPlugins = [remarkGfm, remarkDisableIndentedCode];
const rehypePlugins = [rehypeRaw, rehypeSanitize];

type Props = {
  children: string;
};

/** Renders Markdown with GFM, no accidental indented-code blocks, optional sanitized HTML, and leading ```markdown fence unwrap. */
export function MarkdownBody({ children }: Props) {
  const source = unwrapLeadingMarkdownFence(children);
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
      {source}
    </ReactMarkdown>
  );
}
