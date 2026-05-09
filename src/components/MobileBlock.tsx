import * as React from "react";

function isMobileUA(ua: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Mobi/i.test(ua);
}

export function MobileBlock({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(isMobileUA(navigator.userAgent));
    setReady(true);
  }, []);

  if (!ready) return <>{children}</>;
  if (!isMobile) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Desktop only
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This app recommends AI downloads for desktop computers, so it doesn't work
          well on mobile. On the go, try Infomaniak's Euria app instead — a private,
          Swiss-hosted AI assistant.
        </p>
        <a
          href="https://www.infomaniak.com/de/anwendungen/euria-herunterladen"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get Euria by Infomaniak
        </a>
        <p className="mt-6 text-xs text-muted-foreground">
          Reopen this site on a desktop or laptop to continue.
        </p>
      </div>
    </div>
  );
}
