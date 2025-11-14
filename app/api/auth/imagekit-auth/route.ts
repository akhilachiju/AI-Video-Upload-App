import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
    });

    return Response.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_URL_ENDPOINT,
    });
  } catch {
    return Response.json(
      {
        error: "Authentication for imagekit failed",
      },
      {
        status: 500,
      }
    );
  }
}
