"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/book-call");
  }, [router]);

  return (
    <meta httpEquiv="refresh" content="0; url=/book-call" />
  );
}
