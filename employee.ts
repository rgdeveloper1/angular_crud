import { Skill } from 'src/app/skill';

export interface Employee {
    id: number;
    fullName: string;
    phone: number;
    skill: Skill[];

}
