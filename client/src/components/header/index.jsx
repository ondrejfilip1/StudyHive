import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, LogOut, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";

export default function Header() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isUser, setIsUser] = useState(localStorage.getItem("token"));
  const [pfpUrl, setPfpUrl] = useState(localStorage.getItem("pfpUrl") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );

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

  return (
    <>
      <div className="border-b px-4 py-2 sticky top-0 left-0 z-10 light:bg-white/65 dark:bg-background/65 backdrop-blur-xl w-full">
        <div className="container mx-auto flex gap-2 justify-between items-center">
          <Link to="/">
            <h1 className="font-bold text-pretty tracking-tight manrope_font text-2xl py-2.5">
              StudyHive
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            {isUser ? (
              <>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-full px-2">
                      <Avatar>
                        <AvatarImage src={pfpUrl} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      {username}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="!w-48">
                    <DropdownMenuLabel>{username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Chat</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <DropdownMenuItem
                          className="w-full"
                          onSelect={(e) => e.preventDefault()}
                        >
                          Log out
                          <LogOut className="ml-auto" />
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            By clicking the Log out button, you will be logged
                            out of your account.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              type="submit"
                              onClick={handleLogOut}
                            >
                              Log out
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}

            <Button
              variant="icon"
              className="hidden dark:inline"
              onClick={() => setTheme("light")}
            >
              <Sun />
            </Button>
            <Button
              variant="icon"
              className="dark:hidden"
              onClick={() => setTheme("dark")}
            >
              <Moon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
