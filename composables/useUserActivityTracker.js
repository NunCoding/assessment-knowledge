export function useUserActivityTracker(callbacks = {}) {
  const {
    onMaximize,
    onUnmaximize,
    onTabBlur,
    onTabFocus,
    onVisibilityChange,
    onScreenshotShortcut,
    onCheatAttempt,
    onCopyAttempt,
    enableBlurOnFocusLoss = false,
    preventCopy = false,
  } = callbacks;

  const router = useRouter();
  let wasMaximized = false;

  const handleResize = () => {
    const isMaximized =
      window.innerHeight >= screen.availHeight - 10 &&
      window.innerWidth >= screen.availWidth - 10;
    if (isMaximized && !wasMaximized) {
      wasMaximized = true;
      onMaximize?.();
    } else if (!isMaximized && wasMaximized) {
      wasMaximized = false;
      onUnmaximize?.();
    }
  };

  const handleBlur = () => {
    onTabBlur?.();
    if (enableBlurOnFocusLoss) {
      document.body.classList.add("blurred");
    }
  };

  const handleFocus = () => {
    onTabFocus?.();
    if (enableBlurOnFocusLoss) {
      document.body.classList.remove("blurred");
    }
  };

  const handleVisibilityChange = () => {
    onVisibilityChange?.(document.visibilityState);
    if (enableBlurOnFocusLoss) {
      if (document.visibilityState === "hidden") {
        document.body.classList.add("blurred");
      } else {
        document.body.classList.remove("blurred");
      }
    }
  };

  const handleKeyDown = (e) => {
    // Detect Mac screenshot shortcut
    if (e.metaKey && e.shiftKey && e.key === "4") {
      onScreenshotShortcut?.();
    }

    // Block DevTools and common cheat keys
    const blockedKeys = ["s", "p", "u", "i", "j"];
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
      onCheatAttempt?.(`Blocked key: ${e.key}`);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    onCheatAttempt?.("Right click blocked");
  };

  const handleCopy = (e) => {
    if (preventCopy) {
      e.preventDefault();
    }
    onCopyAttempt?.(document.getSelection()?.toString());
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("blur", handleBlur);
    window.removeEventListener("focus", handleFocus);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("copy", handleCopy);
  });
}
