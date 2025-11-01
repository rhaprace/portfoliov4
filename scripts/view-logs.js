import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadEnv() {
  try {
    const envPath = join(__dirname, '..', '.env.local');
    const envContent = await readFile(envPath, 'utf-8');
    
    const env = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.+)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    });
    
    return env;
  } catch (error) {
    console.error('Error: .env.local file not found');
    console.error('Create .env.local with VITE_GITHUB_TOKEN and VITE_GIST_ID');
    process.exit(1);
  }
}

async function fetchLogs(token, gistId) {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const gist = await response.json();
    const filename = 'visitor-logs.csv';
    const content = gist.files[filename]?.content;

    if (!content) {
      console.log('No visitor logs yet');
      return;
    }

    return content;
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    process.exit(1);
  }
}

function parseLogs(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  const logs = lines.slice(1).map(line => {
    const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
    const entry = {};
    
    headers.forEach((header, index) => {
      entry[header.trim()] = values[index]?.replace(/^"|"$/g, '').trim() || '';
    });
    
    return entry;
  });

  return logs;
}

function displayLogs(logs) {
  console.log('\nVisitor Logs\n');
  console.log(`Total Visitors: ${logs.length}\n`);

  if (logs.length === 0) {
    console.log('No visitors yet.');
    return;
  }

  console.log('Recent Visitors:\n');

  const recent = logs.slice(-15).reverse();

  recent.forEach((log, index) => {
    const date = new Date(log.Timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    let referrer = 'Direct';
    try {
      if (log.Referrer && log.Referrer !== 'direct') {
        referrer = new URL(log.Referrer).hostname;
      }
    } catch (e) {
      referrer = log.Referrer || 'Direct';
    }

    console.log(`${index + 1}. ${formattedDate} at ${formattedTime}`);
    console.log(`   Page: ${log.Page}`);
    console.log(`   From: ${referrer}`);
    console.log('');
  });
}

async function main() {
  console.log('Fetching visitor logs...\n');

  const env = await loadEnv();
  const token = env.VITE_GITHUB_TOKEN;
  const gistId = env.VITE_GIST_ID;

  if (!token || !gistId) {
    console.error('Error: Missing VITE_GITHUB_TOKEN or VITE_GIST_ID in .env.local');
    process.exit(1);
  }

  const csvContent = await fetchLogs(token, gistId);

  if (!csvContent) {
    return;
  }

  let logs = parseLogs(csvContent);

  logs = logs.filter(log => {
    const referrer = log.Referrer || '';
    return !referrer.includes('localhost') && !referrer.includes('127.0.0.1');
  });

  displayLogs(logs);
}

main();
