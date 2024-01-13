
import { ExamInfo } from "./exam-info";
import { RoleName } from "./role-name";
export class User {
  id!: number |null;
  name!: string;
  userName!: string;
  passWord!: string;
  cccd!: string;
  phone!: string;
  role!: RoleName | null;
  examInfo!: ExamInfo | null;
}
