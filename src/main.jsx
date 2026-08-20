import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("HydStartupArena caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl font-black">
              🚀
            </div>
            <h1 className="text-xl font-black text-white">HydStartupArena</h1>
            <p className="text-xs text-slate-400">
              Something went wrong loading the portal on this device.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-rose-400 text-left font-mono break-all max-h-32 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch (e) {}
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              Clear Cache & Reload Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
