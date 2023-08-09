import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  // if there are missing fields
  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  // if email already exists
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("Email already exists", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
