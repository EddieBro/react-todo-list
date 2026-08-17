import styles from './BoardsTable.module.scss';
import type {Board, User} from '@/core/models/models.ts';
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {generatePath, Link} from 'react-router-dom';
import {UserCard} from '@/shared/components/UserCard/UserCard.tsx';

export const BoardsTable = ({boards, users}: {boards: Board[], users: User[]}) => {
  const userMap = Object.fromEntries(users.map(u => [u.id, u]))
  return (
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Владелец</TableCell>
              <TableCell>Редакторы</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards.map(board => <TableRow key={board.id}>
              <TableCell>
                <Link to={generatePath('/boards/:boardId', {boardId: board.id})}>{board.title}</Link>
              </TableCell>
              <TableCell>
                <UserCard user={userMap[board.ownerId]} />
              </TableCell>
              <TableCell>
                <Stack direction='row' spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
                  {board.editorsIds.map(id => userMap[id]).filter(Boolean).map(u =>
                      <UserCard key={u.id} user={u} />
                  )}
                </Stack>
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
  )
}
