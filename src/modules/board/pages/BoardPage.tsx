import {Column} from '../components/Column/Column.tsx';
import styles from './BoardPage.module.scss';
import {useParams} from 'react-router-dom';
import {PageSpinner} from '@/shared/ui/PageSpinner/PageSpinner.tsx';
import {DragDropContext, type DropResult} from '@hello-pangea/dnd';
import {useMoveTask} from '../hooks/useMoveTask.ts';
import {useState} from 'react';
import {Button} from '@/shared/ui/Button/Button.tsx';
import {Modal} from '@/shared/ui/Modal/Modal.tsx';

import {useBoardModule} from '../hooks/useBoardModule.ts';
import {useAddTask} from '../hooks/useAddTask.ts';
import {useBoard} from '../hooks/useBoard.ts';
import {TaskAdd} from '../components/TaskAdd/TaskAdd.tsx';
import {useBoardAccess} from '../hooks/useBoardAccess.ts';
import {BoardAccess} from '../components/BoardAccess/BoardAccess.tsx';




export const BoardPage = () => {
  const move = useMoveTask();
  const {boardId} = useParams();
  useBoardModule(boardId!);

  const {board, status, canEdit} = useBoard();

  const {owner, editors} = useBoardAccess();



  const [open, setOpen] = useState(false);
  const add = useAddTask();

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
        <BoardAccess owner={owner} editors={editors} />
        <div className={styles.addWrap}>
          <Button onClick={() => setOpen(true)}>Создать задачу</Button>
        </div>


        <Modal open={open} onClose={() => setOpen(false)} title='Создать задачу'>
          <TaskAdd
              columns={board.columns}
              onAdd={(draft, columnId) => { add(draft, columnId); setOpen(false); }}
          />
        </Modal>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.columnWrap}>
            {board.columns.map(column => (
                <Column key={column.id} column={column} tasks={column.taskIds.map(id => board.tasks[id])} />
            ))}
          </div>
        </DragDropContext>
      </div>

  );
}
