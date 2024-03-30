"use client";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaImage } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { FiArrowRight } from "react-icons/fi";
import Header from "@/components/header";
import axios from "axios";
import Router from "next/router";
import { useDataContext } from "@/context/dataContext";
import { useRouter } from "next/navigation";
import LoaderRipple from "@/components/LoaderRipple";

interface ChatMessage {
  text: string;
  own: boolean;
  imgLink?: string;
  isLoading?: boolean;
}

interface ChatMsg {
  message: string;
  own: boolean;
  imgLink?: string;
  isLoading?: boolean;
}
interface InputFileProps {
  // You can add any additional props needed
}

const dummyChat: ChatMsg[] = [];
function Chat({ text, own, isLoading = false, imgLink }: ChatMessage) {
  return (
    <div
      className={`${""} ${own && "pt-[20px] pb-[10px]"} ${
        !own && "border-b-[1px] border-zinc-400 pt-[10px] pb-[20px]"
      }`}
    >
      <div
        className={`${""} ${
          own &&
          "p-[10px] bg-white rounded-lg w-fit shadow-[0_0_5px_3px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.07)]"
        }`}
      >
        <Markdown>{text}</Markdown>
        {imgLink && (
          <Image
            src={imgLink}
            alt="user input image"
            width={200}
            height={150}
            className=" mt-2 rounded-md"
          />
        )}
      </div>
      {isLoading && (
        <div className="bg-[#00000099] w-[16px] h-[16px] rounded-full"></div>
      )}
    </div>
  );
}

function ImageChatPopup({
  chatState,
  setChatState,
}: {
  chatState: string;
  setChatState: any;
}) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // on submit func
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const formData: {
      problem: string;
      image: any;
    } = {
      problem: (e.target as HTMLFormElement).problem.value,
      image: selectedFile,
    };

    if (
      formData?.problem?.trim()?.toString() != "" &&
      formData?.image != null
    ) {
      try {
        setChatState("busy");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_PATH}/chatapi/report`,
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        );

        // Reset the form
        (e.target as HTMLFormElement).reset();

        // Redirect to dashboard
        Router.push("/dashboard");
      } catch (error) {
        console.error("Error submitting code:", error);
        setChatState("idle");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-1">
          <FaImage />
          <PiStarFourFill />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat with Image</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1.5 mt-3 gap-2">
                <Input id="name" placeholder="Describe your problem ..." />
                <InputFile
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
                <Button
                  className=" ml-auto w-min"
                  disabled={chatState === "busy" ? true : false}
                >
                  <FiArrowRight />
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function InputFile({ selectedFile, setSelectedFile }: any) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Input id="picture" type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div className=" max-h-[50vh] rounded-md overflow-hidden">
          <Image src={selectedFile} alt="Preview" width={500} height={500} />
        </div>
      )}
    </div>
  );
}

export default function Chatpage() {
  const { authState } = useDataContext();
  const router = useRouter();

  return (
    <>
      {authState === "loading" && (
        <div>
          <LoaderRipple />
        </div>
      )}
      {authState === "loggedin" && <ChatpageInner />}
      {authState === "notloggedin" && router.push("/login")}
    </>
  );
}

function ChatpageInner() {
  const [chat, setChat] = useState<ChatMsg[]>(dummyChat);
  const [chatState, setChatState] = useState<string>("");
  const [chatInit, setChatInit] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);
  const for_scrolling_div_ref = useRef(null);

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Optional, adds smooth scrolling effect
    });
  }
  let { token } = useDataContext();

  useEffect(() => {
    //fetch the old message of the users
    const accessToken = localStorage.getItem("access");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/chatapi/chat/history`,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((data: any) => {
        // console.log(data.data.messages)
        // { message: "Cow is an animal", own: false }

        const new_loaded_chat = data.data.messages.map((m: any) => {
          return { message: m.content, own: m.type === "human" };
        });
        // console.log(new_loaded_chat);
        setChat(new_loaded_chat);
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  async function readStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    s: string
  ) {
    try {
      while (true) {
        const { done, value } = await reader.read();

        // Check if we have reached the end of the stream
        if (done) {
          console.log("End of stream");
          break;
        }
        // Assuming you have a Uint8Array named binaryData
        const decoder = new TextDecoder("utf-8"); // specify the encoding if known, utf-8 is common

        // Convert binary data to a readable string
        const text = decoder.decode(value);
        console.log(text);
        s += text;
        setChat((prev) => {
          const newPrev = [...prev];
          if (newPrev.length > 0 && !newPrev[newPrev.length - 1].own) {
            newPrev[newPrev.length - 1].message = s;
          } else {
            // Otherwise, add a new message to the array
            newPrev.push({ message: s, own: false });
          }
          return newPrev;
        });
      }
    } catch (error) {
      console.error("Error reading stream:", error);
    } finally {
      // Close the reader when done
      reader.releaseLock();
    }
  }

  const handleClick = async () => {
    setChatState("busy");
    setChat((prev) => {
      // Create a new array with the previous messages and add the new message
      const newChat = [...prev, { message: message, own: true }];
      return newChat;
    });

    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PATH}/chatapi/chat`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      // Check if the response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let s = "";
      // Create a ReadableStream reader
      const reader = response.body!.getReader();

      // Define a function to read chunks of data from the stream

      // Start reading the stream
      await readStream(reader, s);
    } catch (error) {
      console.error("Error fetching streaming data:", error);
    }

    setChatState("idle");
  };

  return (
    <div
      className="px-4 bg-zinc-100 flex-grow pagecont"
      ref={for_scrolling_div_ref}
    >
      <div className="py-[65px] min-h-full" ref={mainRef}>
        <div className=" mx-4">
          {/*!chatInit && (
            <div>
              <LoaderRipple />
            </div>
          )*/}
          {/*chatInit && chat.length === 0 && (
            <div className="flex justify-center items-center min-h-[calc(100vh-130px)]">
              <div>
                Having questions about Animals or Pets?
                <br />
                Chat with me now.
              </div>
            </div>
          )*/}
          {
            /*chatInit &&
            chat &&*/
            chat?.map((item, i) => (
              <Chat
                text={item.message}
                isLoading={item.isLoading}
                own={item.own}
                imgLink={item.imgLink}
                key={i}
              />
            ))
          }
        </div>
        <div className="fixed bottom-4 p-[6px] w-[calc(100%-16px*2)] bg-white shadow-[0_0_5px_3px_rgba(0,0,0,0.1),0_0_1px_1px_rgba(0,0,0,0.1)] rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex gap-[6px]"
          >
            <input
              type="text"
              className=" appearance-none border-none outline-none w-full bg-transparent mx-[6px]"
              placeholder="Describe your problem ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {/* <ImageChatPopup chatState={chatState} setChatState={setChatState} /> */}
            <Button
              onClick={() => {
                handleClick();
              }}
              disabled={chatState === "busy" ? true : false}
            >
              <FiArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
