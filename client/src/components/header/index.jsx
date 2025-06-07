import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { setTheme } = useTheme();
  return (
    <>
      <div className="border-b p-4 sticky top-0 left-0 z-10 light:bg-white/65 dark:bg-background/65 backdrop-blur-xl">
        <div className="container mx-auto flex gap-2 justify-between items-center">
          <Link to="/">
            <h1 className="font-bold text-pretty tracking-tight manrope_font text-2xl">
              StudyHive
            </h1>
          </Link>
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
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
