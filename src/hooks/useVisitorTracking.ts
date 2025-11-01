/**
 * Privacy-friendly visitor tracking
 *
 * What we track:
 * - Timestamp, page visited, referrer, browser/device info
 *
 * What we DON'T track:
 * - IP addresses (not accessible on client-side)
 * - Personal information
 * - Cookies or persistent identifiers
 *
 * Data is stored in a private GitHub Gist, accessible only to the owner.
 */
import { useEffect, useRef } from 'react';

const TRACKING_CONFIG = {
  delay: 1500,
  filename: 'visitor-logs.csv',
  csvHeader: 'Timestamp,Page,Referrer,UserAgent,Screen,Language\n',
  ownerKey: 'portfolio_owner',
  defaultValues: {
    referrer: 'direct',
    userAgent: 'unknown',
    language: 'unknown',
  },
} as const;

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1'];

const isLocalhost = () => LOCALHOST_HOSTNAMES.includes(window.location.hostname);

const isOwnerVisit = () => localStorage.getItem(TRACKING_CONFIG.ownerKey) === 'true';

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

        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const gistId = import.meta.env.VITE_GIST_ID;

        if (!token || !gistId) {
          console.debug('Tracking disabled: Missing GitHub token or Gist ID');
          return;
        }

        const timestamp = new Date().toISOString();
        const page = window.location.pathname + window.location.search;
        const referrer = document.referrer || TRACKING_CONFIG.defaultValues.referrer;
        const userAgent = navigator.userAgent || TRACKING_CONFIG.defaultValues.userAgent;
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const language = navigator.language || TRACKING_CONFIG.defaultValues.language;

        const logEntry = `${timestamp},${page},"${referrer}","${userAgent}",${screenSize},${language}\n`;

        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
          method: 'GET',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch gist');
        }

        const gist = await response.json();
        const currentContent = gist.files[TRACKING_CONFIG.filename]?.content || TRACKING_CONFIG.csvHeader;

        await fetch(`https://api.github.com/gists/${gistId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            files: {
              [TRACKING_CONFIG.filename]: {
                content: currentContent + logEntry,
              },
            },
          }),
          keepalive: true,
        });

        hasTracked.current = true;
      } catch (error) {
        console.debug('Tracking failed:', error);
      }
    };

    const timeoutId = setTimeout(trackVisitor, TRACKING_CONFIG.delay);

    return () => clearTimeout(timeoutId);
  }, []);
};
