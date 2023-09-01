import User from "@models/User"
import { ConnectedToDB } from "@utils/database"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    console.log('waiting for fetch data')
    try {
        const { email } = await req.json();
        await ConnectedToDB();
        console.log('getting data', email);
        const user = await User.findOne({ email: email });

        if (user) {
            return new NextResponse(JSON.stringify(user), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify('User not found'), { status: 404 });
        }
    } catch (error) {
        return new NextResponse('failed to find the user', { status: 500 })
    }
}