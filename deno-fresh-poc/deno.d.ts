declare namespace Deno {
  interface Env {
    get(key: string): string | undefined;
  }

  const env: Env;

  function readFile(path: URL): Promise<Uint8Array>;
  function serve(
    options: { port: number },
    handler: (request: Request) => Promise<Response> | Response,
  ): void;
  function exit(code?: number): never;
}
