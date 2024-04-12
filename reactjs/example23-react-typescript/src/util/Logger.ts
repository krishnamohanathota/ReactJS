export class Logger {
  private static isDev = process.env.NODE_ENV === "development"; // Assuming environment variable

  static info(message: string) {
    if (this.isDev) {
      console.info(`[INFO] ${message}`);
    }
  }

  static debug(message: string) {
    if (this.isDev) {
      console.debug(`[DEBUG] ${message}`);
    }
  }

  static error(message: string, error?: Error) {
    console.error(`[ERROR] ${message}`, error);
  }
}
