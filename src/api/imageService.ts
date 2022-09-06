// Import the required AWS SDK clients and commands for Node.js
import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  GetBucketCorsCommand,
  PutBucketCorsCommand,
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';
import { s3Client } from '../lib/s3Client'; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class ImageService {
  bucket: string;
  botId: string;
  constructor(bucket: string) {
    this.bucket = bucket;
  }

  async createSignedUrl({ file, filename }: { file: Express.Multer.File; filename: string }) {
    const command = new PutObjectCommand({
      Bucket: process.env.PHOTO_BUCKET,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ChecksumAlgorithm: 'SHA256',
    });
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });
    return signedUrl;
  }

  async uploadFileToS3({ file, filename }: { file: Buffer; filename: string }) {
    const command = new PutObjectCommand({
      Bucket: process.env.PHOTO_BUCKET,
      Key: filename,
      Body: file,
      // ContentType: file.mimetype,
    });
    return s3Client.send(command);
  }

  public async deleteFile(fileName: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });
      await s3Client.send(command);
    } catch (error) {
      console.error(error);
    }
  }

  public async duplicateExampleBucket() {
    const defaultBucket = { Bucket: process.env.EXAMPLE_BUCKET };
    try {
      const buckets = await s3Client.send(new ListBucketsCommand({}));
      console.log(buckets);
      if (!buckets?.Buckets?.filter(({ Name }) => Name === this.bucket).length) {
        console.log(`Creating bucket ${this.bucket}`);
        console.log(`Waiting for "${this.bucket}" bucket creation...`);
        await s3Client.send(
          new CreateBucketCommand({
            Bucket: this.bucket,
          })
        );
        console.log(`${process.env.PHOTO_BUCKET} successfully created`);
      }
      console.log('Duplicating Policies...');

      // CORS
      const corsData = await s3Client.send(new GetBucketCorsCommand(defaultBucket));
      await s3Client.send(
        new PutBucketCorsCommand({
          Bucket: this.bucket,
          CORSConfiguration: {
            CORSRules: corsData.CORSRules,
          },
        })
      );

      // POLICIES
      const bucketPolicy = await s3Client.send(new GetBucketPolicyCommand(defaultBucket));
      const parsedPolicy = JSON.parse(bucketPolicy.Policy!);
      parsedPolicy.Statement.forEach((state: any) => {
        state.Resource = state.Resource.replace(process.env.EXAMPLE_BUCKET!, this.bucket);
      });

      await s3Client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucket,
          Policy: JSON.stringify(parsedPolicy),
        })
      );
    } catch (err) {
      console.log('Error creating bucket', err);
    }
  }
}

const imageService = new ImageService(process.env.PHOTO_BUCKET!);

export { imageService };
