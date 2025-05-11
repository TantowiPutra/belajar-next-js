import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { linksTable } from "@/lib/db/schema";
import { sql,eq } from "drizzle-orm";

type Response = {
    deletedId?: number;
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ data: Response[] }>) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ data: [{ message: "Method Not Allowed" }] });
    }

    try {
        const data = await db.update(linksTable)
                             .set({
                                deleted_at: sql`NOW()`
                             })
                             .where(eq(linksTable.id, Number(req.query.id)))
                             .returning({ deletedId: linksTable.id });

        return res.status(200).json({ data });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ data: [{ message: "Internal Server Error" }] });
    }
}
