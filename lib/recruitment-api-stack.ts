import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { ApiGateway } from './api-gateway';
import * as path from 'path';

export class RecruitmentApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function for handling GET requests
    const helloGetFunction = new NodejsFunction(this, 'HelloGetFunction', {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../src/hello-get/hello-get.ts'),
      handler: 'handler',
    });

    // Lambda function for handling POST requests
    const helloPostFunction = new NodejsFunction(this, 'HelloPostFunction', {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../src/hello-post/hello-post.ts'),
      handler: 'handler', 
    });

    // API Gateway and integrate it with the Lambda functions
    new ApiGateway(this, 'RecruitmentApiGateway', {
      helloGetFunction,
      helloPostFunction,
    });
  }
}
