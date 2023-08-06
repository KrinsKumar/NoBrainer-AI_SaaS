import Image from "next/image"

export const Loader = ({message}:{message?:string}) => {
    message = message || "No Brainer is using Brain"
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image fill alt="loading wheel" src="/logo.png"/>
            </div>
            <p className="text-sm text-muted-foreground">
                {message}
            </p>
        </div>
    )
};