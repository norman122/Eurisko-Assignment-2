import Router from "./react-router/router";
import { useThemeStore } from "./store/theme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  // Retrieve theme from theme store
  const { darkMode } = useThemeStore();

  // Define colors based on theme
  const backgroundColor = darkMode ? 'rgb(30 41 57)' : '#FFFFFF';

  // Set CSS variable dynamically
  document.documentElement.style.setProperty('--color-background', backgroundColor);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
