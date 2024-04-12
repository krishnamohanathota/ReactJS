class LocalStorage {
  static store(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static get(key: string): string {
    const value = localStorage.getItem(key);
    return value ? value : "";
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
