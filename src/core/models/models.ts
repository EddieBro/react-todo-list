export type User = {
  id: number;
  name: string;
  avatarId?: number;
}

export type Session = {
  userId: number;
}

export type Board = {
  id: number;
  title: string;
  ownerId: User['id'];
  editorsIds: User['id'][]
}

export type BoardDetails = Board & {
  columns: Column[];
}

export type Task = {
  id: number;
  title: string;
  description: string;
  authorId: User['id'];
  assigneeId?: User['id'];
}

export type Column = {
  id: number;
  title: string;
  tasks: Task[];
}
