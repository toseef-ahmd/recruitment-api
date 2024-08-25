import { Construct } from 'constructs';
import { RestApi, LambdaIntegration, ApiKey, UsagePlan, Cors, ApiKeySourceType } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { HttpMethod } from 'aws-cdk-lib/aws-events';
import { CfnOutput } from 'aws-cdk-lib';

export interface ApiGatewayProps {
  helloGetFunction: NodejsFunction;
  helloPostFunction: NodejsFunction;
}

export class ApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id);

    const api: RestApi = new RestApi(this, 'RestAPI', {
      restApiName: 'RecruitmentApi',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      apiKeySourceType: ApiKeySourceType.HEADER,
    });

    const apiKey = new ApiKey(this, 'ApiKey');

    const usagePlan = new UsagePlan(this, 'UsagePlan', {
      name: 'Usage Plan',
      apiStages: [
        {
          api,
          stage: api.deploymentStage,
        },
      ],
    });

    usagePlan.addApiKey(apiKey);

    const resourceHelloPost = api.root.addResource('hello'); 
    const resourceHelloGet = resourceHelloPost.addResource('{name}');


    const helloGetIntegration = new LambdaIntegration(props.helloGetFunction);
    const helloPostIntegration = new LambdaIntegration(props.helloPostFunction);

    // GET /hello/{name}
    resourceHelloGet.addMethod(HttpMethod.GET, helloGetIntegration);

    // POST /hello
    resourceHelloPost.addMethod(HttpMethod.POST, helloPostIntegration);


    new CfnOutput(this, 'API Key ID', {
      value: apiKey.keyId,
    });
  }
}

