const requiredEnvVars = {
  MONGODB_URI: process.env.MONGODB_URI,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  NEXT_PUBLIC_PUBLIC__KEY: process.env.NEXT_PUBLIC_PUBLIC__KEY,
  NEXT_PUBLIC_URL_ENDPOINT: process.env.NEXT_PUBLIC_URL_ENDPOINT,
} as const;

export function validateEnv() {
  const missing = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return requiredEnvVars as Record<keyof typeof requiredEnvVars, string>;
}

export const env = validateEnv();
