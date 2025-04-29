import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    id?: string | string[] | undefined;
    name?: string;
    message?: string;
    data?: object;
    headers ?: string | string[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const method : string | undefined = req.method;

    if(method === 'GET') {
        res.status(200).json({ id: req.query.id, name: 'John Doe', message: 'success', data: req.body, headers: req.headers['api-token']})
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}