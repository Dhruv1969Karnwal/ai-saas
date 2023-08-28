import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import getCurrentUser from "@/lib/session";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.name) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instructions || !seed || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    };

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const companion = await prisma.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.name,
        src,
        name,
        description,
        instructions,
        seed,
      }
    });

    if(!isPro){
      await incrementApiLimit();
    }

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};