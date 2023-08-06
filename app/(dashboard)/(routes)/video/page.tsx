"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { VideoIcon } from  "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"

import { Heading } from "@/components/Heading"
import { formSchema } from "./constants"
import { Loader } from "@/components/Loader"
import { Empty } from "@/components/Empty"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { limit, incrementLimit } from "@/lib/limit"

const VideoPage = () => {

    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (limit() < 5) {
                setVideo(undefined);
                const response = await axios.post("/api/video", values)

                incrementLimit();
                setVideo(response.data[0]);
                form.reset();
            } else {
                toast.error("You have reached your account limit.")
            }
        } catch (error)  {
            //OPEN PRO MODAL
            console.log("error " + error)
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading 
                title="Video Generation"
                description="Turn you prompt into video."
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader message="Video is being generated, Video generation takes time!!! Dont leave this page"/>
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video generated yet."/>
                    )}
                    {video && (
                        <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                            <source src={video} />
                        </video>    
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;