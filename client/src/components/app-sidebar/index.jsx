import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import {
  User,
  LogOut,
  X,
  UserPlus,
  UserPen,
  MessageCircle,
  Settings,
  EllipsisVertical,
  UserRoundX,
  Ban,
} from "lucide-react";
import { addFriend, getFriends, getUserProfile } from "@/models/Users";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function AppSidebar() {
  const [pfpUrl, setPfpUrl] = useState(localStorage.getItem("pfpUrl") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "Email");
  const [friends, setFriends] = useState([]);
  const [loadedFriends, setLoadedFriends] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUser, setIsUser] = useState(localStorage.getItem("token"));
  const [friendUsername, setFriendUsername] = useState("");

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

  const handleLogOut = () => {
    setIsUser(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("pfpUrl");
    localStorage.removeItem("dev");

    toast("You have been logged out.", {
      cancel: {
        label: <X />,
      },
    });

    setOpen(false);
  };

  const handleFriendSelect = (friend) => {
    window.dispatchEvent(new Event("selectedFriendUpdate"));
    localStorage.setItem("selectedFriend", friend);
  };

  const handleFriendInput = (e) => {
    setFriendUsername(e.target.value);
  };

  const handleSendRequest = async () => {
    // TODO
    if (!friendUsername) return;
    const data = await addFriend({ username, friendUsername });
    if (data.status === 200) {
      toast(`User ${friendUsername} has been added to friends`, {
        cancel: {
          label: <X />,
        },
      });
    } else {
      toast(`User ${friendUsername} was not found`, {
        cancel: {
          label: <X />,
        },
      });
    }
    setFriendUsername("");
  };

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
                        onClick={() => handleFriendSelect(value.username)}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="icon" className="!p-1 h-6">
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <MessageCircle />
                              Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              <UserRoundX />
                              Remove friend
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                              <Ban />
                              Block
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Button>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline py-1">
                  Notifications: {0}
                </AccordionTrigger>
                <AccordionContent>Notification list</AccordionContent>
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
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-full w-full px-2 m-0 rounded-xl"
              variant="ghost"
            >
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="!w-60">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={pfpUrl} alt={username} />
                  <AvatarFallback className="rounded-full">
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{username}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserPen />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageCircle />
              Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger className="w-full">
                <DropdownMenuItem
                  className="w-full"
                  onSelect={(e) => e.preventDefault()}
                >
                  <UserPlus />
                  Add friend
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add friend</DialogTitle>
                </DialogHeader>
                <Input
                  type="text"
                  placeholder="Enter friend's name"
                  onChange={handleFriendInput}
                  value={friendUsername}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" onClick={handleSendRequest}>
                      Send request
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger className="w-full">
                <DropdownMenuItem
                  className="w-full"
                  onSelect={(e) => e.preventDefault()}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    By clicking the Log out button, you will be logged out of
                    your account.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" onClick={handleLogOut}>
                      Log out
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
