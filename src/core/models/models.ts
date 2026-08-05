export type User = {
  id: string;
  name: string;
  avatarId?: number;
}

export type Session = {
  userId: string;
}

export type Board = {
  id: string;
  title: string;
  ownerId: User['id'];
  editorsIds: User['id'][]
}

export type BoardDetails = Board & {
  columns: Column[];
}

export type Task = {
  id: string;
  title: string;
  description: string;
  authorId: User['id'];
  assigneeId?: User['id'];
}

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
}
