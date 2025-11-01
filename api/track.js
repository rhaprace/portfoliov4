/**
 * Serverless API endpoint for visitor tracking
 * Deploy this to Vercel or similar serverless platform
 * 
 * Environment variables needed:
 * - GITHUB_TOKEN: Your GitHub personal access token
 * - GIST_ID: Your private gist ID
 */

const TRACKING_CONFIG = {
  filename: 'visitor-logs.csv',
  csvHeader: 'Timestamp,Page,Referrer,UserAgent,Screen,Language\n',
  allowedOrigins: [
    'https://rhaprace.github.io',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
};

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (TRACKING_CONFIG.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timestamp, page, referrer, userAgent, screenSize, language } = req.body;

    if (!timestamp || !page) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const token = process.env.GITHUB_TOKEN;
    const gistId = process.env.GIST_ID;

    if (!token || !gistId) {
      console.error('Missing GitHub credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const logEntry = `${timestamp},${page},"${referrer}","${userAgent}",${screenSize},${language}\n`;

    const fetchResponse = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!fetchResponse.ok) {
      throw new Error('Failed to fetch gist');
    }

    const gist = await fetchResponse.json();
    const currentContent = gist.files[TRACKING_CONFIG.filename]?.content || TRACKING_CONFIG.csvHeader;

    const updateResponse = await fetch(`https://api.github.com/gists/${gistId}`, {
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
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update gist');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

