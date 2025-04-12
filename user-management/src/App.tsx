import Router from "./react-router/router";
import { useThemeStore } from "./store/theme";

function App() {
  // Retrieve theme from theme store
  const { darkMode } = useThemeStore();

  // Define colors based on theme
  const backgroundColor = darkMode ? 'rgb(30 41 57)' : '#FFFFFF';

  // Set CSS variable dynamically
  document.documentElement.style.setProperty('--color-background', backgroundColor);

  return (
    <>
      <Router />
    </>
  )
}

export default App
