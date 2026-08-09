import type {BoardDetails} from '@/core/models/models.ts';

export const boardsDataMock: BoardDetails[] = [{
  id: 'b-1',
  title: 'Демо-доска',
  ownerId: '1',
  editorsIds: ['2', '3'],
  columns: [
    {id: 'col-todo', title: 'To Do', taskIds: ['t-1', 't-2']},
    {id: 'col-in-progress', title: 'In Progress', taskIds: ['t-3']},
    {id: 'col-done', title: 'Done', taskIds: []},
  ],
  tasks: {
    't-1': {id: 't-1', title: 'Сделать модель', description: 'Детальное описание в котором Пятачок узнает чей дом с буквой К', authorId: '1', assigneeId: '2'},
    't-2': {id: 't-2', title: 'Собрать компоненты', description: 'Собираем компоненты, но делаем это детально', authorId: '1'},
    't-3': {id: 't-3', title: 'Накидать мок доски', description: 'Накидать пол дела, попробуй собрать, сколотить, прикрутить', authorId: '1', assigneeId: '3'},
  },
}];
