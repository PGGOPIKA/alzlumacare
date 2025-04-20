import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <Router>
          {/* Routes */}
        </Router>
      </SettingsProvider>
    </ErrorBoundary>
  );
}