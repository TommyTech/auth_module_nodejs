function shouldTryJsExtension(specifier) {
  if (!specifier.startsWith('.') && !specifier.startsWith('/')) {
    return false;
  }

  const path = specifier.split(/[?#]/)[0];
  return !/\.[a-zA-Z0-9]+$/.test(path);
}

export async function resolve(specifier, context, nextResolve) {
  if (shouldTryJsExtension(specifier)) {
    try {
      return await nextResolve(`${specifier}.js`, context);
    } catch (error) {
      if (error.code !== 'ERR_MODULE_NOT_FOUND') {
        throw error;
      }
    }
  }

  return nextResolve(specifier, context);
}
