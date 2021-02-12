module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_types', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    });
    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    });
    await queryInterface.createTable('bot_settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      value: {
        type: Sequelize.STRING(2000),
      },
    },
    {
      timestamps: false,
    });
    await queryInterface.createTable('faqs', {
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
      answer: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      stats: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
    });
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tg_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      tg_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: { tableName: 'user_types' },
          key: 'id',
        },
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: { tableName: 'user_roles' },
          key: 'id',
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
