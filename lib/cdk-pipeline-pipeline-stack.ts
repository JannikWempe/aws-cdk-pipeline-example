import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import {CdkPipelineStage} from "./cdk-pipeline-stage";

export class CdkPipelinePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, 'pipeline', {
      pipelineName: 'MyPipeline',
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('github-pipeline-token'),
        owner: 'JannikWempe',
        repo: 'aws-cdk-pipeline-example',
        branch: 'master'
      }),
      // How it will be built and synthesized
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: 'npm run build'
      })
    })

    pipeline.addApplicationStage(new CdkPipelineStage(this, 'Staging', {
      env: { account: '658347763935', region: 'eu-central-1' }
    }))
  }

}
