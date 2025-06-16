import { Configuration } from '../interfaces/config.interface';
import { validationSchema } from '../validation/env.validation';

export class ConfigDocsGenerator {
  static generateMarkdown(): string {
    const schema = validationSchema.describe();

    let markdown = '# Configuration Documentation\n\n';
    markdown += 'This document describes all available configuration options for the application.\n\n';

    markdown += '## Environment Variables\n\n';
    markdown += '| Variable | Type | Required | Default | Description |\n';
    markdown += '|----------|------|----------|---------|-------------|\n';

    const keys = Object.keys(schema.keys);
    for (const key of keys) {
      const field = schema.keys[key];
      const type = field.type;
      const isRequired = field.flags?.presence === 'required';
      const defaultValue = field.flags?.default ?? '-';
      const description = field.flags?.description ?? '-';


      markdown += `| ${key} | ${type} | ${isRequired ? 'Yes' : 'No'} | ${defaultValue} | ${description} |\n`;
    }

    markdown += '\n## Configuration Sections\n\n';
    const sections: (keyof Configuration)[] = [
      'apiPrefix',
      'apiVersion',
      'throttler',
      'database',
      'cors',
      'featureFlags',
      'jwt',
      'port',
      'nodeEnv'
    ];

    for (const section of sections) {
      markdown += `### ${section}\n\n`;
      markdown += '```typescript\n';
      markdown += `interface ${section.charAt(0).toUpperCase() + section.slice(1)}Config {\n`;

      const sectionKeys = Object.keys(schema.keys[section]?.keys ?? {});
      for (const key of sectionKeys) {
        const field = schema.keys[section].keys[key];
        const type = field.type;
        const isRequired = field.flags?.presence === 'required';
        markdown += `  ${key}${isRequired ? '' : '?'}: ${type};\n`;
      }

      markdown += '}\n```\n\n';
    }

    return markdown;
  }
} 