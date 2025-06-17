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

    return markdown;
  }
} 