import { useCallback, useEffect, useRef, useState } from "react";

export default function useModalDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [overflow, setOriginalOverflow] = useState("unset");

  const ref = useRef<HTMLDialogElement>(null!);

  const open = useCallback(function open() {
    setIsOpen(true);
  }, []);

  const close = useCallback(function close() {
    setIsOpen(false);
  }, []);

  const onOpenDialog = useCallback(function onOpenDialog() {
    const dialog = ref.current;
    if (dialog) {
      dialog.removeAttribute("open");
      document.body.style.overflow = "hidden";
      dialog.showModal();
      setOriginalOverflow(window.getComputedStyle(document.body).overflow);
    }
  }, []);

  const onCloseDialog = useCallback(
    function onCloseDialog() {
      document.body.style.overflow = overflow;
      ref.current?.close();
    },
    [overflow]
  );

  const onDialogBackdropClicked = useCallback(
    function onDialogBackdropClicked(event: Event) {
      if (event.target === ref.current) close();
    },
    [close]
  );

  const callback = useCallback(
    function refDialogCallback(node: HTMLDialogElement) {
      const current = ref.current;

      ref.current = node;

      if (current) {
        current.removeEventListener("click", onDialogBackdropClicked);
        current.removeEventListener("close", onCloseDialog);
      }

      if (node) {
        node.addEventListener("click", onDialogBackdropClicked);
        node.addEventListener("close", onCloseDialog);
      }
    },
    [onDialogBackdropClicked, onCloseDialog]
  );

  useEffect(() => {
    if (isOpen) {
      onOpenDialog();
    } else {
      onCloseDialog();
    }
  }, [isOpen, onCloseDialog, onOpenDialog]);

  return [callback, close, open, isOpen] as const;
}
