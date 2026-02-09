"use client"

interface VideoPlayerProps {
    url: string
    title: string
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-emerald-50 bg-black">
            <iframe
                src={url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
            />
        </div>
    )
}
