# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

We take the security of Devvscape seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to **security@devvscape.com**.

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

### Information to Include

- **Type of issue** (buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s) related to the vulnerability**
- **The location of the affected source code (tag/branch/commit or direct URL)**
- **Any special configuration required to reproduce the issue**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code (if possible)**
- **Impact of the issue, including how an attacker might exploit it**

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English.

## Disclosure Policy

When we receive a security bug report, we will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

1. **Confirm the problem** and determine the affected versions.
2. **Audit code** to find any similar problems.
3. **Prepare fixes** for all supported versions. These fixes will be released as new minor versions.

## Security Best Practices

### For Contributors

- Never commit secrets, API keys, or sensitive data
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP guidelines
- Keep dependencies updated
- Use HTTPS for all external communications

### For Users

- Keep the app updated to the latest version
- Report security issues immediately
- Use strong, unique passwords
- Enable two-factor authentication when available
- Be cautious with personal information

## Security Features

### Authentication & Authorization

- Firebase Authentication integration
- Role-based access control
- Secure token management
- Session timeout handling

### Data Protection

- HTTPS encryption for all communications
- Secure storage of sensitive data
- Input validation and sanitization
- SQL injection prevention

### Privacy

- GDPR compliance
- Data minimization principles
- User consent management
- Right to data deletion

## Security Updates

Security updates are released as patch versions (e.g., 2.0.1 → 2.0.2). We recommend updating as soon as possible when security patches are available.

### Automatic Updates

- Web version: Updates automatically
- Mobile apps: Updates through app stores
- PWA: Updates when new service worker is available

## Security Contacts

- **Security Team**: security@devvscape.com
- **Maintainers**: maintainers@devvscape.com
- **Emergency**: +1-XXX-XXX-XXXX (for critical issues only)

## Acknowledgments

We would like to thank all security researchers and contributors who have responsibly disclosed vulnerabilities to us. Your efforts help make Devvscape more secure for everyone.

## Security Hall of Fame

- [Security Researcher Name] - Found and reported [vulnerability description]
- [Security Researcher Name] - Contributed to security improvements

---

**Thank you for helping keep Devvscape secure! 🔒**

*This security policy is based on the [GitHub Security Policy template](https://github.com/github/securitylab/blob/main/SECURITY.md).* 