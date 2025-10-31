// next-auth.d.ts

import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user type to include your custom properties.
   */
  interface Session {
    user: {
      id: string; // Add the 'id' property here
    } & DefaultSession['user']; // ...and keep the default properties
  }

  /**
   * Extends the built-in JWT token type.
   */
  interface JWT {
    id: string; // Add the 'id' property here
  }
}