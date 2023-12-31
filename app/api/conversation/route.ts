import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai"
import { auth } from "@clerk/nextjs"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

export async function POST(req:Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        let {messages} = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAi key has been removed", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Prompt is required", { status: 400 })
        }

        messages.content = messages.content  + " | reply in two sentences max";

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        })

        return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
        console.log("CONVERSATION_ERROR: ", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}