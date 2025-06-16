import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { ConfigDocsGenerator } from './config-docs.generator';

// Generate the documentation
const markdown = ConfigDocsGenerator.generateMarkdown();

// Save to the docs directory
const docsPath = join(process.cwd(), 'env-docs');

if (!existsSync(docsPath)) {
  mkdirSync(docsPath, { recursive: true });
}

const filePath = join(docsPath, 'configuration.md');

try {
  writeFileSync(filePath, markdown);
  console.log(`Configuration documentation generated successfully at ${filePath}`);
} catch (error) {
  console.error('Failed to generate configuration documentation:', error);
  process.exit(1);
} 