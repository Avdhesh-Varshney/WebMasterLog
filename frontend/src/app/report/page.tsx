"use client";
import { useRef, useState, ChangeEvent } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDataContext } from "@/context/dataContext";
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

function InputFile({ selectedFile, setSelectedFile, myfile, setMyfile }: any) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        setMyfile(file);
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

export default function Reportpage() {
  const { authState } = useDataContext();
  const router = useRouter();

  return (
    <>
      {authState === "loading" && (
        <div>
          <LoaderRipple />
        </div>
      )}
      {authState === "loggedin" && <ReportpageInner />}
      {authState === "notloggedin" && router.push("/login")}
    </>
  );
}

function ReportpageInner() {
  const [curstate, setCurstate] = useState<string>("idle");
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [myfile, setMyfile] = useState<any>(null);

  async function handleForm(e: React.SyntheticEvent) {
    e.preventDefault();

    const formData: {
      problem: string;
      image: any;
    } = {
      problem: (e.target as HTMLFormElement).problem.value,
      image: myfile,
    };

    if (
      formData?.problem?.trim()?.toString() != "" &&
      formData?.image != null
    ) {
      try {
        setCurstate("busy");
        const token = localStorage.getItem("access");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_PATH}/chatapi/report`,
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }
        );

        // Reset the form
        (e.target as HTMLFormElement).reset();

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Error submitting code:", error);
        setCurstate("idle");
      }
    }
  }

  return (
    <div className="px-4 bg-zinc-100 flex-grow pagecont">
      <div className="py-[65px] min-h-full">
        <div className=" mx-4 md:mx-auto w-auto md:w-2/3 lg:w-1/2 mt-5">
          <form onSubmit={handleForm}>
            <Card className="shadow-[rgba(0,0,0,0.2)_0_0_10px,rgba(0,0,0,0.2)_0_0_1px]">
              <CardHeader>
                <CardTitle>Generate Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Label>Describe your Problem</Label>
                  <Textarea
                    name="problem"
                    className=" resize-y min-h-[150px]"
                    placeholder="Describe your problem ..."
                  />
                  <br />
                  <Label>Provide with relevent image</Label>
                  <InputFile
                    name="image"
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    setMyfile={setMyfile}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={curstate === "busy" ? true : false}
                  className="ml-auto"
                >
                  <span className="">
                    {" "}
                    {curstate === "busy" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <span>Submit {"->"}</span>
                    )}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
