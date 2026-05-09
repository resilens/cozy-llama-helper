import * as React from "react";

type MobileOS = "ios" | "android" | "other";

function detectMobileOS(ua: string): MobileOS | null {
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/webOS|BlackBerry|IEMobile|Opera Mini|Mobile|Mobi/i.test(ua)) return "other";
  return null;
}

const POCKETPAL_IOS = "https://apps.apple.com/us/app/pocketpal-ai/id6502579498";
const POCKETPAL_ANDROID = "https://play.google.com/store/apps/details?id=com.pocketpalai";
const POCKETPAL_REPO = "https://github.com/a-ghorbani/pocketpal-ai";

export function MobileNotice() {
  const [os, setOs] = React.useState<MobileOS | null>(null);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    setOs(detectMobileOS(navigator.userAgent));
  }, []);

  if (!os || dismissed) return null;

  const storeUrl =
    os === "ios" ? POCKETPAL_IOS : os === "android" ? POCKETPAL_ANDROID : POCKETPAL_REPO;
  const storeLabel =
    os === "ios"
      ? "Get PocketPal AI on the App Store"
      : os === "android"
        ? "Get PocketPal AI on Google Play"
        : "Get PocketPal AI on GitHub";

  return (
    <div className="border-b border-accent bg-accent/40">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 text-sm text-accent-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <strong>Heads up:</strong> llamafile is desktop-only. On mobile, try{" "}
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-primary/40 underline-offset-4"
          >
            {storeLabel}
          </a>
          . You can keep exploring here too.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="self-end text-xs text-muted-foreground hover:text-foreground sm:self-auto"
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
