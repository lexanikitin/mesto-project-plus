import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import ErrorWithCode from "../utilities/ErrorWithCode";

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<IUser> {
 findUserByCredentials: (email: string, password: string) =>
   Promise<mongoose.Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.static(
  "findUserByCredentials",
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select("+password")
      .then((user: { password: string }) => {
        if (!user) {
          return Promise.reject(ErrorWithCode.unauthorized());
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(ErrorWithCode.unauthorized());
            }
            return user;
          });
      });
  },
);

export default mongoose.model<IUser, UserModel>("user", userSchema);
