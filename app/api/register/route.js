import User from "@models/User"
import { hashPassword } from "@utils/bcryptPassword"
import { ConnectedToDB } from "@utils/database"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const { email, password } = await req.json()
        console.log({ email, password })

        const passwordHashed = await hashPassword(password)
        await ConnectedToDB()

        const newUser = new User({
            email: email,
            password: passwordHashed
        })
        await newUser.save()
        return new NextResponse(JSON.stringify(newUser), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 404 });
    }
}