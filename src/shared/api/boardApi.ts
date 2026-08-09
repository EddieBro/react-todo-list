import type {BoardApi} from '@/shared/api/types.ts';
import type {Board, BoardDetails} from '@/core/models/models.ts';
import {getItem, setItem} from '@/shared/api/storage.ts';
import {boardsDataMock} from '@/shared/api/mocks/boardsDataMock.ts';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getBoardsDetails = async (): Promise<BoardDetails[]> => {
  await delay(300);
  const cached = await getItem<BoardDetails[]>('boards');
  if(cached === null) {
    await setItem('boards', boardsDataMock);
    return boardsDataMock;
  } else {
    return cached;
  }
}

export const getBoards = async (): Promise<Board[]> => {
  const boards = await getBoardsDetails();
  return boards.map(b => ({id: b.id, title: b.title, ownerId: b.ownerId, editorsIds: b.editorsIds}))
}

export const getBoard = async (id: Board['id']): Promise<BoardDetails | null> => {
  const boards = await getBoardsDetails();
  return boards.find(b => b.id === id) ?? null;
}

export const createBoard = async (board: Board): Promise<Board> => {
  const boards = await getBoardsDetails();
  const newBoard: BoardDetails = {...board, columns: [], tasks: {}}
  await setItem('boards', [...boards, newBoard])
  return board;
}

export const updateBoard = async (board: Board): Promise<Board> => {
  const boards = await getBoardsDetails();
  const index = boards.findIndex(b => b.id === board.id);
  let next: Board[];
  if (index === -1) {
    next = [...boards, board];
  } else {
    next = boards.map(b => b.id === board.id ? {...b, ...board} : b);
  }
  await setItem('boards', next);
  return board;
}

export const deleteBoard = async (id: Board['id']): Promise<void> => {
  const boards = await getBoardsDetails();
  const next = boards.filter(b => b.id !== id);
  await setItem('boards', next);
}

export const boardApi: BoardApi = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
