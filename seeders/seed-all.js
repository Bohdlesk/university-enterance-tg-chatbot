module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('user_roles', [
      {
        name: 'regular',
      },
      {
        name: 'admin',
      },
      {
        name: 'super-admin',
      },
    ]);
    await queryInterface.bulkInsert('user_types', [
      {
        name: 'Applicant',
      },
      {
        name: 'Student',
      },
      {
        name: 'Parent',
      },
      {
        name: 'Teacher',
      },
      {
        name: 'Other',
      },
    ]);
    await await queryInterface.bulkInsert('users', [{
      id: 1111,
      username: 'vpupkin',
      name: 'Vasiliy Pupkin',
      type_name: 'Teacher',
      role_name: 'super-admin',
      city: 'Lviv',
      state: JSON.stringify({ last: 'AdminsPanel' }),
    }]);
    await queryInterface.bulkInsert('bot_settings', [
      {
        name: 'AboutNULP',
        value: '',
      },
      {
        name: 'AboutISM',
        value: '',
      },
      {
        name: 'HowToUseBot',
        value: '',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface
      .bulkDelete('users', null, {});
    await queryInterface
      .bulkDelete('user_roles', null, {});
    await queryInterface
      .bulkDelete('user_types', null, {});
    await queryInterface
      .bulkDelete('unanswered_questions', null, {});
    await queryInterface
      .bulkDelete('faqs', null, {});
    await queryInterface
      .bulkDelete('bot_settings', null, {});
  },
};
