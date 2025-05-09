import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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
  

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import useSWR from "swr"
 
const formSchema = z.object({
  title: z.string().min(1),
  url  : z.string().min(1)
})

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

export default function Home() {
    const { data: dataLinks, isLoading } = useSWR("/api/links", fetcher);
    const [Loading, setLoading] = useState<boolean>(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            url: '',
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        console.log(values)

        try {
            const response = await fetch('/api/links/create', {
                method: "POST",
                body: JSON.stringify(values)
            })

        }catch(error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Form Create Link</CardTitle>
                    <CardDescription>submit your link here</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title ..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Title min. 1 Character(s)
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="URL ..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    URl min. 1 Character(s)
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <Button type="submit" disabled={Loading}>{ Loading ? "Loading..." : "Submit" }</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {isLoading && <p>Loading...</p>}
            {
                dataLinks?.data?.map((link: Response) => 
                    <Card key={link.id}>
                        <CardContent key={link.id} className="flex justify-between">
                            <a key={link.id} href={link.url} target="_blank">{link.title}</a>
                            <Drawer>
                                <DrawerTrigger>Edit</DrawerTrigger>
                                
                                <DrawerContent>
                                    <DrawerHeader>
                                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                    <Button>Submit</Button>
                                    <DrawerClose>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </CardContent>
                    </Card>
                )
            }
        </div>
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