module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('user_roles', [
      {
        role_name: 'User',
      },
      {
        role_name: 'Admin',
      },
      {
        role_name: 'Superadmin',
      },
    ]);
    await queryInterface.bulkInsert('user_types', [
      {
        type_name: 'Enrollee',
      },
      {
        type_name: 'Student',
      },
      {
        type_name: 'Parent',
      },
      {
        type_name: 'Teacher',
      },
      {
        type_name: 'Other',
      },
    ]);
    await queryInterface.bulkInsert('bot_settings', [
      {
        name: 'AboutNULP',
        value: 'Національний університет «Львівська політехніка» — найстаріший вищий технічний навчальний заклад України та Східної Європи, заснований 1816 року як Цісарсько-королівська реальна школа. Університет складається з 16 інститутів, 114 кафедр, відокремлених навчальних закладів, громадських організацій та загальних підрозділів.',
      },
      {
        name: 'AboutISM',
        value: 'Кафедра інформаційних систем та мереж (ІСМ) створена 1 червня 1995 року. Передумовою створення кафедри стало організаційно-структурне оформлення нової молодої наукової школи з проблематики систем баз і банків даних та знань.',
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
