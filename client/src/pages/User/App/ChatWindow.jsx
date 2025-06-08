import { useEffect, useState, Fragment } from "react";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import moment from "moment";

const socket = io("http://localhost:4000/");
export default function ChatWindow() {
  const [pfpUrl, setPfpUrl] = useState(localStorage.getItem("pfpUrl") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    socket.emit("add-user", username);

    socket.on("chat", (data) => {
      setUserMessages((userMessages) => [...userMessages, data]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);

  const sendMessage = () => {
    if (!inputValue) return;
    socket.emit("chat", inputValue);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {userMessages &&
          userMessages.length > 0 &&
          userMessages.map((message, index) => (
            <div
              key={index}
              className={
                message.user !== username
                  ? "flex flex-col items-end justify-end"
                  : ""
              }
            >
              <div className="text-sm text-muted-foreground ">
                {message.user} -{" "}
                {moment(message.time).format("D.M.YYYY HH:mm")}
              </div>
              <div className="bg-sidebar px-3 py-2 inline-block border rounded-full">
                {message.message}
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-2 absolute bottom-2 left-2 w-full pr-4">
        <Input
          type="text"
          value={inputValue}
          placeholder="Enter message"
          onChange={handleChange}
          autoComplete="none"
          onKeyPress={(e) => {
            console.log(e);
            if (e.code === "Enter") sendMessage();
          }}
        />
        <Button variant="icon" onClick={sendMessage} className="absolute right-4">
          <SendHorizontal />
        </Button>
      </div>
    </>
  );
}
