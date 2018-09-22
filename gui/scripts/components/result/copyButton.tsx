import * as React from "react";
import ClicpBoardJs from "clipboard";
import classnames from "classnames";

export interface CopyButtonProps {
  className?: string;
  copyText: string;
}

export interface CopyButtonState {
  isCopied: boolean;
}

export class CopyButton extends React.PureComponent<CopyButtonProps> {
  public state: CopyButtonState = {
    isCopied: false
  };
  private buttonRef = React.createRef<HTMLButtonElement>();

  private clipboard: ClipboardJS | null = null;

  public componentDidMount(): void {
    if (this.buttonRef.current) {
      this.clipboard = new ClicpBoardJs(this.buttonRef.current);
      this.clipboard.on("success", this.onCopy);
    }
  }

  public componentWillUnmount(): void {
    if (this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = null;
    }
  }

  public render() {
    return (
      <button
        className={classnames("button", "is-small", this.props.className, {
          "is-success": this.state.isCopied
        })}
        ref={this.buttonRef}
        data-clipboard-text={this.props.copyText}
      >
        {this.state.isCopied ? (
          <>
            <i className="fas fa-check" />
            &nbsp;Copied
          </>
        ) : (
          "Copy to clipboard"
        )}
      </button>
    );
  }

  private onCopy = () => {
    this.setState({
      isCopied: true
    });
  };
}
