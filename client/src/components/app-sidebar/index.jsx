import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { User } from "lucide-react";

export function AppSidebar() {
  const [pfpUrl, setPfpUrl] = useState(localStorage.getItem("pfpUrl") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "Email");
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline py-1">
                  Friends: {0}
                </AccordionTrigger>
                <AccordionContent>Friends list</AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline py-1">
                  Chats: {0}
                </AccordionTrigger>
                <AccordionContent>Chat list</AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-0">
        <Button className="h-full w-full px-2 m-0 rounded-xl" variant="ghost">
          <Avatar className="h-8 w-8">
            <AvatarImage src={pfpUrl} alt={username} />
            <AvatarFallback className="rounded-lg">
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{username}</span>
            <span className="text-muted-foreground truncate text-xs">
              {email}
            </span>
          </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
