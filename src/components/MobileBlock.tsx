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
    <div className="rounded-2xl border-2 border-destructive bg-destructive/10 p-5 text-destructive shadow-lg ring-2 ring-destructive/20">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive text-base font-bold text-destructive-foreground"
        >
          !
        </span>
        <div className="flex-1">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Heads up — desktop only
          </h3>
          <p className="mt-1 text-sm text-foreground">
            llamafile is built for desktop computers and won't run on this phone.
            On mobile, install{" "}
            <strong>PocketPal AI</strong> instead — a free, open-source assistant
            that runs models fully on-device.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90"
            >
              {storeLabel}
            </a>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Continue anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
