#!/usr/bin/env node

/**
 * Custom MDX linter to catch common issues before Docusaurus compilation
 * Specifically checks for unescaped angle brackets that would break JSX parsing
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ISSUES = [];

// Pattern to find unescaped angle brackets followed by numbers
// This catches patterns like <4, <60%, <10 a.m. that break MDX/JSX parsing
// We specifically look for < followed by a digit to avoid false positives with HTML tags
const UNESCAPED_ANGLE_BRACKET = /<(?=[0-9])/g;

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Skip front matter
    if (lineNum <= 10 && line.includes('---')) return;
    
    // Check for unescaped angle brackets
    let match;
    while ((match = UNESCAPED_ANGLE_BRACKET.exec(line)) !== null) {
      ISSUES.push({
        file: filePath,
        line: lineNum,
        column: match.index + 1,
        message: 'Unescaped angle bracket in MDX - use &lt; instead of <',
        context: line.substring(Math.max(0, match.index - 20), match.index + 30)
      });
    }
  });
}

// Find all markdown files
const blogFiles = glob.sync('blog/**/*.md');
const docFiles = glob.sync('docs-*/**/*.md');
const allFiles = [...blogFiles, ...docFiles];

allFiles.forEach(file => {
  try {
    lintFile(file);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
});

if (ISSUES.length > 0) {
  console.error('\n❌ MDX Linting Issues Found:\n');
  ISSUES.forEach(issue => {
    console.error(`${issue.file}:${issue.line}:${issue.column}`);
    console.error(`  ${issue.message}`);
    console.error(`  Context: ...${issue.context}...`);
    console.error('');
  });
  process.exit(1);
} else {
  console.log('✅ No MDX linting issues found!');
  process.exit(0);
}

