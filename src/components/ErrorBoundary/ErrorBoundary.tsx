import { Component, type ReactNode } from "react";
import styled from "@emotion/styled";
import { getLogger } from "../../logger";

const log = getLogger("ui:error-boundary");

interface Props {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  readonly hasError: boolean;
  readonly error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.error};
  border-radius: ${({ theme }) => theme.radius.md};
  margin: 1rem;
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.error};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 500px;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const ErrorDetails = styled.details`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: ${({ theme }) => theme.radius.sm};
  width: 100%;
  max-width: 600px;

  summary {
    cursor: pointer;
    color: ${({ theme }) => theme.text.secondary};
  }

  pre {
    margin-top: 0.5rem;
    padding: 0.5rem;
    overflow-x: auto;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.error};
  }
`;

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    log.error("Uncaught error: {}", error.message);
    log.error("Component stack: {}", errorInfo.componentStack);

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  readonly handleRetry = (): void => {
    log.info("User triggered error recovery");
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. Please try again or
            refresh the page.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>Try Again</RetryButton>
          {this.state.error && (
            <ErrorDetails>
              <summary>Error Details</summary>
              <pre>{this.state.error.message}</pre>
              <pre>{this.state.error.stack}</pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
