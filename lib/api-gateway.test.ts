import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ApiGateway } from './api-gateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

describe('ApiGateway Construct', () => {
    let stack: cdk.Stack;
    let helloGetFunction: NodejsFunction;
    let helloPostFunction: NodejsFunction;

    beforeEach(() => {
        
        stack = new cdk.Stack();

        // Mock Lambda functions for GET and POST
        helloGetFunction = new NodejsFunction(stack, 'HelloGetFunction', {
            entry: 'src/hello-get/hello-get.ts',
        });

        helloPostFunction = new NodejsFunction(stack, 'HelloPostFunction', {
            entry: 'src/hello-post/hello-post.ts',
        });

        // Instantiate the ApiGateway construct with the mocked Lambda functions
        new ApiGateway(stack, 'TestApiGateway', {
            helloGetFunction,
            helloPostFunction,
        });
    });

    it('should create an API Gateway with the correct name', () => {
        const template = Template.fromStack(stack);

        template.hasResourceProperties('AWS::ApiGateway::RestApi', {
            Name: 'RecruitmentApi',
        });
    });

    it('should create a GET method for the /hello/{name} resource', () => {
        const template = Template.fromStack(stack);

        template.hasResourceProperties('AWS::ApiGateway::Method', {
            HttpMethod: 'GET',
        });
    });

    it('should create a POST method for the /hello resource', () => {
        const template = Template.fromStack(stack);

        // Assert that the POST method is created for the /hello resource
        template.hasResourceProperties('AWS::ApiGateway::Method', {
            HttpMethod: 'POST',
        });
    });

});
