export interface UserDataInterface {
  _id?: string;
  name: string;
  age: number;
  position: string;
  level: string;
  gender: string;
  email: string;
  phone: string;
}
export interface UserListInterface {
  _id: string;
  name: string;
  position: string;
}
export interface MessageInterface { 
  type: MessageType,
  content: string
}

export type MessageType = "error" | "info" | null;

export type ChildrenType = React.ReactNode | React.ReactNode[];

export type InputVariants = "primary" | "secondary" | "error";

export type InputTypes = "text" | "number" | "email" | "tel";

export type ViewType = "list" | "detail";

export type SortType = "position" | "age" | "name";

export type LevelType = "junior" | "mid" | "senior";

export type GenderType = "female" | "male";

export type PositionType = "backend_developer" | "frontend_developer" | "project_manager";
