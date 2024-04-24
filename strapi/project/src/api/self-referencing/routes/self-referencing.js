'use strict';

/**
 * self-referencing router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::self-referencing.self-referencing');
