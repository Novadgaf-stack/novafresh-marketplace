# NovaFresh Marketplace Technical Architecture

## Modular Routing Strategy (Next.js App Router)

The NovaFresh application leverages the Next.js App Router (`/app` directory) for its modular routing architecture. This approach was selected over client-side-only routing solutions (like React Router) to provide:

1. **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: Enhances initial load performance and SEO capabilities, crucial for a public-facing marketplace.
2. **Nested Layouts**: The `(dashboard)` route group enforces consistent UI wrappers (Sidebar, Header, Footer) without redundant renders across internal views.
3. **Role-Based Access Control (RBAC) at the Middleware/Layout Level**: By centralizing auth and role-checking, we ensure secure, context-aware navigation (e.g., redirecting users based on `customer`, `vendor`, or `admin` scopes).

## State Management

- **Context API**: Utilized for `UserSession` and `CartState` to guarantee predictable global data flows.
- **Simulated API Interceptors**: Prepared for drop-in JWT integration with Node.js/MongoDB backends.
