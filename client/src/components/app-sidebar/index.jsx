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
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { getFriends, getUserProfile } from "@/models/Users";

export function AppSidebar() {
  const [pfpUrl, setPfpUrl] = useState(localStorage.getItem("pfpUrl") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "Email");
  const [friends, setFriends] = useState([]);
  const [loadedFriends, setLoadedFriends] = useState([]);

  const loadFriends = async () => {
    const data = await getFriends({ username });
    if (data.status === 200) setFriends(data.payload);
  };

  const loadFriendProfiles = async () => {
    for (let i = 0; i < friends.length; i++) {
      const loadedFriendsData = await getUserProfile(friends[i]);

      // check for duplicates
      if (
        loadedFriends
          .map((item) => item._id)
          .includes(loadedFriendsData.payload._id)
      )
        return;

      setLoadedFriends((loadedFriends) => [
        ...loadedFriends,
        loadedFriendsData.payload,
      ]);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  useEffect(() => {
    loadFriendProfiles();
  }, [friends]);

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline py-1">
                  Friends: {loadedFriends.length}
                </AccordionTrigger>
                <AccordionContent>
                  {loadedFriends &&
                    loadedFriends.length > 0 &&
                    loadedFriends.map((value, index) => (
                      <Button
                        className="h-full w-full px-2 m-0 rounded-xl"
                        variant="ghost"
                        key={index}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={value.pfpUrl}
                            alt={value.username}
                          />
                          <AvatarFallback className="rounded-lg">
                            <User />
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">
                            {value.username}
                          </span>
                          <span className="text-muted-foreground truncate text-xs">
                            {value.email}
                          </span>
                        </div>
                      </Button>
                    ))}
                </AccordionContent>
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
