declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      // NEXTAUTH_SECRET: string; //Session Secret
      // APP_JWT_SECRET: string; //Authorization Token secret
      // NEXTAUTH_URL: string;

      // GOOGLE_CLIENT_ID: string;
      // GOOGLE_CLIENT_SECRET: string;

      // GITHUB_CLIENT_ID:string
      // GITHUB_CLIENT_SECRET:string

      // NEXT_PUBLIC_DB_URL: string;
      // SUPABASE_SERVICE_ROLE_KEY: string;
      NEXT_PUBLIC_BACKEND_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
