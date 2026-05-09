import * as React from "react";

type MobileOS = "ios" | "android" | "other";

function detectMobileOS(ua: string): MobileOS | null {
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/webOS|BlackBerry|IEMobile|Opera Mini|Mobile|Mobi/i.test(ua)) return "other";
  return null;
}

const POCKETPAL_IOS =
  "https://apps.apple.com/us/app/pocketpal-ai/id6502579498";
const POCKETPAL_ANDROID =
  "https://play.google.com/store/apps/details?id=com.pocketpalai";
const POCKETPAL_REPO = "https://github.com/a-ghorbani/pocketpal-ai";

export function MobileBlock({ children }: { children: React.ReactNode }) {
  const [os, setOs] = React.useState<MobileOS | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setOs(detectMobileOS(navigator.userAgent));
    setReady(true);
  }, []);

  if (!ready) return <>{children}</>;
  if (!os) return <>{children}</>;

  const storeUrl =
    os === "ios"
      ? POCKETPAL_IOS
      : os === "android"
        ? POCKETPAL_ANDROID
        : POCKETPAL_REPO;
  const storeLabel =
    os === "ios"
      ? "Get PocketPal AI on the App Store"
      : os === "android"
        ? "Get PocketPal AI on Google Play"
        : "Get PocketPal AI";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Desktop only
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This app recommends AI downloads for desktop computers, so it doesn't
          work well on mobile. On the go, try PocketPal AI — a free, open-source
          assistant that runs models fully on your phone.
        </p>
        <a
          href={storeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {storeLabel}
        </a>
        <p className="mt-6 text-xs text-muted-foreground">
          Reopen this site on a desktop or laptop to continue, or view the{" "}
          <a
            href={POCKETPAL_REPO}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-primary/40 underline-offset-4"
          >
            PocketPal AI source on GitHub
          </a>
          .
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          <a
            href="/"
            className="underline decoration-primary/40 underline-offset-4"
          >
            Back to homepage
          </a>
        </p>
      </div>
    </div>
  );
}
