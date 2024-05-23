import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import React from "react";

interface Record {
  timestamp: string;
  analysis: string;
}
import Image from "next/image";

const Recordviewer = React.forwardRef(
  (
    { data }: { data: any | null },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Dialog>
        <DialogTrigger
          ref={ref as React.LegacyRef<HTMLButtonElement>}
        ></DialogTrigger>
        <DialogContent className="flex flex-col font-mono max-w-fit">
          {data && (
            <DialogHeader>
              <DialogTitle className="text-left">Report</DialogTitle>
              <DialogDescription
                className="text-black flex flex-col w-full overflow-auto max-h-[calc(100vh-60px*2)] p-1"
                asChild
              >
                <div className="text-left">
                  <Label className="my-1 text-lg">Timestamp</Label>
                  <div className="my-1">
                    {new Date(data.created_at).toString()}
                  </div>
                  <Label className="my-1 text-lg">Image</Label>
                  <div className="my-1">
                    {/* <Image src={data.image_url} height={200} width={200} alt="image" /> */}
                    <img src={data.image_url} height={200} width={200} alt="image" />
                  </div>

                  <Label className="my-1 text-lg">Analysis</Label>
                  <div className="w-full">
                    <pre className="rounded-lg bg-slate-100 p-2 overflow-auto">
                      {data.report}
                    </pre>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);
Recordviewer.displayName = "Recordviewer";

export default Recordviewer;
