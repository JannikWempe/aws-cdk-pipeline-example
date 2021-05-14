import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as path from "path";
import {CfnOutput} from "@aws-cdk/core";

export class CdkPipelineStack extends cdk.Stack {
  public readonly urlOutput: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, 'hello-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambdas', 'hello-world'))
    })

    const gw = new apigw.LambdaRestApi(this, 'gateway', {
      handler
    })

    this.urlOutput = new CfnOutput(this, 'gateway-url', {
      value: gw.url
    })
  }
}
