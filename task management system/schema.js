'use strict';

const Joi = require('joi');

module.exports = {

  createTask () {
    return Joi.object({
      title: Joi.string().required().description('Title of the new task'),
      description: Joi.string().required().description('Description of the task'),
      due_date: Joi.date().required().description('Due date for the task'),
      status: Joi.string().valid('pending', 'in_progress', 'completed').required().description('Status of the task'),
    }).label('CreateTaskPayload');
  },
};
