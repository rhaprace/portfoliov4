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

export const useVisitorTracking = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const trackVisitor = async () => {
      try {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          console.debug('Tracking disabled: localhost');
          return;
        }

        const isOwner = localStorage.getItem('portfolio_owner') === 'true';
        if (isOwner) {
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
        const referrer = document.referrer || 'direct';
        const userAgent = navigator.userAgent || 'unknown';
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const language = navigator.language || 'unknown';

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
        const filename = 'visitor-logs.csv';
        const currentContent = gist.files[filename]?.content || 'Timestamp,Page,Referrer,UserAgent,Screen,Language\n';

        await fetch(`https://api.github.com/gists/${gistId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            files: {
              [filename]: {
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

    const timeoutId = setTimeout(trackVisitor, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
};
