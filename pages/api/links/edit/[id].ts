import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { sql,eq } from "drizzle-orm";

type Response = {
    updatedId?: number;
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ data: Response[] }>) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ data: [{ message: "Method Not Allowed" }] });
    }

    try {
        const payload = JSON.parse(req.body);

        const data = await db.update(linksTable)
                             .set({
                                title: payload.title,
                                url  : payload.url,
                                updated_at: sql`NOW()`
                             })
                             .where(eq(linksTable.id, Number(req.query.id)))
                             .returning({ updatedId: linksTable.id });

        return res.status(200).json({ data });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ data: [{ message: "Internal Server Error" }] });
    }
}
