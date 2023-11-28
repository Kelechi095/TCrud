import bcrypt from 'bcrypt'
import prisma from '../../lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: any){
    const body = await request.json();
    const { username, email, password } = body;

    if(!username || !email || !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}