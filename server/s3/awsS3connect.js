import { S3Client, GetObjectCommand, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


const s3Client = new S3Client({
    region: process.env.AWS_REGION, 
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID, 
        secretAccessKey: process.env.AWS_SECRETACCESSKEY 
    }
});

const bucket = process.env.AWS_BUCKET_NAME;

export async function getFileUrlFromS3(key, type, expiryTime) {
    try {
        let fileName;
        switch(type) {
            case 'song':
                fileName = `full/${key}`
                break
            case 'snippet':
                fileName = `snippet/${key}`
                break
            case 'portrait':
                fileName = `portraits/${key}`
                break
        }

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: fileName, 
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: expiryTime });
        return url;

        
    } catch (err) {
        console.log("error ::", err);
        return "error";
    }
}

export async function getUploadUrl(folderName, fileName, fileType, expiryTime) {
    try {
        let key
        switch(folderName) {
            case 'song':
                key = `test/${fileName}`
                break
            case 'snippet':
                key = `testtwo/${fileName}`
                break
            case 'portrait':
                key = `test/${fileName}`
                break
        }
            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                ContentType: fileType, 
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: expiryTime });
        return url;

        } catch (err) {
    console.error("S3 signed URL generation failed:", err);
    throw err; 
    }
}

export async function moveObject(folderName, newFileName, oldFileName) { 
    await s3Client.send(
        new CopyObjectCommand({
            Bucket: bucket,
            Key: `${bucket}/archive_${folderName}/${newFileName}`,
            CopySource: `${folderName}/${oldFileName}`
        }).promise()
    )

    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucket,
            Key: `${folderName}/${oldFileName}`
        }).promise()
    )

}