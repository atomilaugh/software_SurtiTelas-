import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  userSchema,
  UserFormValues,
} from "../validations/user.schema";

interface Props {
  onSubmit: (
    data: UserFormValues
  ) => void;
}

const UserForm = ({
  onSubmit,
}: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver:
      zodResolver(userSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label>
          Nombre
        </label>

        <input
          {...register("fullName")}
          className="
            w-full
            h-12
            rounded-xl
            border
            px-4
          "
        />

        {errors.fullName && (
          <p className="text-red-500 text-sm">
            {
              errors.fullName
                .message
            }
          </p>
        )}
      </div>

      <div>
        <label>
          Correo
        </label>

        <input
          {...register("email")}
          className="
            w-full
            h-12
            rounded-xl
            border
            px-4
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm">
            {
              errors.email
                .message
            }
          </p>
        )}
      </div>

      <div>
        <label>Rol</label>

        <select
          {...register("role")}
          className="
            w-full
            h-12
            rounded-xl
            border
            px-4
          "
        >
          <option value="">
            Seleccionar
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="asesor">
            Asesor
          </option>

          <option value="domiciliario">
            Domiciliario
          </option>

          <option value="cliente">
            Cliente
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="
          w-full
          h-12
          rounded-xl
          bg-slate-900
          text-white
        "
      >
        Guardar Usuario
      </button>
    </form>
  );
};

export default UserForm;