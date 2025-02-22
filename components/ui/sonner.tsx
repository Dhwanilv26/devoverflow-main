"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "relative bg-light-900 text-dark100_light900 border border-light-700 shadow-lg dark:bg-dark-300 dark:border-dark-400 dark:text-light-900",
          description: "text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
          cancelButton:
            "bg-muted text-muted-foreground hover:bg-muted/80 transition-all",
          success:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
          info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          warning:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
