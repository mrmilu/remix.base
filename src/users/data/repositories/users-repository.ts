import { TYPES } from "@/src/shared/ioc/__generated__/types";
import type { IocProvider } from "@/src/shared/ioc/interfaces";
import { UserDataModel } from "@/src/users/data/models/user-data-model";
import type { IUsersRepository } from "@/src/users/domain/interfaces/users-repository";
import type { User } from "@/src/users/domain/models/user";
import { plainToClass } from "class-transformer";
import { inject, injectable } from "inversify";
import type { JSONPlaceholderService } from "@/src/shared/data/services/json-placeholder-service";

@injectable()
export class UsersRepository implements IUsersRepository {
  @inject(TYPES.JSONPlaceholderService) private jsonPlaceholderServiceProvider!: IocProvider<JSONPlaceholderService>;

  async users(): Promise<Array<User>> {
    const jsonPlaceholderService = await this.jsonPlaceholderServiceProvider();

    const response = await jsonPlaceholderService.get<Array<UserDataModel>>("/users");

    return (
      response?.map((user: UserDataModel) => {
        const dataModel = plainToClass(UserDataModel, user, { excludeExtraneousValues: true });

        return dataModel.toDomain();
      }) ?? []
    );
  }
}
