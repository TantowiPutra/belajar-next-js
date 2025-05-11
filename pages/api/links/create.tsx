import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { getToken } from "next-auth/jwt";

type Response = {
    insertedId?: number;
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ data: Response[] }>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ data: [{ message: "Method Not Allowed" }] });
    }

    try {
        const payload = JSON.parse(req.body);
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET 
        })

        if(!session) {
            return res.status(403).json({
                data: [
                    {
                        message: "Unauthorized"
                    }
                ]
            })
        }

        const data = await db.insert(linksTable)
                             .values({
                                title: payload!.title as string,
                                email: session!.email as string,
                                url  : payload!.url as string
                             })
                             .returning({ insertedId: linksTable.id });

        return res.status(200).json({ data });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ data: [{ message: "Internal Server Error" }] });
    }
}
