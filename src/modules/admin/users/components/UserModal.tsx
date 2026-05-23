import UserForm from "./UserForm";

import {
  UserFormValues,
} from "../validations/user.schema";

interface Props {
  open: boolean;

  onClose: () => void;

  onSubmit: (
    data: UserFormValues
  ) => void;
}

const UserModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          p-8
          w-full
          max-w-lg
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Nuevo Usuario
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <UserForm
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default UserModal;