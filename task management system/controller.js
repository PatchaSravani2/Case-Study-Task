const { TaskManagement } = require('./sequelize');

module.exports = {
    getTasks: async (req, h) => {
        try {
            const tasks = await TaskManagement.findAll();
            if (tasks.length === 0) {
                return h.response({ message: 'No tasks found' }).code(404);
            }
            return h.response({ message: 'Tasks retrieved successfully', data: tasks }).code(200);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return h.response({ message: 'Error fetching tasks', error: error.message }).code(500);
        }
    },

    getTaskById: async (req, h) => {
        try {
            const task = await TaskManagement.findOne({where: {id: req.params.id}});
            if (!task) {
                return h.response({ message: 'Task not found' }).code(404);
            }
            return h.response({ message: 'Task retrieved successfully', data: task }).code(200);
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            return h.response({ message: 'Error fetching task by ID', error: error.message }).code(500);
        }
    },

    createTask: async (req, h) => {
        try {
            const { title, description, due_date, status } = req.payload;

            if (!title || !description || !due_date || !status) {
                return h.response({ message: 'Missing required fields: title, description, due_date, status' }).code(400);
            }

            const task = await TaskManagement.create({ title, description, due_date, status });
            return h.response({ id: task.id, message: 'Task created successfully' }).code(201);
        } catch (error) {
            console.error('Error creating task:', error);
            return h.response({ message: 'Error creating task', error: error.message }).code(500);
        }
    },

    updateTask: async (req, h) => {
        try {
            const { title, description, due_date, status } = req.payload;

            if (!title || !description || !due_date || !status) {
                return h.response({ message: 'Missing required fields: title, description, due_date, status' }).code(400);
            }

            const [updated] = await TaskManagement.update(
                { title, description, due_date, status },
                { where: { id: req.params.id } }
            );

            if (!updated) {
                return h.response({ message: 'Task not found' }).code(404);
            }

            return h.response({ message: 'Task updated successfully' }).code(200);
        } catch (error) {
            console.error('Error updating task:', error);
            return h.response({ message: 'Error updating task', error: error.message }).code(500);
        }
    },

    deleteTask: async (req, h) => {
        try {
            const deleted = await TaskManagement.destroy({ where: { id: req.params.id } });

            if (!deleted) {
                return h.response({ message: 'Task not found' }).code(404);
            }

            return h.response({ message: 'Task deleted successfully' }).code(200);
        } catch (error) {
            console.error('Error deleting task:', error);
            return h.response({ message: 'Error deleting task', error: error.message }).code(500);
        }
    },

    markTaskAsComplete: async (req, h) => {
        try {
            const [updated] = await TaskManagement.update(
                { status: 'completed' },
                { where: { id: req.params.id } }
            );

            if (!updated) {
                return h.response({ message: 'Task not found' }).code(404);
            }

            return h.response({ message: 'Task marked as completed' }).code(200);
        } catch (error) {
            console.error('Error marking task as completed:', error);
            return h.response({ message: 'Error marking task as completed', error: error.message }).code(500);
        }
    }
};
