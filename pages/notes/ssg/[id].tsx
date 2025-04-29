import { GetStaticProps,  InferGetStaticPropsType} from "next";

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
    data: ListNodes;
}

export const getStaticPaths = async () => {
    const notes = await fetch("https://service.pace11.my.id/api/notes?page=1&limit=10").then(
        (res) => res.json()
    );

    const paths = notes.data.map((note: ListNodes) => ({
        params: {id: note.id.toString()}
    }))

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps = (async (context) => {
    const { params } = context;

    const note = await fetch(`https://service.pace11.my.id/api/note/${params?.id || '1'}`).then(
        (res) => res.json()
    );

    return { 
        props: { note },
    };
}) satisfies GetStaticProps<{ note : Notes }>

export default function NoteSsgDetailPage({ note } : InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {
                note.data && 
                <div key={note.data.id} className="p-4 bg-white shadow-sm rounded">
                    <h1>{note.data.title}</h1>
                    <p>{note.data.description}</p>
                </div>
            }
        </div>
    )
}
