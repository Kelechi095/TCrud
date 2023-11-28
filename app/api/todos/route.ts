import { NextApiRequest, NextApiResponse } from "next";

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prismadb";


export async function POST(request: NextRequest, response: NextApiResponse) {
  const {title, userId} = await request.json();
  if (!title)
    return NextResponse.json({
      error: "Invalid Data",
    });

  await prisma.todo.create({
    data: {title, completed: false, posterId: userId}
  });

  return NextResponse.json({msg: 'Todo created successfully'});
}



