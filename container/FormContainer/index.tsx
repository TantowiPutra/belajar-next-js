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
import useFormAction from "@/hooks/useFormAction";
import { formType } from "@/hooks/useFormAction";
import { useState } from "react";

export default function FormContainer({ id, values, onFinished } : {
    id? : number; 
    values ?: formType;
    onFinished ?: () => void;
}) {
    const { form } = useFormAction({ values });
    const [Loading, setLoading] = useState<boolean>(false);

    async function onSubmit(values: formType) {
        setLoading(true);

        try {
            const type: 'post' | 'patch' = id ? 'patch' : 'post';
            const mapping: { 
                post: {method: string, url: string};
                patch: {method: string, url: string};
            } = {
                post: {
                    method: "POST",
                    url: "/api/links/create",
                },

                patch: {
                    method: "PATCH",
                    url: `/api/links/edit/${id}`,
                }
            }

            const response = await fetch(mapping[type].url, {
                method: mapping[type].method,
                body: JSON.stringify(values)
            })
        } finally {
            onFinished?.();
            if(!id) form.reset();

            setLoading(false)
        }
    }

    return (
        <>
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
        </>
    );
}