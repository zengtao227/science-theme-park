/**
 * SB3.02 Biodiversity Module - Error Boundary Component
 * Catches and handles errors gracefully
 */

'use client';

import React, { Component, ReactNode } from 'react';
import { Language } from '@/lib/sb3-02/types';

interface ErrorBoundaryProps {
  children: ReactNode;
  language?: Language;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ModuleErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Module Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const language = this.props.language || 'en';
      const messages = {
        title: {
          en: 'Something went wrong',
          cn: '出了点问题',
          de: 'Etwas ist schief gelaufen',
        },
        description: {
          en: 'An error occurred while loading this content. Please try again.',
          cn: '加载此内容时发生错误。请重试。',
          de: 'Beim Laden dieses Inhalts ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
        },
        retry: {
          en: 'Try Again',
          cn: '重试',
          de: 'Erneut versuchen',
        },
        details: {
          en: 'Error Details',
          cn: '错误详情',
          de: 'Fehlerdetails',
        },
      };

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900">{messages.title[language]}</h3>
                <p className="text-sm text-red-700 mt-1">{messages.description[language]}</p>
              </div>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              {messages.retry[language]}
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-red-900">
                  {messages.details[language]}
                </summary>
                <pre className="mt-2 text-xs bg-red-100 p-3 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
