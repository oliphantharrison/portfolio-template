import { useEffect, useId, useMemo, useState } from "react";
import type { MouseEvent } from "react";

type SegmentId = "me" | "contact" | "work" | "website";
type FooterLinkLabel = "email" | "instagram" | "linkedin";

type SegmentDefinition = {
  id: SegmentId;
  text: string;
  label: string;
  placement: "top" | "bottom";
  href?: string;
  labelOffsetClassName?: string;
};

type SiteContent = {
  hero: {
    name: string;
    domain: string;
    tld: string;
  };
  summary: string;
  links: {
    email: string;
    instagram: string;
    linkedin: string;
    website: string;
  };
};

const SITE_CONTENT: SiteContent = {
  hero: {
    name: "hello",
    domain: "yourdomain",
    tld: ".com",
  },
  summary: "INSERT AN 8-10 WORD SUMMARY HERE",
  links: {
    email: "mailto:hello@yourdomain.com",
    instagram: "https://instagram.com/yourdomain",
    linkedin: "https://linkedin.com/in/yourdomain",
    website: "/",
  },
};

function buildSegments(content: SiteContent): SegmentDefinition[] {
  return [
    {
      id: "me",
      text: content.hero.name,
      label: "me",
      placement: "top",
    },
    {
      id: "contact",
      text: "@",
      label: "email",
      placement: "bottom",
      href: content.links.email,
      labelOffsetClassName: "top-8",
    },
    {
      id: "work",
      text: content.hero.domain,
      label: "instagram",
      placement: "top",
      href: content.links.instagram,
    },
    {
      id: "website",
      text: content.hero.tld,
      label: "website",
      placement: "bottom",
      href: content.links.website,
      labelOffsetClassName: "top-8",
    },
  ];
}

function buildFooterLinks(content: SiteContent): Array<{ label: FooterLinkLabel; href: string }> {
  return [
    { label: "email", href: content.links.email },
    { label: "instagram", href: content.links.instagram },
    { label: "linkedin", href: content.links.linkedin },
  ];
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="M4 7.5 12 13l8-5.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
      />
      <circle
        cx="17.3"
        cy="6.7"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="2.5"
      />
      <circle
        cx="8"
        cy="8"
        r="0.85"
        fill="currentColor"
        stroke="none"
      />
      <path d="M8 10.5v5.5" />
      <path d="M12 10.5v5.5" />
      <path d="M12 12.8a1.8 1.8 0 0 1 3.6 0V16" />
    </svg>
  );
}

