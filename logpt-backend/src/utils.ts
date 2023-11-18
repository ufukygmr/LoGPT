export function requireEnvVar(key: string): string {
  const value = process.env[key];
  if (value != undefined) {
    return value;
  } else {
    const e = Error(`ENV value '${key}' is required.`);
    console.error(e);
    throw e;
  }
}
