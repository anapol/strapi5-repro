'use strict';

/**
 * self-referencing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::self-referencing.self-referencing');
