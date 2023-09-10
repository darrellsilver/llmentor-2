import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { speaker } = await req.json();

  console.log(`[generate-scorecard][POST] Generating scorecard for ${speaker}`);

  return NextResponse.json({
    aggression: "G",
    bias: "R",
    consistency: "Y",
    deEscalation: "G",
    dominance: "Y",
    goalOrientedness: "G",
  });
}
