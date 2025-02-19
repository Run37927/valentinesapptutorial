import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    }
})

async function uploadFileToS3(file, fileName, contentType) {
    const fileBuffer = file;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `love-page/${fileName}`,
        Body: fileBuffer,
        ContentType: contentType
    }
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/love-page/${fileName}`
}

export async function POST(req) {
    try {
        const formData = await req.formData()
        const file = formData.get('imageFile')

        if (!file) {
            return new Response("no file found in request", { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const contentType = file.type;
        const fileUrl = await uploadFileToS3(buffer, file.name, contentType)

        return new Response(JSON.stringify({ fileUrl }, { status: 200 }))
    } catch (error) {
        console.error("error uploading to s3:", error)
        return new Response("error uoloading to s3", { status: 500 })
    }
}