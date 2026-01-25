import {NextApiRequest, NextApiResponse} from "next";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    const currentTime = new Date().toLocaleTimeString()
    response.status(200).json({time: currentTime})
}