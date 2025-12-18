const path = require('path');
const { notarize } = require('@electron/notarize');

module.exports = async function notarizing(context) {
  if (process.platform !== 'darwin') return;

  const appleApiKeyPath = process.env.APPLE_API_KEY_PATH;
  const appleApiKeyId = process.env.APPLE_API_KEY_ID;
  const appleApiIssuer = process.env.APPLE_API_ISSUER_ID;

  if (!appleApiKeyPath || !appleApiKeyId || !appleApiIssuer) {
    return;
  }

  const { appOutDir, packager } = context;
  const appName = packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);

  await notarize({
    appPath,
    appleApiKey: appleApiKeyPath,
    appleApiKeyId,
    appleApiIssuer,
  });
};
