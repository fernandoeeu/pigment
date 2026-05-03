import { ClerkProvider } from "@clerk/tanstack-react-start";
import { dark } from "@clerk/ui/themes";
import { Toaster } from "@color-game/ui/components/sonner";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/header";
import { SettingsProvider } from "../hooks/use-settings";

import appCss from "../index.css?url";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Pigment — Color Memory Game",
      },
      {
        name: "description",
        content: "See a color. Remember it. Recreate it. How sharp is your color memory?",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
      appearance={{
        theme: dark,
        variables: {
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontFamilyButtons: '"DM Sans", system-ui, sans-serif',
        },
      }}
    >
      <html lang="en" className="dark pigment-grain">
        <head>
          <HeadContent />
        </head>
        <body>
          <SettingsProvider>
            <div className="grid h-svh grid-rows-[auto_1fr]">
              <Header />
              <Outlet />
            </div>
            <Toaster richColors />
          </SettingsProvider>
          <TanStackRouterDevtools position="bottom-left" />
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
