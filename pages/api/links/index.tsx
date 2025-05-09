import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";

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
        const data = await db.select().from(linksTable)

        return res.status(200).json({ data });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ data: [{ message: "Internal Server Error" }] });
    }
}
