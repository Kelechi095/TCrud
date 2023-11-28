import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";


export async function GET(
  
  req: Request,
  { params }: { params: { id: string } }
) {
  const todos = await prisma.todo.findMany({
    where: {
      posterId: params.id,
    },
  });
  if(!todos) return NextResponse.json({message: 'No todo found'})

  return NextResponse.json(todos);
}
