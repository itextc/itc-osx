const path = require('path');
const { notarize } = require('@electron/notarize');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function notarizeWithRetry(options, { attempts = 5 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await notarize(options);
      return;
    } catch (error) {
      lastError = error;
      const message =
        (error && (error.stack || error.message)) ||
        (typeof error === 'string' ? error : JSON.stringify(error));

      const isLikelyTransient = /NSURLErrorDomain|offline|No network route|ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND|statusCode:\s*nil/i.test(
        message || ''
      );

      if (!isLikelyTransient || attempt === attempts) {
        throw error;
      }

      const delayMs = Math.min(5 * 60 * 1000, 15_000 * Math.pow(2, attempt - 1));
      console.warn(
        `[notarize] attempt ${attempt}/${attempts} failed (likely transient). Retrying in ${Math.round(
          delayMs / 1000
        )}s...\n${message}`
      );
      await sleep(delayMs);
    }
  }

  throw lastError;
}

module.exports = async function notarizing(context) {
  if (process.platform !== 'darwin') return;

  const appleApiKeyPath = process.env.APPLE_API_KEY_PATH || process.env.APPLE_API_KEY;
  const appleApiKeyId = process.env.APPLE_API_KEY_ID;
  const appleApiIssuer = process.env.APPLE_API_ISSUER_ID || process.env.APPLE_API_ISSUER;

  if (!appleApiKeyPath || !appleApiKeyId || !appleApiIssuer) {
    return;
  }

  const { appOutDir, packager } = context;
  const appName = packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);

  await notarizeWithRetry({
    appPath,
    appleApiKey: appleApiKeyPath,
    appleApiKeyId,
    appleApiIssuer,
  });
};
