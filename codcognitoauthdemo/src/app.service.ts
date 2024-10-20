
import { UserLoginDto } from './UserLoginDto';
import { Injectable } from '@nestjs/common';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';



@Injectable()
export class AppService {

  private cognitoUserPool: CognitoUserPool;


  constructor() {
    this.cognitoUserPool = new CognitoUserPool({
      UserPoolId: 'us-east-1_FVDDOcRSr',
      ClientId: '30bge6f7t7c1d26macs9vcjciq',
    });
    
  }
  

  async loginUser(userLoginDto: UserLoginDto) {
    return new Promise((resolve, reject) => {
      console.log(userLoginDto.email + "    " + userLoginDto.password);
      const authenticationDetails = new AuthenticationDetails({
        Username: userLoginDto.email,
        Password: userLoginDto.password,
      });

      const user = new CognitoUser({
        Username: userLoginDto.email,
        Pool: this.cognitoUserPool,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log("Authentication Successfull");
          const token = result.getAccessToken().getJwtToken();
          resolve({
            token: token,
            status: 'success',
            message: 'User login success',
            data: {
              user: {
                username: userLoginDto.email,
              },
            },
          });
        },
        onFailure: (err) => {
          console.error(err);
          reject({
            status: 'failure',
            message: 'Invalid username/password',
            data: {},
          });
        },
        newPasswordRequired: async (userAttributes, requiredAttributes) => {
          console.log("userAttributes: " + userAttributes + "  requiredAttributes: " + requiredAttributes); 
          user.completeNewPasswordChallenge(
            userLoginDto.password,
            requiredAttributes,
            {
              onSuccess: (result) => {
                const token = result.getAccessToken().getJwtToken();
                resolve({
                  token: token,
                  status: 'success',
                  message: 'User login success',
                  data: {
                    user: {
                      username: userLoginDto.email,
                    },
                  },
                });
              },
              onFailure: () => {
                reject({
                  status: 'failure',
                  message: 'Invalid username/password',
                  data: {},
                });
              },
            },
          );
        },
      });
    });
  }
}
