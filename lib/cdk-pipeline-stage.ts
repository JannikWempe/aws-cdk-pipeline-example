import {CfnOutput, Construct, StackProps, Stage} from "@aws-cdk/core";
import {CdkPipelineStack} from "./cdk-pipeline-stack";

/**
 * Deployable unit of web service app
 */
export class CdkPipelineStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const service = new CdkPipelineStack(this, 'WebService');

    this.urlOutput = service.urlOutput;
  }

}
