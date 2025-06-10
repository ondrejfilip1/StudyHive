import { useEffect, useState, Fragment } from "react";
import { io } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import moment from "moment";
import { SOCKET_IO_SERVER_URL } from "@/constants";

const socket = io(SOCKET_IO_SERVER_URL);

export default function ChatWindow(props) {
  const [pfpUrl, setPfpUrl] = useState(localStorage.getItem("pfpUrl") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(
    localStorage.getItem("selectedFriend") || ""
  );

  window.addEventListener("selectedFriendUpdate", () => {
    setSelectedFriend(localStorage.getItem("selectedFriend"));
  });

  useEffect(() => {
    socket.emit("add-user", username);

    socket.on("dm", (data) => {
      setUserMessages((userMessages) => [...userMessages, data]);
    });

    return () => {
      socket.off("dm");
    };
  }, []);

  const sendMessage = () => {
    if (!inputValue || !selectedFriend) return;
    socket.emit("dm", {
      receiverId: selectedFriend,
      message: inputValue,
    });
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="my-2 text-center border-b absolute top-0 block text-xl py-1 pointer-events-none w-full pr-4">
        {selectedFriend}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {userMessages &&
          userMessages.length > 0 &&
          userMessages.map((message, index) => (
            <Fragment key={index}>
              {message.user === "Error" ? (
                <div
                  className={
                    message.user !== username
                      ? "flex flex-col items-center justify-center text-center"
                      : ""
                  }
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {moment(message.time).format("D.M.YYYY HH:mm")}
                  </div>
                  <div className="bg-destructive/25 text-destructive px-3 py-2 inline-block border border-destructive/25 rounded-full">
                    {message.message}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    message.user !== username
                      ? "flex flex-col items-end justify-end"
                      : ""
                  }
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {moment(message.time).format("D.M.YYYY HH:mm")}
                  </div>
                  <div className="bg-sidebar px-3 py-2 inline-block border rounded-full">
                    {message.message}
                  </div>
                </div>
              )}
            </Fragment>
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
        <Button
          variant="icon"
          onClick={sendMessage}
          className="absolute right-4"
        >
          <SendHorizontal />
        </Button>
      </div>
    </>
  );
}
