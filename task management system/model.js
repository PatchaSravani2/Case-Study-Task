module.exports = (sequelize, DataTypes) => {
    const TaskManagement = sequelize.define(
        'task_management',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            due_date: {
                type: DataTypes.DATE,
            },
            status: {
                type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
                defaultValue: 'pending',
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    return TaskManagement;
};
