import Glue from 'glue';

import manifest from './config/manifest';
import logger from './config/logger';

exports.init = async (start = false) => {
  const server = await Glue.compose(
    manifest,
    {
      relativeTo: __dirname,
    },
  );

  if (start) {
    await server.start();
  } else {
    await server.initialize();
  }

  return server;
};

if (!module.parent) {
  exports.init(true);

  process.on('unhandledRejection', err => {
    logger.error(err.stack);
    process.exit(1);
  });
}
