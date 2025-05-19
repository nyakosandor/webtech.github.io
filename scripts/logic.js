const allowedBrands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
    'Volkswagen', 'Audi', 'Hyundai', 'Kia', 'Subaru', 'Lexus', 'Mazda',
    'Tesla', 'Jeep', 'Porsche', 'Volvo', 'Jaguar', 'Land Rover', 'Mitsubishi',
    'Ferrari', 'Lamborghini'
  ];
  
  export function validateCar(car) {
    if (!allowedBrands.includes(car.brand)) {
      return 'Invalid brand. Please use a supported brand.';
    }
    if (!car.model) {
      return 'Model is required.';
    }
    if (!car.owner.includes(' ')) {
      return 'Owner name must contain at least a space.';
    }
    if (!car.electric && car.fuelUse <= 0) {
      return 'Fuel usage must be greater than 0 for non-electric cars.';
    }
    if (!car.dayOfCommission) {
      return 'Commission date is required.';
    }
    return null;
  }
  