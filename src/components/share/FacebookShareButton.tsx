"use client";

import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";

type FacebookShareButtonProps = {
  url: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
};

export default function FacebookShareButton({
  url,
  label = "Facebook-এ শেয়ার",
  className = "",
  iconOnly = false,
}: FacebookShareButtonProps) {
  const [error, setError] = useState("");

  function handleShare() {
    setError("");

    try {
      const pageUrl = new URL(url);
      if (pageUrl.protocol !== "http:" && pageUrl.protocol !== "https:") {
        throw new Error("Only public HTTP or HTTPS URLs can be shared.");
      }

      const shareUrl = new URL("https://www.facebook.com/sharer/sharer.php");
      shareUrl.searchParams.set("u", pageUrl.href);

      const popup = window.open(
        shareUrl.toString(),
        "_blank",
        "popup,width=600,height=700",
      );

      if (!popup) window.location.assign(shareUrl.toString());
    } catch (shareError) {
      console.error("Unable to open Facebook share dialog:", shareError);
      setError("Facebook-এ এই লিংকটি শেয়ার করা যাচ্ছে না। লিংকটি যাচাই করুন।");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleShare}
        aria-label={iconOnly ? label : undefined}
        title={iconOnly ? label : undefined}
        className={`inline-flex items-center justify-center gap-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2] ${className}`}
      >
        <FaFacebookF aria-hidden="true" className="shrink-0" />
        {!iconOnly && label}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
