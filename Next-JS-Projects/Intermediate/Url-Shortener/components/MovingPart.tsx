"use client";

import { usePostUrlMutation } from "@/utils/use-swr";
import { FormEventHandler, useEffect, useState } from "react";
import { LinkIcon } from "@heroicons/react/24/solid";

export default function MovingPart() {
  const postUrl = usePostUrlMutation();

  const urlToRedirect =
    postUrl.id != null
      ? new URL(postUrl.id, window.location.origin).toString()
      : null;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    postUrl.reset();
    // @ts-ignore
    const url = event.target.url.value;
    const newId = await postUrl.trigger({ url });
    console.log(`The new id is`, newId);
  };

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (typeof urlToRedirect === "string") {
      await navigator.clipboard.writeText(urlToRedirect);
      setCopied(true);
    }
  };

  // Function to share the URL
  const handleShare = async () => {
    console.log("navigator.share:", navigator.share);
    if (urlToRedirect) {
      if (navigator.share) {
        // Check if the Web Share API is supported
        try {
          await navigator.share({
            title: "Check out this link!",
            text: "I found this amazing link:",
            url: urlToRedirect,
          });
        } catch (err) {
          console.error("Error sharing:", err);
          alert("Failed to share the link. Please copy it manually.");
        }
      } else {
        alert(
          "Web Share API is not supported in your browser. Please copy the link manually."
        );
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center space-y-5">
      <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-4">
        <input
          type="url"
          name="url"
          required
          className="rounded-lg border border-gray-200 border-opacity-40 bg-transparent indent-4 leading-[2.75rem]"
          onClick={(e) => e.currentTarget.select()}
          defaultValue="https://the-link-you-want-to-shorten.long"
        />

        <button
          type="submit"
          className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-fuchsia-500 font-bold text-white hover:text-opacity-70"
        >
          Shorten it
        </button>
      </form>

      <div
        onClick={handleCopy}
        className="group flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-green-200 bg-opacity-10 text-xl hover:border-2 hover:bg-opacity-20"
      >
        {copied ? (
          <p className="text-4xl font-semibold">Copied!</p>
        ) : (
          <>
            <p>
              {urlToRedirect ??
                (postUrl.isMutating ? "..." : "Shortened link will be here")}
            </p>
            {urlToRedirect && (
              <p className="mt-8 text-sm text-gray-500 group-hover:underline">
                Click to copy
              </p>
            )}
          </>
        )}
      </div>

      {/* Share Button */}
      {urlToRedirect && (
        <button
          onClick={handleShare}
          className="mt-4 flex h-12 items-center rounded-lg bg-gradient-to-r from-green-400 to-blue-500 font-bold text-white hover:text-opacity-70"
        >
          <LinkIcon className="mr-2 h-6 w-6" />
          Share on Social Media
        </button>
      )}
    </div>
  );
}
