// src/components/ErrorBoundary/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.css';
import '../../pages/Home/Home.css'; // For button styles

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="error-boundary-page">
                    <div className="error-boundary-content">
                        <h1 className="error-boundary-title">A Fissure in Reality</h1>
                        <p className="error-boundary-message">
                            Something has gone wrong, and the path forward has crumbled.
                            Please refresh the page or return to the main hub.
                        </p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => window.location.replace('/home')}
                        >
                            Return to Sanctuary
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;