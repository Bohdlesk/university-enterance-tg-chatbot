module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_types', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    });
    await queryInterface.createTable('user_roles', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    });
    await queryInterface.createTable('bot_settings', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING(2000),
      },
    },
    {
      timestamps: false,
    });
    await queryInterface.createTable('faqs', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      stats: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
    await queryInterface.createTable('unanswered_questions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
    });
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Applicant',
        references: {
          model: { tableName: 'user_types' },
          key: 'name',
        },
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'regular',
        references: {
          model: { tableName: 'user_roles' },
          key: 'name',
        },
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('unanswered_questions');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('user_roles');
    await queryInterface.dropTable('user_types');
    await queryInterface.dropTable('faqs');
    await queryInterface.dropTable('bot_settings');
  },
};
