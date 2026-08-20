import styles from './BoardsTable.module.scss';
import type {Board, User} from '@/core/models/models.ts';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {generatePath, Link} from 'react-router-dom';
import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

type BoardsTableProps = {
  boards: Board[];
  users: User[];
  onDelete?: (id: Board['id']) => void;
  deleting?: boolean;
};

export const BoardsTable = ({boards, users, onDelete, deleting}: BoardsTableProps) => {
  const userMap: Record<User['id'], User | undefined> =
      Object.fromEntries(users.map(u => [u.id, u]));
  return (
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Владелец</TableCell>
              <TableCell>Редакторы</TableCell>
              {onDelete && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {boards.map(board => {
              const owner = userMap[board.ownerId];
              const editors = board.editorsIds
                  .map(id => userMap[id])
                  .filter((u): u is User => Boolean(u));

              return (
                  <TableRow key={board.id}>
                    <TableCell>
                      <Link to={generatePath('/boards/:boardId', {boardId: board.id})}>
                        {board.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {owner
                          ? <UserCard user={owner} />
                          : <Typography color='text.secondary'>Владелец удалён</Typography>}
                    </TableCell>

                    <TableCell>
                      <Stack direction='row' spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
                        {editors.map(u => <UserCard key={u.id} user={u} />)}
                      </Stack>
                    </TableCell>

                    {onDelete && (
                        <TableCell>
                          <IconButton
                              size='small'
                              color='warning'
                              disabled={deleting}
                              aria-label={`Удалить доску ${board.title}`}
                              onClick={() => onDelete(board.id)}
                          >
                            <DeleteOutlined fontSize='small' />
                          </IconButton>
                        </TableCell>
                    )}
                  </TableRow>
              )}
            )}
          </TableBody>
        </Table>
      </TableContainer>
  )
}
