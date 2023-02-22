import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "data.json";
import { SortType, UserDataInterface } from "types/types";
import type { RootState } from "store/store";
interface FiltersInterface {
  search: string;
  sortType: "position" | "age" | "name";
}
interface UsersState {
  usersList: UserDataInterface[];
  activeUserId: string;
  activeView: string;
  filteredUsers?: UserDataInterface[];
  filters: FiltersInterface;
  activeMessage: MessageInterface;
}

interface MessageInterface {
  type: MessageType;
  content: string;
}

type MessageType = "error" | "info" | null;

const initialState: UsersState = {
  usersList: data,
  activeUserId: "0",
  activeView: "list",
  activeMessage: {
    type: null,
    content: "",
  },
  filters: {
    search: "",
    sortType: "name",
  },
};

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeActiveUser: (state: UsersState, action: PayloadAction<string>) => {
      state.activeUserId = action.payload;
    },
    changeActiveView: (state: UsersState, action: PayloadAction<string>) => {
      state.activeView = action.payload;
    },
    editUser: (state: UsersState, action: PayloadAction<UserDataInterface>) => {
      for (let index = 0; index < [...state.usersList].length; index++) {
        if (state.usersList[index]._id === state.activeUserId) {
          state.usersList[index].age = action.payload.age;
          state.usersList[index].email = action.payload.email;
          state.usersList[index].gender = action.payload.gender;
          state.usersList[index].level = action.payload.level;
          state.usersList[index].name = action.payload.name;
          state.usersList[index].phone = action.payload.phone;
          state.usersList[index].position = action.payload.position;
        }
      }
    },
    removeUser: (state: UsersState, action: PayloadAction<string>) => {
      state.usersList.splice(
        state.usersList.findIndex((a) => a._id === action.payload)
      );
    },
    addUser(state: UsersState, action: PayloadAction<UserDataInterface>) {
      state.usersList.push(action.payload);
    },
    searchTerm: (state: UsersState, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    sortType: (state: UsersState, action: PayloadAction<SortType>) => {
      state.filters.sortType = action.payload;
    },
    setMessage: (
      state: UsersState,
      action: PayloadAction<MessageInterface>
    ) => {
      state.activeMessage.type = action.payload.type; 
      state.activeMessage.content = action.payload.content;
    },
  },
});

export const selectActiveView: (state: RootState) => string = (state) =>
  state.users.activeView;

export const selectActiveMessage: (state: RootState) => MessageInterface = (
  state
) => ({
  ...state.users.activeMessage,
});

export const selectUsersList: (state: RootState) => UserDataInterface[] = (
  state
) => state.users.usersList;

export const selectUserActiveId: (state: RootState) => string = (state) =>
  state.users.activeUserId;

export const selectUserData: (state: RootState) => UserDataInterface[] = (
  state
) =>
  state.users.usersList.filter(
    (user: UserDataInterface) => user._id === state.users.activeUserId
  );

export const sortUsers = (state: RootState) => {
  let filteredUsers: UserDataInterface[] = state.users.usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(state.users.filters.search.toLowerCase())
  );

  const activeSortType: SortType = state.users.filters.sortType;

  const sortedUsers = filteredUsers.sort((a, b) => {
    const x = a[activeSortType];
    const y = b[activeSortType];
    return x < y ? -1 : x > y ? 1 : 0;
  });

  return {
    ...state,
    users: sortedUsers,
  };
};

export const {
  changeActiveUser,
  changeActiveView,
  editUser,
  removeUser,
  searchTerm,
  sortType,
  addUser,
  setMessage,
} = slice.actions;

export default slice.reducer;
