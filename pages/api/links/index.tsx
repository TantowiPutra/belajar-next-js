import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { isNull, desc, and, eq } from 'drizzle-orm'
import { getToken } from "next-auth/jwt";

type Response = {
    id?: number
    title?: string
    url?: string
    created_at?: Date | null
    updated_at?: Date | null
    deleted_at?: Date | null
    message ?: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ data: Response[] }>) {
    if (req.method !== 'GET') {
        return res.status(405).json({ data: [{ message: "Method Not Allowed" }] });
    }

    try {
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

        const data = await db.select()
                             .from(linksTable)
                             .where(and(isNull(linksTable.deleted_at), eq(linksTable.email, session?.email as string)))
                             .orderBy(desc(linksTable.updated_at))

        return res.status(200).json({ data });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ data: [{ message: "Internal Server Error" }] });
    }
}
