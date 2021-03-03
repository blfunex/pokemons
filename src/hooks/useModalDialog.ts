import { useEffect, useRef, useState } from "react";

export default function useModalDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDialogElement>(null!);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  useEffect(() => {
    const dialog = ref.current;
    if (dialog) {
      if (isOpen) {
        dialog.removeAttribute("open");
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [ref, isOpen]);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog) {
      const listener = function listener(event: MouseEvent) {
        if (event.target === dialog) close();
      };

      dialog.addEventListener("click", listener);
      dialog.addEventListener("close", close);
      return () => {
        dialog.addEventListener("click", listener);
        dialog.removeEventListener("close", close);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return [ref, close, open, isOpen] as const;
}
