import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { CognitoService } from './cognito.service';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(
    private cognito: CognitoService
  ) {
    this.cognito.getCredentials().then((data) => {
      AWS.config.credentials = data;
    }).catch((err) => {
      console.log(err);
    });
    const clientParams: any = {
      region: environment.region,
      apiVersion: '2006-03-01',
      params: { Bucket: environment.bucketName }
    };
    this.s3 = new AWS.S3(clientParams);
  }

  uploadFile(file: any): Promise<any> {
    const params = {
      Bucket: environment.bucketName,
      Key: file.name,
      ContentType: file.type,
      Body: file,
      StorageClass: 'STANDARD',
      ACL: 'private' };
    return this.s3.upload(params).promise();
  }

  getFileList(): Promise<AWS.S3.ListObjectsOutput> {
    const params = { Bucket: environment.bucketName };
    return this.s3.listObjects(params).promise();
  }

  getFile(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params = { Bucket: environment.bucketName, Key: key };
    return this.s3.getObject(params).promise();
  }
}
