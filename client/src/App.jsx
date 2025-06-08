import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </>
  );
}
