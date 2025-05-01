import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const formSchema = z.object({
    title       : z.string().min(1, 'Title Wajib Diisi'),
    description : z.string().min(1, 'Description Wajib Diisi!'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST") {
        return res.status(405).json({ errorMessage: 'Method not Allowed' });
    }
    
    try {
        const validatedData = formSchema.parse(req.body);

        const response = await fetch(`${process.env.API_CREATE_URL}`, {
            method: 'POST',
            body: JSON.stringify(validatedData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) {
            res.status(403).json({
                message: "Contoh Bad Request",
                data: await response.json()
            })
        }

        const respBody = await response.json();

        res.status(200).json({
            message: "Successfully Created New Note",
            data: respBody.data
        })
    } catch(error) {
        if(error instanceof z.ZodError) {
            const errors = Object.keys(error.formErrors.fieldErrors)?.reduce((acc, key) => {
                acc[key] = error.formErrors.fieldErrors[key]?.[0] || "Unknown Error";
                return acc;
            }, {} as Record<string, string>);

            return res.status(400).json({
                message: errors
            });
        }

        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}