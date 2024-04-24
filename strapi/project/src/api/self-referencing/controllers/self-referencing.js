'use strict';

/**
 * self-referencing controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::self-referencing.self-referencing');
