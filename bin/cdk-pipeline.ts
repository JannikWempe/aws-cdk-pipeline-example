#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {CdkPipelinePipelineStack} from "../lib/cdk-pipeline-pipeline-stack";

const app = new cdk.App();
new CdkPipelinePipelineStack(app, 'CdkPipelinePipelineStack', {
  env: { account: '658347763935', region: 'eu-central-1' }
})

app.synth();
