import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { usersService } from "../services/users.service";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};