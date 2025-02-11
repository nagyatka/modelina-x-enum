import { TypeScriptFileGenerator } from '../../src';
import { load } from 'js-yaml';
import * as fs from 'fs';
import { parse } from '@asyncapi/parser';

const generator = new TypeScriptFileGenerator({
  enumType: 'enum', 
  modelType: 'interface',
});
const input = load(fs.readFileSync(`${__dirname }/onrobot-application-control.yaml`, 'utf8'));
// const input = load(fs.readFileSync('onrobot-application-control.yaml', 'utf8'));

export async function generate() : Promise<void> {
  const parsedDoc = await parse(JSON.stringify(input));
  const outputFolder = './output';
  const modelGenerationOptions = {};
  const models = await generator.generateToFiles(parsedDoc as any, outputFolder, modelGenerationOptions);
  for (const model of models) {
    console.log(model.result);
  }
}
generate();
