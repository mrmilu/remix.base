import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class CreateContactFormInputModel {
  email: string;
  body: string;
  reservationId?: string;
  mode: string;

  constructor(params: ConstructorType<CreateContactFormInputModel>) {
    this.email = params.email;
    this.body = params.body;
    this.reservationId = params.reservationId;
    this.mode = params.mode;
  }
}
