import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3"

export default async function handler(req, res) {
    const bucket = req.query.bucket;
    const filename = req.query.filename;
    console.log("checking bucket: " + bucket + " filename: " + filename);
    let available = false;
    try {
        const REGION = "us-east-1";
        const s3Client = new S3Client({ region: REGION });
        const input = {
            Bucket: bucket,
            Key: filename
        };
        const command = new HeadObjectCommand(input);
        const response = await s3Client.send(command);
        available = response.$metadata.httpStatusCode === 200;
    } catch(err) {
        console.log(err);
        available = false;
    }

    res.status(200).json({ available })
}
