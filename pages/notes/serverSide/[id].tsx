import { GetServerSideProps, InferGetServerSidePropsType} from "next";

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

export const getServerSideProps = (async (context) => {
    const { params } = context;

    const note = await fetch(`https://service.pace11.my.id/api/note/${params?.id || '1'}`).then(
        (res) => res.json()
    );

    return { props: { note } };
}) satisfies GetServerSideProps<{ note : Notes }>

export default function NotesServerPage({ note } : InferGetServerSidePropsType<typeof getServerSideProps>) {
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