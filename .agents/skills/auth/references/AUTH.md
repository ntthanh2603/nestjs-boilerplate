# 🛡️ Authentication Module

This project uses **Better Auth** for its authentication system, integrated into NestJS. It provides a robust, multi-session, and highly extensible auth solution.

---

## 🏗️ Architecture

The authentication is handled in `src/modules/auth` and integrated via the `@thallesp/nestjs-better-auth` wrapper.

- **Engine**: [Better Auth](https://better-auth.com/)
- **Database**: PostgreSQL (via PG_POOL)
- **Secondary Storage**: Redis (for rate limiting and session caching)

---

## ✨ Features & Plugins

| Plugin | Description |
| :--- | :--- |
| **Admin** | Role-based access control (RBAC) with `USER` and `ADMIN` roles. |
| **JWT** | Cross-platform authentication support. |
| **Bearer** | Stateless authentication using Bearer tokens. |
| **Two Factor** | 2FA via Email OTP (using `MailService`). |
| **Email OTP** | Passwordless login and verification via email. |
| **Multi-Session** | Support for multiple active sessions per user. |
| **Social** | Support for Google and Apple sign-in. |

---

## 🛠️ Configuration

Key environment variables in `.env`:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_BASE_URL=http://localhost:3000/api/auth
FRONTEND_URL=http://localhost:5173

# Social Sign-in
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
APPLE_PRIVATE_KEY=...
```

---

## 🔐 Security

### Rate Limiting
Custom rules are applied to sensitive endpoints:
- `Sign Up/In`: Heavily regulated to prevent brute force.
- `OTP Sending`: Limited to 1 request per minute.
- `Forgot/Reset Password`: Limited to prevent spam.

### User Schema Extensions
The user model includes additional fields for business logic:
- `role`: (`USER`, `ADMIN`)
- `status`: (`ACTIVE`, `INACTIVE`, `BANNED`)
- `isVerifiedKyc`: Boolean flag for KYC status.
- `mediaId`: Reference to avatar/profile picture in Storage.

---

## 📜 API Documentation

Visit the interactive auth documentation at:
- **Local**: `http://localhost:3000/api/auth/docs`
- **Reference**: [Better Auth Documentation](https://www.better-auth.com/docs/introduction)
