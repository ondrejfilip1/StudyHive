import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: false,
            classNames: {
              title: "text-base font-normal sora_font",
              actionButton: "!bg-transparent !p-1 !h-7 !w-7 !transition-colors",
              cancelButton: "!bg-transparent !p-1 !h-7 !w-7 !transition-colors",
              closeButton: "!bg-transparent !p-1 !h-7 !w-7 !transition-colors",
            },
          }}
        />
      </ThemeProvider>
    </>
  );
}
