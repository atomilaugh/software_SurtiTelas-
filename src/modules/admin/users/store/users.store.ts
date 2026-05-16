import { create } from "zustand";

import { User } from "../types/user.types";

interface UsersStore {
  users: User[];

  setUsers: (
    users: User[]
  ) => void;

  addUser: (
    user: User
  ) => void;
}

export const useUsersStore =
  create<UsersStore>((set) => ({
    users: [],

    setUsers: (users) =>
      set({ users }),

    addUser: (user) =>
      set((state) => ({
        users: [
          ...state.users,
          user,
        ],
      })),
  }));