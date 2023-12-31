"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Music } from  "lucide-react"
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

const MusicPage = () => {

    const router = useRouter();
    const [music, setMusic] = useState<string>();
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
                setMusic(undefined);
                const response = await axios.post("/api/music", values)

                incrementLimit();
                setMusic(response.data.audio);
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
                title="Music Generation"
                description="Turn you prompt into music"
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Piano solo similar to river flows in you." {...field}/>
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
                            <Loader message="Audio is being generated, Audio generation takes time!!! Dont leave this page"/>
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label="No music generated yet."/>
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>    
                    )}
                </div>
            </div>
        </div>
    );
}

export default MusicPage;