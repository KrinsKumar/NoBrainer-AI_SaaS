"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon, Download } from  "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form";
import Image from "next/image"
import { toast } from "react-hot-toast"

import { Heading } from "@/components/Heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formSchema, amountOptions, resolutionOptions } from "./constants"
import { Loader } from "@/components/Loader"
import { Empty } from "@/components/Empty"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { limit, incrementLimit } from "@/lib/limit"

const ImagePage = () => {

    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (limit() < 5) {
                setImages([]);
                const response = await axios.post("/api/image", values);

                const urls = response.data.map((image: {url: string}) => image.url);
                setImages(urls);
                incrementLimit();
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
                title="Image Generation"
                description="Turn your prompt into an image"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="A picture of a horse in Swiss alps" {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                            <FormField 
                                name="amount"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select 
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="resolution"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select 
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated"/>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cold-4 gap-4 mt-8">
                        {images.map((image) => (
                            <Card key={image} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image 
                                        alt="Generated image"
                                        fill
                                        src={image}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button variant="secondary" className="w-full" onClick={() => window.open(image)}>
                                        <Download className="h-4 w-4 mr-2"/>
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;