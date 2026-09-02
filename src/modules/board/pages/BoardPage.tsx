import {Column} from '../components/Column/Column.tsx';
import styles from './BoardPage.module.scss';
import {useParams} from 'react-router-dom';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';
import {DragDropContext, type DropResult} from '@hello-pangea/dnd';
import {useMoveTask} from '../hooks/useMoveTask.ts';
import {useState} from 'react';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';
import {useUsers} from '@/modules/users';

import {useBoardModule} from '../hooks/useBoardModule.ts';
import {useAddTask} from '../hooks/useAddTask.ts';
import {useBoard, useSetEditors} from '../hooks/useBoard.ts';
import {TaskAdd} from '../components/TaskAdd/TaskAdd.tsx';
import {useBoardAccess} from '../hooks/useBoardAccess.ts';
import {BoardAccess} from '../components/BoardAccess/BoardAccess.tsx';
import {EditorsEdit} from '../components/EditorsEdit/EditorsEdit.tsx';
import {TextFieldWrap} from '@/shared/ui/TextField/TextField.tsx';
import {Typography} from '@mui/material';


export const BoardPage = () => {
  const move = useMoveTask();
  const {boardId} = useParams();
  useBoardModule(boardId!);

  const {board, status, canEdit, isOwner} = useBoard();
  const {owner, editors} = useBoardAccess();
  const {users} = useUsers();
  const setBoardEditors = useSetEditors();
  const add = useAddTask();

  const [editorsOpen, setEditorsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const foundCount = board?.columns.reduce(
      (acc, c) => acc + c.taskIds.filter(id => board.tasks[id].title.toLowerCase().includes(query)).length,
      0,
  );


  const handleDragEnd = ({draggableId, source, destination}: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    move({
      taskId: draggableId,
      fromColumnId: source.droppableId,
      toColumnId: destination.droppableId,
      toIndex: destination.index
    })
  }

  if (status === 'idle' || status === 'loading') return <PageSpinner />;
  if (status === 'error' || !board) return <div>Доска не найдена</div>;

  if (!canEdit) return (
      <div className={styles.pageWrap}>
        <div>Нет доступа к этой доске</div>
      </div>
  );

  return (
      <div className={styles.pageWrap}>
        <h1>{board.title}</h1>
        <BoardAccess
          owner={owner}
          editors={editors}
          onEditEditors={isOwner ? () => setEditorsOpen(true) : undefined}
        />
        <Modal open={editorsOpen} onClose={() => setEditorsOpen(false)} title='Редакторы доски'>
          <EditorsEdit
            users={users}
            ownerId={board.ownerId}
            editorsIds={board.editorsIds}
            onSave={ids => {setBoardEditors(ids); setEditorsOpen(false)}}
          />
        </Modal>

        <div className={styles.addWrap}>
          <Button onClick={() => setOpen(true)}>Создать задачу</Button>
          <Modal open={open} onClose={() => setOpen(false)} title='Создать задачу'>
            <TaskAdd
                columns={board.columns}
                onAdd={(draft, columnId) => { add(draft, columnId); setOpen(false); }}
            />
          </Modal>
        </div>
        <div className={styles.searchWrap}>
          <TextFieldWrap
              size='small'
              label='Поиск по карточкам'
              variant='outlined'
              value={search}
              onChange={e => setSearch(e.target.value)}
          />
        </div>

        {isSearching && foundCount === 0 && (
            <Typography color='text.secondary'>Ничего не найдено</Typography>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.columnWrap}>
            {board.columns.map(column => (
                <Column
                  key={column.id}
                  column={column}
                  tasks={column.taskIds
                      .map(id => board.tasks[id])
                      .filter(task => !isSearching || task.title.toLowerCase().includes(query))}
                  dragDisabled={isSearching}
                />
            ))}
          </div>
        </DragDropContext>
      </div>

  );
}
