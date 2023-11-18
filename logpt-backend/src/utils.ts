export function requireEnvVar(key: string): string {
  const value = process.env[key];
  if (value != undefined) {
    return value;
  } else {
    if (process.env.NODE_ENV === 'test') {
      return key;
    } else {
      const e = Error(`ENV value '${key}' is required.`);
      console.error(e);
      throw e;
    }
  }
}
