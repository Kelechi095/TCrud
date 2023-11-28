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
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.todo.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ message: "Todo deleted" });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { newTitle } = await req.json();
  await prisma.todo.update({
    where: {
      id: params.id,
    },
    data: {
      title: newTitle,
    },
  });
  return NextResponse.json({ message: "Todo Updated" });
}

/* export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const {completed} = await req.json()
    await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: {
        completed: !completed,
      },
    });
    return NextResponse.json({ message: "Todo Updated" });
  }
 */
