export function isMockMode() {
  return process.env.USE_MOCK_DATA === "true";
}
