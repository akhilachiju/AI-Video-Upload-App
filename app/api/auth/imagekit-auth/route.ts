import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC__KEY as string,
    });

    return Response.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit auth error:", error);
    return Response.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
