import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-zinc-900">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-md w-full p-8 text-center flex flex-col items-center border border-red-100 dark:border-red-900/30"
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Something went wrong</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              We encountered an unexpected error while loading this page. 
              {this.state.error && <span className="block mt-2 text-xs font-mono opacity-50 bg-black/5 dark:bg-white/5 p-2 rounded text-left overflow-auto max-h-32">{this.state.error.toString()}</span>}
            </p>
            <button 
              onClick={this.handleReload}
              className="btn btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              <RefreshCw size={18} /> Reload Application
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
