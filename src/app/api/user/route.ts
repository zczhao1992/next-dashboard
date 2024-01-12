import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const data = await prisma.user.findMany();
  // const data = await prisma.user.findUnique({
  //   where: {
  //     email: "zc@email.com",
  //   },
  // });
  return NextResponse.json(
    {
      data,
      msg: "success",
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  const createMany = await prisma.user.createMany({
    data: body.list,
  });

  return NextResponse.json(
    {
      data: createMany,
      msg: "success",
    },
    { status: 200 }
  );
}
