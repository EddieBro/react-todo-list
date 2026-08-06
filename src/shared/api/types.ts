import type {Board, BoardDetails, User} from '@/core/models/models.ts';

export type UsersApi = {
  getUsers(): Promise<User[]>;
  getUser(id: User['id']): Promise<User | null>;
  saveUser(user: User): Promise<User>;
  deleteUser(id: User['id']): Promise<void>;
}

export type BoardsApi = {
  getBoards(): Promise<Board[]>;
  getBoard(id: Board['id']): Promise<BoardDetails | null>;
  createBoard(board: Board): Promise<Board>;
  updateBoard(board: Board): Promise<Board>;
  removeBoard(id: Board['id']): Promise<void>
}
