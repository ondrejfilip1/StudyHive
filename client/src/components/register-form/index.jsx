import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/img/logo_no_gradient.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addUser } from "@/models/Users";

export function RegisterForm({ className, ...props }) {
  const [formData, setFormData] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const postForm = async (e) => {
    e.preventDefault();
    const data = await addUser(formData);
    if (data.status === 200) {
      navigate("/app");
    }

    setMessage(data.message);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={postForm}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Get started</h1>
                <p className="text-muted-foreground text-balance">
                  Create your StudyHive account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  type="string"
                  placeholder="Andrew"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="repeat_password">Repeat password</Label>
                <Input
                  name="repeat_password"
                  id="repeat_password"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={Logo}
              alt="StudyHive logo"
              className="background_color absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
