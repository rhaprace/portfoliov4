/**
 * Privacy-friendly visitor tracking
 *
 * What we track:
 * - Timestamp, page visited, referrer, browser/device info
 * - Only tracks ONCE per unique visitor (prevents duplicate entries)
 *
 * What we DON'T track:
 * - IP addresses (not accessible on client-side)
 * - Personal information
 * - Cookies or persistent identifiers
 * - Return visits from the same browser/device
 *
 * How it works:
 * - Creates a browser fingerprint based on user agent, screen size, language, etc.
 * - Stores fingerprint in localStorage to identify returning visitors
 * - Each unique browser/device is tracked only once, ever
 * - Clearing browser data will reset the fingerprint (counted as new visitor)
 *
 * Data is stored securely via API endpoint (credentials never exposed to client).
 */
import { useEffect, useRef } from 'react';

const TRACKING_CONFIG = {
  delay: 1500,
  filename: 'visitor-logs.csv',
  csvHeader: 'Timestamp,Page,Referrer,UserAgent,Screen,Language\n',
  ownerKey: 'portfolio_owner',
  visitorKey: 'portfolio_visitor_id',
  defaultValues: {
    referrer: 'direct',
    userAgent: 'unknown',
    language: 'unknown',
  },
} as const;

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1'];

const isLocalhost = () => LOCALHOST_HOSTNAMES.includes(window.location.hostname);

const isOwnerVisit = () => localStorage.getItem(TRACKING_CONFIG.ownerKey) === 'true';

const generateVisitorFingerprint = (): string => {
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ].join('|');
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
};

const getOrCreateVisitorId = (): string => {
  let visitorId = localStorage.getItem(TRACKING_CONFIG.visitorKey);

  if (!visitorId) {
    visitorId = generateVisitorFingerprint();
    localStorage.setItem(TRACKING_CONFIG.visitorKey, visitorId);
  }

  return visitorId;
};

const hasTrackedThisVisitor = (): boolean => {
  const visitorId = getOrCreateVisitorId();
  const trackedKey = `${TRACKING_CONFIG.visitorKey}_tracked`;
  return localStorage.getItem(trackedKey) === visitorId;
};

const markVisitorAsTracked = (): void => {
  const visitorId = getOrCreateVisitorId();
  const trackedKey = `${TRACKING_CONFIG.visitorKey}_tracked`;
  localStorage.setItem(trackedKey, visitorId);
};

export const useVisitorTracking = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const trackVisitor = async () => {
      try {
        if (isLocalhost()) {
          console.debug('Tracking disabled: localhost');
          return;
        }

        if (isOwnerVisit()) {
          console.debug('Tracking disabled: Owner visit');
          return;
        }

        if (hasTrackedThisVisitor()) {
          console.debug('Tracking disabled: Visitor already tracked');
          return;
        }

        const apiEndpoint = import.meta.env.VITE_TRACKING_API_ENDPOINT;

        if (!apiEndpoint) {
          console.debug('Tracking disabled: No API endpoint configured');
          return;
        }

        markVisitorAsTracked();
        hasTracked.current = true;

        const timestamp = new Date().toISOString();
        const page = window.location.pathname + window.location.search;
        const referrer = document.referrer || TRACKING_CONFIG.defaultValues.referrer;
        const userAgent = navigator.userAgent || TRACKING_CONFIG.defaultValues.userAgent;
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const language = navigator.language || TRACKING_CONFIG.defaultValues.language;

        await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp,
            page,
            referrer,
            userAgent,
            screenSize,
            language,
          }),
          keepalive: true,
        });
      } catch (error) {
        console.debug('Tracking failed:', error);
      }
    };

    const timeoutId = setTimeout(trackVisitor, TRACKING_CONFIG.delay);

    return () => clearTimeout(timeoutId);
  }, []);
};
