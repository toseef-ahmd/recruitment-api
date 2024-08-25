import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { HttpMethod } from 'aws-cdk-lib/aws-events';

export interface ApiGatewayProps {
  helloGetFunction: NodejsFunction;
  helloPostFunction: NodejsFunction;
}

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);

    const api: RestApi = new RestApi(this, id, { restApiName: 'RecruitmentApi' });

    // GET /hello/{name}
    const helloResource = api.root.addResource('hello'); // First add the 'hello' resource
    const resourceHelloGet = helloResource.addResource('{name}'); // Then add the '{name}' resource as a child
    resourceHelloGet.addMethod(HttpMethod.GET, new LambdaIntegration(props.helloGetFunction));

    // POST /hello
    helloResource.addMethod(HttpMethod.POST, new LambdaIntegration(props.helloPostFunction));
  }
}
