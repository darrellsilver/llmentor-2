import { NextRequest, NextResponse } from "next/server";

import KVStore from "@/lib/kvStore";

export async function GET(req: NextRequest) {
  console.log("***GET /transcriptions");
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
    console.log(`***KEY ${key}`);
    console.log(`***transcriptionMetaRaw: ${transcriptionMetaRaw}`);
    const transcriptionMeta = JSON.parse(transcriptionMetaRaw || "{}");
    transcriptions.push(transcriptionMeta);
  }

  return NextResponse.json({ transcriptions });
}
