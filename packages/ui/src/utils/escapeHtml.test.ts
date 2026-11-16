import { describe, expect, it } from 'vitest';
import { escapeHtml } from './escapeHtml';

describe('escapeHtml', () => {
  it('renders tags and event-handler payloads as text', () => {
    expect(escapeHtml('<img src=x onerror="alert(1)"><script>alert(2)</script>')).toBe(
      '&lt;img src=x onerror="alert(1)"&gt;&lt;script&gt;alert(2)&lt;/script&gt;',
    );
  });

  it('preserves encoded markup as literal text', () => {
    expect(escapeHtml('&lt;img src=x onerror=alert(1)&gt;')).toBe(
      '&amp;lt;img src=x onerror=alert(1)&amp;gt;',
    );
  });

  it('preserves line breaks and ordinary state output', () => {
    expect(escapeHtml('// Parsed state\n{"value": "safe"}')).toBe(
      '// Parsed state\n{"value": "safe"}',
    );
    expect(escapeHtml('')).toBe('');
  });
});