function ThemeToggle({
  isDarkMode,
  onToggle,
}: {
  isDarkMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      className="group inline-flex items-center gap-3 rounded-full border border-[var(--line-color)]/90 bg-[var(--toggle-surface)] px-3 py-2 text-[var(--muted-color)] shadow-paper backdrop-blur-sm transition-colors duration-200 hover:text-[var(--ink-color)]"
      type="button"
      onClick={onToggle}
    >
      <span className="font-sans text-[0.62rem] uppercase tracking-card">{isDarkMode ? "dark" : "light"}</span>
      <span className="relative inline-flex h-6 w-12 items-center rounded-full border border-[var(--line-color)] bg-[var(--paper-bg)]/80 px-1">
        <span
          className={`h-4 w-4 rounded-full bg-[var(--ink-color)] transition-transform duration-200 ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouchDevice(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isTouchDevice;
}

type AnnotationProps = {
  label: string;
  placement: "top" | "bottom";
  labelOffsetClassName?: string;
  visible: boolean;
};

function BracketAnnotation({ label, placement, labelOffsetClassName, visible }: AnnotationProps) {
  const isTop = placement === "top";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 hidden md:block ${
        isTop ? "bottom-full mb-4" : "top-full mt-4"
      } ${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-150`}
    >
      <span className="relative block w-full">
        <span
          className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[1rem] tracking-[0.01em] text-[var(--muted-color)] ${
            isTop ? "-top-7" : (labelOffsetClassName ?? "top-6")
          }`}
        >
          {label}
        </span>
        <span className="relative block h-5">
          <span className={`absolute inset-x-0 ${isTop ? "top-0" : "bottom-0"} h-[2px] bg-[var(--line-color)]`} />
          <span
            className={`absolute left-0 ${isTop ? "top-0" : "bottom-0"} h-5 border-l border-[var(--line-color)]`}
            style={{ borderLeftWidth: "1.75px" }}
          />
          <span
            className={`absolute right-0 ${isTop ? "top-0" : "bottom-0"} h-5 border-r border-[var(--line-color)]`}
            style={{ borderRightWidth: "1.75px" }}
          />
        </span>
      </span>
    </span>
  );
}

type SegmentTriggerProps = {
  segment: SegmentDefinition;
  isBracketVisible: boolean;
  isIntroActive: boolean;
  isHoverCueActive: boolean;
  isTouchDevice: boolean;
  descriptionId: string;
  onActivate: (segmentId: SegmentId) => void;
  onDeactivate: () => void;
};

function SegmentTrigger({
  segment,
  isBracketVisible,
  isIntroActive,
  isHoverCueActive,
  isTouchDevice,
  descriptionId,
  onActivate,
  onDeactivate,
}: SegmentTriggerProps) {
  const triggerClassName =
    `relative inline-flex rounded-sm px-[0.03em] py-2 text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[0.005em] text-[var(--ink-color)] transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-stone ${
      isIntroActive || isHoverCueActive ? "segment-intro" : ""
    }`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isTouchDevice) {
      if (!isBracketVisible) {
        event.preventDefault();
        onActivate(segment.id);
        return;
      }

      if (!segment.href) {
        event.preventDefault();
      }
    }
  };

  const sharedProps = {
    className: triggerClassName,
    "aria-describedby": descriptionId,
    onMouseEnter: () => onActivate(segment.id),
    onFocus: () => onActivate(segment.id),
    onBlur: onDeactivate,
    onClick: handleClick,
  };

  const content = segment.href ? (
    <a
      {...sharedProps}
      href={segment.href}
      target={segment.href.startsWith("http") ? "_blank" : undefined}
      rel={segment.href.startsWith("http") ? "noreferrer" : undefined}
    >
      {segment.text}
    </a>
  ) : (
    <button
      {...sharedProps}
      type="button"
    >
      {segment.text}
    </button>
  );

  return (
    <span className="relative inline-flex">
      {content}
      <BracketAnnotation
        label={segment.label}
        placement={segment.placement}
        labelOffsetClassName={segment.labelOffsetClassName}
        visible={isBracketVisible}
      />
    </span>
  );
}

function App() {
  const segments = useMemo(() => buildSegments(SITE_CONTENT), []);
  const footerLinks = useMemo(() => buildFooterLinks(SITE_CONTENT), []);
  const [activeSegmentId, setActiveSegmentId] = useState<SegmentId | null>(null);
  const [introSegmentId, setIntroSegmentId] = useState<SegmentId | null>(null);
  const [hoverCueSegmentId, setHoverCueSegmentId] = useState<SegmentId | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  const baseId = useId();

  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? null;

  useEffect(() => {
    if (isTouchDevice || hasInteracted) {
      setIntroSegmentId(null);
      return;
    }

    const sequence = (["me", "contact", "work", "website"] as SegmentId[]).sort(() => Math.random() - 0.5);
    const startDelay = 2000;
    const stepDelay = 620;
    const timers = sequence.map((segmentId, index) =>
      window.setTimeout(() => {
        setIntroSegmentId(segmentId);
      }, startDelay + index * stepDelay),
    );
    const clearTimers = sequence.map((segmentId, index) =>
      window.setTimeout(() => {
        setIntroSegmentId((current) => (current === segmentId ? null : current));
      }, startDelay + index * stepDelay + 360),
    );
    const endTimer = window.setTimeout(() => {
      setIntroSegmentId(null);
    }, startDelay + sequence.length * stepDelay + 360);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      clearTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(endTimer);
    };
  }, [hasInteracted, isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) {
      return;
    }

    const pulseIds: SegmentId[] = ["me", "contact", "work", "website"];
    const interval = window.setInterval(() => {
      const randomSegmentId = pulseIds[Math.floor(Math.random() * pulseIds.length)];
      setIntroSegmentId(randomSegmentId);

      window.setTimeout(() => {
        setIntroSegmentId((current) => (current === randomSegmentId ? null : current));
      }, 360);
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme-preference");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme-preference", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSegmentId(null);
        setIntroSegmentId(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleActivate = (segmentId: SegmentId) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIntroSegmentId(null);
    setHoverCueSegmentId(segmentId);
    window.setTimeout(() => {
      setHoverCueSegmentId((current) => (current === segmentId ? null : current));
    }, 360);
    setActiveSegmentId(segmentId);
  };

  const handleDeactivate = () => {
    if (!isTouchDevice) {
      setActiveSegmentId(null);
    }
  };

  return (
    <main
      data-theme={isDarkMode ? "dark" : "light"}
      className="relative h-[100dvh] overflow-hidden bg-[var(--paper-bg)] px-5 py-4 text-[var(--ink-color)] transition-colors duration-300 sm:px-8 sm:py-5 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />
      <div className="pointer-events-none absolute inset-0 subtle-grid" />

      {isTouchDevice && activeSegment ? (
        <>
          <button
            aria-label="Close segment popup"
            className="absolute inset-0 z-20 bg-[var(--backdrop-color)] md:hidden"
            type="button"
            onClick={() => setActiveSegmentId(null)}
          />
          <div className="absolute inset-x-5 bottom-24 z-30 rounded-[1.5rem] border border-[var(--line-color)]/90 bg-[var(--popup-bg)] p-5 shadow-paper backdrop-blur-sm md:hidden">
            <div className="flex items-center justify-between gap-4">
              <p
                className="text-[1.05rem] text-[var(--muted-color)]"
                style={{ fontFamily: '"Marker Felt", "Bradley Hand", "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive' }}
              >
                {activeSegment.label}
              </p>
              <button
                aria-label="Close popup"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-color)] text-[var(--muted-color)]"
                type="button"
                onClick={() => setActiveSegmentId(null)}
              >
                ×
              </button>
            </div>
            {activeSegment.href ? (
              <a
                className="mt-4 inline-flex items-center rounded-full border border-[var(--line-color)] px-4 py-2 font-sans text-[0.7rem] uppercase tracking-card text-[var(--ink-color)]"
                href={activeSegment.href}
                target={activeSegment.href.startsWith("http") ? "_blank" : undefined}
                rel={activeSegment.href.startsWith("http") ? "noreferrer" : undefined}
              >
                Open link
              </a>
            ) : null}
          </div>
        </>
      ) : null}

      <div className="relative flex h-full flex-col">
        <section
          className="relative flex flex-1 items-center justify-center overflow-hidden"
          onMouseLeave={() => {
            if (!isTouchDevice) {
              setActiveSegmentId(null);
            }
          }}
        >
          <div className="relative flex w-full max-w-[110rem] flex-col items-center">
            <div className="font-display text-[var(--ink-color)]">
              <div className="flex max-w-[92vw] flex-wrap items-baseline justify-center leading-[0.9] md:mb-24 md:max-w-none md:flex-nowrap lg:mb-28">
                {segments.map((segment) => (
                  <SegmentTrigger
                    key={segment.id}
                    segment={segment}
                    isBracketVisible={segment.id === activeSegmentId}
                    isIntroActive={segment.id === introSegmentId}
                    isHoverCueActive={segment.id === hoverCueSegmentId}
                    isTouchDevice={isTouchDevice}
                    descriptionId={`${baseId}-${segment.id}-annotation`}
                    onActivate={handleActivate}
                    onDeactivate={handleDeactivate}
                  />
                ))}
              </div>
            </div>

            <div className="sr-only">
              {segments.map((segment) => (
                <p
                  key={segment.id}
                  id={`${baseId}-${segment.id}-annotation`}
                >
                  {segment.label}
                </p>
              ))}
            </div>

            <p className="mt-8 max-w-xl px-4 text-center font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[var(--muted-color)] sm:mt-10 md:-mt-2">
              {SITE_CONTENT.summary}
            </p>
          </div>
        </section>

        <footer className="relative z-10 flex items-center justify-center pb-2 pt-4 text-[var(--muted-color)]">
          <div className="flex items-center gap-5">
            {footerLinks.map((link, index) => (
              <span
                key={link.label}
                className="flex items-center gap-5"
              >
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="font-sans text-lg text-[var(--muted-color)]/85"
                  >
                    /
                  </span>
                ) : null}
                <a
                  aria-label={link.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-150 hover:text-[var(--ink-color)] focus-visible:text-[var(--ink-color)] focus-visible:outline-none"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label === "email" ? (
                    <MailIcon />
                  ) : link.label === "instagram" ? (
                    <InstagramIcon />
                  ) : (
                    <LinkedInIcon />
                  )}
                </a>
              </span>
            ))}
          </div>
        </footer>

        <div className="absolute bottom-3 right-0 z-10 sm:bottom-4">
          <ThemeToggle
            isDarkMode={isDarkMode}
            onToggle={() => setIsDarkMode((current) => !current)}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
