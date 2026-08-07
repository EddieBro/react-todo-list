import type {Board, BoardDetails, User} from '@/core/models/models.ts';

export type UserApi = {
  getUsers(): Promise<User[]>;
  getUser(id: User['id']): Promise<User | null>;
  saveUser(user: User): Promise<User>;
  deleteUser(id: User['id']): Promise<void>;
}

export type BoardApi = {
  getBoards(): Promise<Board[]>;
  getBoard(id: Board['id']): Promise<BoardDetails | null>;
  createBoard(board: Board): Promise<Board>;
  updateBoard(board: Board): Promise<Board>;
  deleteBoard(id: Board['id']): Promise<void>
}
