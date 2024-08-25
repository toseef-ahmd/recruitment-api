import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RecruitmentApiStack } from '../lib/recruitment-api-stack';

describe('RecruitmentApiStack', () => {
  let app: cdk.App;
  let stack: RecruitmentApiStack;
  let template: Template;

  beforeEach(() => {
    app = new cdk.App();
    stack = new RecruitmentApiStack(app, 'TestRecruitmentApiStack');
    template = Template.fromStack(stack);
  });

  it('should create Lambda functions for GET and POST', () => {
    template.resourceCountIs('AWS::Lambda::Function', 2);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler', // Matches the actual handler generated by NodejsFunction
      Runtime: 'nodejs18.x',
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler', // Matches the actual handler generated by NodejsFunction
      Runtime: 'nodejs18.x',
    });
  });

  it('should create an API Gateway', () => {
    template.resourceCountIs('AWS::ApiGateway::RestApi', 1);

    template.hasResourceProperties('AWS::ApiGateway::RestApi', {
      Name: 'RecruitmentApi',
    });
  });

  it('should create GET method for /hello/{name}', () => {
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'GET',
    });
  });

  it('should create POST method for /hello', () => {
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'POST',
    });
  });

  it('should integrate GET and POST methods with Lambda functions', () => {
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        Type: 'AWS_PROXY',
      },
    });

    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'POST',
      Integration: {
        IntegrationHttpMethod: 'POST',
        Type: 'AWS_PROXY',
      },
    });
  });
});
