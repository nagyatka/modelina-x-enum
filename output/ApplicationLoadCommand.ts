import Load from './Load';

interface ApplicationLoadCommand {
  command: Load;
  initialActions: Array<unknown>;
  actions: Array<unknown>;
}
export default ApplicationLoadCommand;
