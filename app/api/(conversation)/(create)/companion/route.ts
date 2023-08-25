import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import getCurrentUser from "@/lib/session";

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

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};