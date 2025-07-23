import { Injectable } from "@nestjs/common";

@Injectable()
export class service {
  private users: {
    mobileNumber: string;
    name: string;
    presentAddress: string;
    pickupSchedule: string;
    gender: string;
    age: number;
  }[] = [
    {
      mobileNumber: '01711112222',
      name: 'John',
      presentAddress: '123 Main St, Dhaka',
      pickupSchedule: '2025-07-25 10:00 AM',
      gender: 'male',
      age: 30,
    },
    {
      mobileNumber: '01755081727',
      name: 'Alamin',
      presentAddress: '456 Park Ave, Chittagong',
      pickupSchedule: '2025-07-26 03:00 PM',
      gender: 'male',
      age: 40,
    },
    {
      mobileNumber: '01955556666',
      name: 'Sahed',
      presentAddress: '789 Lake Rd, Sylhet',
      pickupSchedule: '2025-07-27 09:30 AM',
      gender: 'male',
      age: 50,
    },
    {
      mobileNumber: '01788889999',
      name: 'tania',
      presentAddress: '321 College St, Rajshahi',
      pickupSchedule: '2025-07-28 01:45 PM',
      gender: 'female',
      age: 60,
    },
  ];

  getAllUsers() {
    return this.users;
  }



getUserByMobileNumber(age: number) {
    return this.users.find(x => x.age === age);
}


  createUser(newUser: {
    mobileNumber: string;
    name: string;
    presentAddress: string;
    pickupSchedule: string;
    gender: string;
    age: number;
  }) {

    this.users.push();
    
  }
}
