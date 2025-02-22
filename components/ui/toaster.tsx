"use client";

import { Toaster, toast } from "sonner";
import { useEffect } from "react";

export function CustomToaster({ toasts }) {
  useEffect(() => {
    toasts.forEach(({ id, title, description, action }) => {
      toast(title, {
        description,
        action,
        id,
        className:
          "text-dark100_light900 border-light-700 bg-light-900 dark:border-dark-400 dark:bg-dark-300",
      });
    });
  }, [toasts]);

  return <Toaster richColors position="bottom-right" />;
}
