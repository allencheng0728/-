export type VehicleStatus = 'Active' | 'Maintenance' | 'Inactive';
export type RentalStatus = 'Rented' | 'Available' | 'Pending';
export type DriverStatus = 'Available' | 'Rented' | 'Maintenance';

export interface Vehicle {
  id: string;
  plate: string;
  owner: string;
  company: string;
  remark: string;
  model: string;
  make: string;
  taxiType: 'Blue' | 'Green' | 'Red';
  riskScore: number;
  status: VehicleStatus;
}

export interface RentSetting {
  listingStatus: 'Listed' | 'Unlisted';
  rentalStatus: 'Rented' | 'Available';
  plate: string;
  owner: string;
  company: string;
  model: string;
  taxiType: 'Blue' | 'Green' | 'Red';
  make: string;
  morningRent: number;
  eveningRent: number;
  specialRent: number;
}

export interface Driver {
  status: DriverStatus;
  nameCn: string;
  nameEn: string;
  nickname: string;
  gender: 'Male' | 'Female';
  driverId: string;
  shift: string;
  rentedVehicle: string;
  phone: string;
  riskScore: number;
  remark: string;
}

export interface ScheduleEntry {
  vehiclePlate: string;
  date: string;
  shift: 'Morning' | 'Evening' | 'Special';
  driverName?: string;
}

export interface RenewalRule {
  id: string;
  name: string;
  shift: 'Morning' | 'Evening' | 'Special';
  vehicle: string;
  rent: number;
  duration: string;
  effectiveDate: string;
  workDays: string[];
  status: 'Active' | 'Terminated';
}
