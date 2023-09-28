import { NextRequest, NextResponse } from "next/server";

import KVStore from "@/lib/kvStore";

export async function POST(req: NextRequest) {
  const { deviceId, fileName, speakers } = await req.json();
  const transcriptMetaRaw = await KVStore.get(`${deviceId}:${fileName}`);
  const transcriptMeta = JSON.parse(transcriptMetaRaw || "{}");

  await KVStore.set(
    `${deviceId}:${fileName}`,
    JSON.stringify({
      ...transcriptMeta,
      speakerAliases: speakers,
    })
  );

  return NextResponse.json({ speakers });
}
