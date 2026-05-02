'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

/**
 * EHB Affiliate — React Error Boundary
 *
 * Wraps affiliate pages so a render error in one section doesn't take down
 * the entire experience. Shows a friendly fallback with reload/report CTAs.
 *
 * Usage:
 *   <AffiliateErrorBoundary section="Dashboard">
 *     <DashboardTab />
 *   </AffiliateErrorBoundary>
 *
 * Production: errors auto-reported to Sentry via window.Sentry.captureException().
 */

interface Props {
  children: ReactNode;
  /** Optional section name shown in fallback (e.g. "Dashboard", "Wallet") */
  section?: string;
  /** Optional custom fallback — overrides default UI */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** Called when boundary catches an error — useful for logging */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AffiliateErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log to Sentry if available
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: { componentStack: errorInfo.componentStack },
          affiliate: { section: this.props.section },
        },
      });
    }

    // Custom handler
    this.props.onError?.(error, errorInfo);

    // eslint-disable-next-line no-console
    console.error('[AffiliateErrorBoundary]', this.props.section || 'unknown', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback && this.state.error) {
      return this.props.fallback(this.state.error, this.reset);
    }

    const errorMessage = this.state.error?.message || 'Unknown error';
    const errorStack = this.state.error?.stack;
    const section = this.props.section || 'this section';

    return (
      <div className="m-4 rounded-card border-2 border-red-400/40 bg-red-400/5 p-6 sm:p-8">
        <div className="text-center">
          <div className="text-5xl">⚠️</div>
          <h2 className="mt-3 text-xl font-bold text-red-400">
            Something went wrong in {section}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
            We hit an unexpected error rendering this part of the page. The rest of EHB Affiliate is still working.
          </p>

          <div className="mx-auto mt-4 max-w-md rounded-card border border-glass bg-card/40 p-3 text-left">
            <div className="text-[10px] uppercase tracking-wider text-white/40">Error</div>
            <code className="mt-1 block break-all text-[11px] text-red-400">
              {errorMessage}
            </code>
            {process.env.NODE_ENV === 'development' && errorStack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-[10px] text-white/50 hover:text-white/80">
                  Stack trace (dev only)
                </summary>
                <pre className="mt-1 overflow-x-auto whitespace-pre-wrap text-[9px] text-white/60">
                  {errorStack}
                </pre>
              </details>
            )}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={this.reset}
              className="rounded-card border border-purple-light/50 bg-purple-light/10 px-4 py-2 text-sm font-semibold text-purple-light transition hover:bg-purple-light/20"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.location.reload();
              }}
              className="rounded-card border border-glass bg-card/60 px-4 py-2 text-sm hover:border-purple-light"
            >
              ↻ Reload Page
            </button>
            <a
              href="/affiliate"
              className="rounded-card border border-glass bg-card/60 px-4 py-2 text-sm hover:border-teal"
            >
              ← Back to Affiliate Home
            </a>
            <a
              href={`mailto:support@ehb.com?subject=${encodeURIComponent(
                `[Bug] Error in ${section}`
              )}&body=${encodeURIComponent(
                `Error: ${errorMessage}\n\nURL: ${
                  typeof window !== 'undefined' ? window.location.href : ''
                }\n\nWhat I was doing:\n[describe]`
              )}`}
              className="rounded-card border border-amber/40 bg-amber/10 px-4 py-2 text-sm text-amber hover:bg-amber/20"
            >
              📧 Report Bug
            </a>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Functional wrapper for easier inline use.
 *
 *   <ErrorBoundary section="Network Tree">{children}</ErrorBoundary>
 */
export function ErrorBoundary(props: Props) {
  return <AffiliateErrorBoundary {...props} />;
}

export default AffiliateErrorBoundary;
