import useSWR from "swr"
import Link from "next/link";

type ListNodes = {
    id          : number;
    title       : string;
    description : string;
    created_at  : string;
    updated_at  : string;
}

const fetcher = (url: string) => (
    fetch(url)
        .then((res) => res.json())
)

export default function NoteClientPage() {
    const { data, isLoading, error } = useSWR("https://service.pace11.my.id/api/notes?page=1&limit=10", fetcher,
        {
            revalidateOnFocus: true,
            refreshInterval: 3000
        }
    );

    if(isLoading) 
        return <div>Loading...</div>

    return (
        <div className="grid grid-cols-4 gap-4">
            {   !error ?
                data.data.map((note: ListNodes) => (
                    <Link href={`/notes/serverSide/${note.id}`} key={note.id} className="p-4 bg-white shadow-sm rounded">
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>
                    </Link>
                ))
                : "Terjadi Kesalahan"
            }
        </div>
    )
}