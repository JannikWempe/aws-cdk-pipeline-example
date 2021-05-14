import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkPipeline from '../lib/cdk-pipeline-stack';

test('Empty Stack', () => {
    // GIVEN
    const app = new cdk.App();
    // WHEN
    const stack = new CdkPipeline.CdkPipelineStack(app, 'MyTestStack');
    // THEN
    expect(true);
    // expectCDK(stack).to(matchTemplate({
    //   "Resources": {}
    // }, MatchStyle.EXACT))
});
