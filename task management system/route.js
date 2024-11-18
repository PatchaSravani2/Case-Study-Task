const controller = require('./controller');
const schema = require('./schema')

module.exports = [
    {
        method: 'GET',
        path: '/tasks',
        handler: controller.getTasks
    },
    {
        method: 'GET',
        path: '/tasks/{id}',
        handler: controller.getTaskById
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: controller.createTask,
        options: {
            validate: {
              payload: schema.createTask(), 
              options: {
                allowUnknown: true,
                abortEarly: false,
              }
            }
          }
    },
    {
        method: 'PUT',
        path: '/tasks/{id}',
        handler: controller.updateTask
    },
    {
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: controller.deleteTask
    },
    {
        method: 'PATCH',
        path: '/tasks/{id}',
        handler: controller.markTaskAsComplete
    }
];
