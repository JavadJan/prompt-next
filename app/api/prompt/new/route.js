import Prompt from "@models/Prompt";
import { ConnectedToDB } from "@utils/database";
export const POST = async (req) => {
    console.log('go to post method')
    try {
        const { userId, prompt, tag } = await req.json();
        await ConnectedToDB()
        console.log('connected to db' )
        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt
        });
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("failed to create new prompt", { status: 500 })
    }
}

