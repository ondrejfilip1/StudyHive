import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatWindow from "./ChatWindow";

export default function App() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-2 relative h-full">
            <SidebarTrigger />
            <ChatWindow />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
