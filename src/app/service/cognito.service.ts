import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoIdentityServiceProvider } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';

@Injectable()
export class CognitoService {
  private userPool: CognitoUserPool;
  private poolData: any;
  public cognitoCreds: AWS.CognitoIdentityCredentials;

  constructor() {
    AWS.config.region = environment.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.identityPoolId
    });
    this.poolData = {
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId
    };
    this.userPool = new CognitoUserPool(this.poolData);
  }

  signUp(username: string, password: string): Promise<any> {
    const dataEmail = { Name: 'email', Value: username };
    const attributeList = [];
    attributeList.push(new CognitoUserAttribute(dataEmail));
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  confirmation(username: string, confirmation_code: string): Promise<any> {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    return  new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmation_code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  login(username: string, password: string): Promise<any> {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    const authenticationData = { Username : username, Password : password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const creds = this.buildCognitoCreds(result);
          AWS.config.credentials = creds;
          this.cognitoCreds = creds;
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  buildCognitoCreds(session: any): AWS.CognitoIdentityCredentials {
    const logins: AWS.CognitoIdentity.LoginsMap = {};
    const url = `cognito-idp.${environment.region}.amazonaws.com/${environment.userPoolId}`;
    logins[url] = session.getIdToken().getJwtToken();
    return new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.identityPoolId,
      Logins: logins
    });
  }

  logout() {
    this.userPool.getCurrentUser().signOut();
  }

  getCredentials(): Promise<AWS.CognitoIdentityCredentials> {
    const cognitoUser = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser === null) { reject(cognitoUser); }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          const creds = this.buildCognitoCreds(session);
          AWS.config.credentials = creds;
          resolve(creds);
        }
      });
    });
  }

  isAuthenticated(): Promise<any> {
    const cognitoUser = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser === null) { reject(cognitoUser); }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          if (!session.isValid()) {
            reject(session);
          } else {
            resolve(session);
          }
        }
      });
    });
  }
}
