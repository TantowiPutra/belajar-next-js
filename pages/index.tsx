import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import FormContainer from "@/container/FormContainer";
import useSWR from "swr"
import { useState, useRef } from "react";
import { getToken } from 'next-auth/jwt'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

type Response = {
    id?: number
    title?: string
    url?: string
    created_at?: Date | null
    updated_at?: Date | null
    deleted_at?: Date | null
    message ?: string
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const getServerSideProps = async (context: any) => {
    const token = await getToken({
        req: context.req,
        secret: process.env.NEXTAUTH_SECRET
    })

    if(!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {
    const session = useSession();
    const [isDeleted, setIsDeleted] = useState<number | null>(null);

    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [valueEdit, setValueEdit] = useState<{
        id?: number;
        title?: string;
        url?: string;
    }>({
        id: 0,
        title: '',
        url: '',
    });

    const { data: dataLinks, isLoading, mutate } = useSWR("/api/links", fetcher);
    
    const handleDelete = async (id: number) => {
        try {
            await fetch(`/api/links/delete/${id}`, {
                method: 'DELETE'
            })
            alert("Success!");
        } catch (error) {
            
        } finally {
            setIsDeleted(null);
            mutate(); 
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                <div className="container">
                    <h1 className="text-xl font-bold">{`Hello, ${session?.data?.user?.name} !!`}</h1>
                    <p>{`This is an area to create your links, so let's put here!`}</p>
                    <Button className="mt-4" onClick={() => signOut()}>Sign Out</Button>
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => {setShowCreate(true)}}>Add Link</Button>
                </div>

                {isLoading && <p>Loading...</p>}
                {
                    dataLinks?.data?.map((link: Response) => 
                        <Card key={link.id}>
                            <CardContent key={link.id} className="flex justify-between">
                                <a key={link.id} href={link.url} target="_blank">{link.title}</a>
                                <div>
                                    <Button size="sm" onClick={() => {
                                        setValueEdit({
                                            id: link.id,
                                            title: link.title,
                                            url: link.url
                                        })
                                        setShowEdit(true);
                                    }} variant="secondary">Edit</Button>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="destructive" size="sm" onClick={() => setIsDeleted(link.id!)}>Delete</Button>
                                            </PopoverTrigger>
                                            {   
                                                isDeleted == link.id! &&
                                                <PopoverContent className="w-80">
                                                    <div className="grid gap-4">
                                                        <p>Are you sure to delete this data?</p>
                                                        <Button size="sm" onClick={() =>{
                                                            handleDelete(link.id!); 
                                                            setIsDeleted(null)
                                                        }}>Yes</Button>
                                                    </div>
                                                </PopoverContent>
                                            }
                                    </Popover>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
            </div>

            {/* DRAWER EDIT */}
            <Drawer open={showEdit} onOpenChange={setShowEdit}>
                <DrawerContent>
                    <div className="container mx-auto p-4">
                        <FormContainer id={valueEdit.id} values = {{ 
                            title: valueEdit.title!,
                            url  : valueEdit.url  !,
                         }} 
                         onFinished={() => {
                            setShowEdit(false);
                            mutate();
                         }}
                         />
                    </div>
                </DrawerContent>
            </Drawer>

            {/* DRAWER CREATE */}
            <Drawer open={showCreate} onOpenChange={setShowCreate}>
                <DrawerContent className="p-4">
                    <CardHeader className="mb-5">
                        <CardTitle>Form Create Link</CardTitle>
                        <CardDescription>submit your link here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormContainer onFinished={() => {
                            setShowCreate(false);
                            mutate();
                        }}/>
                    </CardContent>
                </DrawerContent>
            </Drawer>
        </>
    )
}
/* 
    PENDEKATAN ROUTING MENGGUNAKAN FOLDER
    - profile/index.tsx

    PENDEKATAN INDEX ROUTING
    - profile.tsx

    PENDEKATAN NESTED ROUTING
    - /about/me, didalam folder about, path rootnya memiliki nama index.tsx, sehingga index.tsx merepresentasikan /about (root) 
*/

// ! CONTOH PENGGUNAAN INDEX ROUTE
// export default function Home() {
//     // INI ROUTE HALAMAN INDEX
//     // WEBSITE MEMERLUKAN TAMBAHAN METADATA DISINI
//     return (
//         <>
//             <div className={styles.footer}>
//                 Index Page
//             </div>

//             <div id={styles.footer_baru}>
//                 Test CSS Selector Using ID
//             </div>

//             <h1 className="text-3xl font-bold underline">
//                 Hello world!
//             </h1>
//         </>
//     );
// }