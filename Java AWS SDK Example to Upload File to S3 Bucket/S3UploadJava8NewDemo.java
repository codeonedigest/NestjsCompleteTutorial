


import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;

public class S3UploadJava8NewDemo {

    private final String bucketName = "sea-ecomm-asia-dev";
    private final String localFile = "testimage.png";

    private final String targetLocation = "POC/Australia/";

    public static void main(String[] args) {

        S3UploadJava8NewDemo demoObject = new S3UploadJava8NewDemo();

        demoObject.sop(" ### Start File Uploading to S3 ###");
        demoObject.uploadFileToS3Bucket();
        demoObject.sop(" ### Finished File Uploading to S3 ###");
    }


    private void uploadFileToS3Bucket() {

        //Step1 - Create S3Client object.
        S3Client client = S3Client.builder().build();
        sop("S3 Client Initialized");

        //Step2 - Create PutObjectRequest object.
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName).key(targetLocation+localFile).build();
        sop("PutObjectRequest is created sucessfully");

        //Step3 - Upload local file to S3 using above request object.
        client.putObject(request, RequestBody.fromFile(new File(localFile)));
        sop("File uploaded successfull!!");
    }




    private void sop(String msg) {
        System.out.println(msg);
    }
}
