import { NextRequest, NextResponse } from "next/server";

import KVStore from "@/lib/kvStore";

export async function GET(req: NextRequest) {
  const deviceId = req.nextUrl.searchParams.get("deviceId");

  if (!deviceId) {
    return NextResponse.json({ error: "No device id" });
  }

  const transcriptionKeys = (await KVStore.keys(`${deviceId}:*`)) || [];

  if (!transcriptionKeys?.length)
    return NextResponse.json({ transcriptions: [] });

  const transcriptions = [];
  for (const key of transcriptionKeys) {
    const transcriptionMetaRaw = await KVStore.get(key);
    const transcriptionMeta = JSON.parse(transcriptionMetaRaw || "{}");
    transcriptions.push(transcriptionMeta);
  }

  return NextResponse.json({ transcriptions });
}
