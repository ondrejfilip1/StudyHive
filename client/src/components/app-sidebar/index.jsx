import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AppSidebar() {
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
      <SidebarFooter>
        <Button className="h-full w-full" variant="ghost">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src="" alt="" />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Placeholder</span>
            <span className="text-muted-foreground truncate text-xs">
              Email
            </span>
          </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
