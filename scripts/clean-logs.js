#!/usr/bin/env node

/**
 * Clean Visitor Logs Script
 * Removes localhost visits from the gist
 * 
 * Usage:
 *   node scripts/clean-logs.js
 */

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
    process.exit(1);
  }
}

async function cleanLogs(token, gistId) {
  try {
    console.log('Fetching current logs...\n');
    
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
      console.log('No logs to clean.');
      return;
    }

    const lines = content.split('\n');
    const header = lines[0];
    
    // Filter out localhost visits
    const cleanedLines = lines.slice(1).filter(line => {
      if (!line.trim()) return false;
      return !line.includes('localhost') && !line.includes('127.0.0.1');
    });

    const beforeCount = lines.length - 1;
    const afterCount = cleanedLines.length;
    const removedCount = beforeCount - afterCount;

    if (removedCount === 0) {
      console.log('✅ No localhost visits found. Logs are already clean!');
      return;
    }

    console.log(`Found ${removedCount} localhost visit(s) to remove.\n`);

    const newContent = header + '\n' + cleanedLines.join('\n') + '\n';

    console.log('Updating gist...\n');

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
            content: newContent,
          },
        },
      }),
    });

    console.log(`✅ Cleaned! Removed ${removedCount} localhost visit(s).`);
    console.log(`   Before: ${beforeCount} visits`);
    console.log(`   After: ${afterCount} visits\n`);

  } catch (error) {
    console.error('Error cleaning logs:', error.message);
    process.exit(1);
  }
}

async function main() {
  console.log('🧹 Cleaning visitor logs...\n');
  
  const env = await loadEnv();
  const token = env.VITE_GITHUB_TOKEN;
  const gistId = env.VITE_GIST_ID;

  if (!token || !gistId) {
    console.error('Error: Missing VITE_GITHUB_TOKEN or VITE_GIST_ID in .env.local');
    process.exit(1);
  }

  await cleanLogs(token, gistId);
}

main();

