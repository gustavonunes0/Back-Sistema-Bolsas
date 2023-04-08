export type UserDTO = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  course: string;
  historic?: string;
  userProcesses?: string;
  createdProcesses?: string;
};
