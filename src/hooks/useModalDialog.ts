import { useCallback, useEffect, useRef, useState } from "react";

export default function useModalDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [overflow, setOriginalOverflow] = useState("");

  const ref = useRef<HTMLDialogElement>(null!);

  const open = useCallback(function open() {
    setOriginalOverflow(window.getComputedStyle(document.body).overflow);
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }, []);

  const close = useCallback(
    function close() {
      document.body.style.overflow = overflow;
      setIsOpen(false);
    },
    [overflow]
  );

  const onOpenDialog = useCallback(function onOpenDialog() {
    const dialog = ref.current;
    if (dialog) {
      dialog.removeAttribute("open");
      dialog.showModal();
    }
  }, []);

  const onCloseDialog = useCallback(function onCloseDialog() {
    ref.current?.close();
  }, []);

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
