export abstract class MicroFrontsService {
  abstract safeRemoteModule(options: {
    remoteEntry: string;
    exposedModule: string;
    exportName: string;
  }): Promise<any>;
}
