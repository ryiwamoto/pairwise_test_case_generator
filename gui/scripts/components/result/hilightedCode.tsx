import * as React from "react";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import { CopyButton } from "./copyButton";
hljs.registerLanguage("javascript", javascript);

export interface HighlightedCodeProps {
  code: string;
  language: string;
}

export class HighlightedCode extends React.PureComponent<HighlightedCodeProps> {
  private codeRef = React.createRef<HTMLElement>();
  public componentDidMount() {
    this.highlight();
  }

  public componentDidUpdate(): void {
    this.highlight();
  }

  public render() {
    return (
      <div className="highlighted-code">
        <CopyButton
          copyText={this.props.code}
          className="highlighted-code__copy-button"
        />

        <pre className="highlighted-code__pre">
          <code
            ref={this.codeRef}
            className={`language-${this.props.language}`}
          >
            {this.props.code}
          </code>
        </pre>
      </div>
    );
  }

  private highlight = () => {
    if (this.codeRef.current) {
      hljs.highlightBlock(this.codeRef.current);
    }
  };
}
