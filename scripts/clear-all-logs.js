import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

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

async function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function clearAllLogs(token, gistId) {
  try {
    console.log('WARNING: This will DELETE ALL visitor logs!\n');
    
    const confirmed = await askConfirmation('Are you sure you want to clear all logs? (y/N): ');
    
    if (!confirmed) {
      console.log('\nOperation cancelled.');
      return;
    }

    console.log('\nClearing all logs...\n');

    const csvHeader = 'Timestamp,Page,Referrer,UserAgent,Screen,Language\n';

    await fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: {
          'visitor-logs.csv': {
            content: csvHeader,
          },
        },
      }),
    });

    console.log('All logs cleared! Starting fresh.\n');

  } catch (error) {
    console.error('Error clearing logs:', error.message);
    process.exit(1);
  }
}

async function main() {
  console.log('Clear All Visitor Logs\n');
  
  const env = await loadEnv();
  const token = env.VITE_GITHUB_TOKEN;
  const gistId = env.VITE_GIST_ID;

  if (!token || !gistId) {
    console.error('Error: Missing VITE_GITHUB_TOKEN or VITE_GIST_ID in .env.local');
    process.exit(1);
  }

  await clearAllLogs(token, gistId);
}

main();

