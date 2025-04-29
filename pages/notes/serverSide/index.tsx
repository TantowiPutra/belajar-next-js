import { GetServerSideProps, InferGetServerSidePropsType} from "next";
import Link from "next/link";

type ListNodes = {
    id          : number;
    title       : string;
    description : string;
    created_at  : string;
    updated_at  : string;
}

type Notes = {
    success: boolean;
    message: string;
    data: ListNodes[];
}

export const getServerSideProps = (async () => {
    const notes = await fetch("https://service.pace11.my.id/api/notes?page=1&limit=10").then(
        (res) => res.json()
    );

    return { props: { notes } };
}) satisfies GetServerSideProps<{ notes : Notes }>

export default function NotesServerPage({ notes } : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {
                notes.data.map((note: ListNodes) => (
                    <Link href={`/notes/serverSide/${note.id}`} key={note.id} className="p-4 bg-white shadow-sm rounded">
                        <h1>{note.title}</h1>
                        <p>{note.description}</p>
                    </Link>
                ))
            }
        </div>
    )
}