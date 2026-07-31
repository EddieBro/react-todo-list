export type User = {
  id: number;
  name: string;
  avatarId: number;
}

export type Session = {
  userId: number;
  name: string;
  avatarId: number;
}

export type Board = {
  title: string;
  ownerId: number;
  editorsIds: number[];
  cols: []
}

export type Task = {
  title: string;
  description: string;
  authorId: number;
  assigneeId: number;
}

