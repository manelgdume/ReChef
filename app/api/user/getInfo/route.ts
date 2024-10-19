import User from '@/app/models/User';
import connectDB from '@/lib/connectDB';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    auth().protect()    
    try {
        await connectDB();
        const userID = body.params.userID;
 
        const user = await User.findOne({idClerk: userID});

        if (!user) {
            const userData = {
                idClerk: userID,
                recipesGenerated: 0,
                subActive:true
            }
            const newUser = new User(userData);
            await newUser.save(); 
            return NextResponse.json(userData, { status: 200 });
        }   
 
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al obtener la receta' }, { status: 500 });
    }
}