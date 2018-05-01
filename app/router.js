'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/google', controller.google.index);

  router.get('/google/label-detection', controller.google.labelDetection);

  router.get('/upload/token', controller.upload.token);
};
