import Prompt from "@models/Prompt"
import { ConnectedToDB } from "@utils/database"

//GET (read)
export const GET = async (req, { params }) => {
    try {
        await ConnectedToDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) {
            return new Response('the prompt not found', { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response(error, { status: 500 })
    }
}
//PATCH (update)
export const PATCH = async (req, { params }) => {
    //extract the new data from user
    const { prompt, tag } = await req.json()
    console.log(params.id)
    try {
        await ConnectedToDB()
        //find specific prompt
        const existingPrompt = await Prompt.findById(params.id).populate('creator')

        //check the prompt
        if (!existingPrompt) {
            return new Response("fetch failed to data", { status: 404 })
        }

        //change the data
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        //save the data
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        new Response(error, { status: 500 })
    }
}
//DELETE (delete)
export const DELETE = async (req, { params }) => {

    try {
        //connect to db
        await ConnectedToDB()

        //find the target prompt and remove
        await Prompt.findByIdAndRemove(params.id)

        return new Response("Deleted successfully", { status: 200 })

    } catch (error) {
        return new Response(error, { status: 500 })
    }
}