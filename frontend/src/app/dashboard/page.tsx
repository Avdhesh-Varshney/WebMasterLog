"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import formatRelativeTime from "@/utils/formatRelativeTime";
import axios from "axios";
import Recordviewer from "@/components/Recordviewer";
import LoaderRipple from "@/components/LoaderRipple";
import { useDataContext } from "@/context/dataContext";
import { useRouter } from "next/navigation";

interface Record {
  timestamp: string;
  analysis: string;
}

let dummyData = [
  {
    timestamp: "2024-03-28T16:02:47.261Z",
    analysis: "fdvbi uiv trdsufibirhtiurudbriu biuvb r ir ibriub iuur",
  },
  {
    timestamp: "2024-03-28T16:05:16.526Z",
    analysis:
      "fdvbi uiv trdsufibirhtiurudbriu biuvb r ir ibriub iuurjk vbdjl bsivri ivse iguesgud ivgrusod housur tugohg tuorsd guotrhod orhobrou vor tdv otvguo",
  },
  {
    timestamp: "2024-03-28T15:55:41.463Z",
    analysis: "fdvbi uiv trdsufibirhtiurudbriu biuvb r ir ibriub iuur",
  },
  {
    timestamp: "2024-03-28T16:03:56.152Z",
    analysis: "fdvbi uiv trdsufibirhtiurudbriu biuvb r ir ibriub iuur",
  },
];

export default function Dashboard() {
  const { authState } = useDataContext();
  const router = useRouter();

  return (
    <>
      {authState === "loading" && (
        <div>
          <LoaderRipple />
        </div>
      )}
      {authState === "loggedin" && <DashboardInner />}
      {authState === "notloggedin" && router.push("/login")}
    </>
  );
}

function DashboardInner() {
  const [records, setRecords] = useState<Record[]>(dummyData);
  const [curState, setCurState] = useState<string>("idle"); //should be "loading" in prod
  const dialogTrigger = useRef<HTMLButtonElement>(null);
  const [dialogData, setDialogData] = useState<Record | null>(null);

  //   useEffect(function () {
  //     async function getSubdatas() {
  //       try {
  //         const { data } = await axios.get(
  //           `${process.env.NEXT_PUBLIC_BACKEND_PATH}/getreports`
  //         );
  //         // Assuming the response contains JSON data
  //         // console.log(data);
  //         if (data?.msg === "success" && data.data) {
  //           setRecords(data.data);
  //           setCurState("idle");
  //         }
  //       } catch (error: any) {
  //         console.error("Error fetching data:", error.message);
  //         setCurState("error");
  //       }
  //     }
  //     getSubdatas();
  //   }, []);

  function handleView(data: Record | null) {
    setDialogData(data);
    dialogTrigger.current && dialogTrigger.current.click();
  }

  return (
    <div className="px-4 bg-zinc-100 flex-grow pagecont">
      <div className="py-[65px] min-h-full">
        <div className=" my-3 mx-4">
          <div className="fixed">
            <Recordviewer ref={dialogTrigger} data={dialogData} />
          </div>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Dated</TableHead>
                <TableHead>Analysis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {curState === "loading" &&
                Array.from(Array(4).keys()).map((each, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-[145px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))}
              {curState === "idle" &&
                records.length != 0 &&
                records.map((row, i) => (
                  <TableRow key={i} onClick={() => handleView(row)}>
                    <TableCell>
                      {formatRelativeTime(row.timestamp)?.toString()}
                    </TableCell>
                    <TableCell>
                      {row.analysis.length > 100
                        ? `${row.analysis?.substring(0, 99)} ...`
                        : row.analysis}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {curState === "idle" && records.length === 0 && (
            <div className="mt-10 text-center">No submission yet!</div>
          )}

          {curState === "error" && (
            <div className="mt-10 text-center">Something went wrong!</div>
          )}
        </div>
      </div>
    </div>
  );
}
