import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  cols = {
    drivers: [
      { key: 'id', text: '#', type: "plain" },
      { key: 'name', text: 'Name', type: "text" },
      { key: 'email', text: 'Email', type: "email" },
      { key: 'phone', text: 'Phone', type: "number" },
      { key: 'city', text: 'City', type: "select", 
      options: [{value: "e", text: "Eger"},
                {value: "k", text: "Komárom"},
                {value: "t", text: "Tatabánya"},
                {value: "bp", text: "Budapest"},
              ]},
      { key: 'address', text: 'Address', type: "text" }
    ],
    vehicles: [
      { key: "id", text: "#", type: "plain" },
      { key: "lp", text: "LP.", type: "text" },
      { key: "year", text: "Year.", type: "text" },
      { key: "manufacturer", text: "Man.", type: "text" },
      { key: "cionsumtion", text: "Cons.", type: "text" },
      { key: "engine", text: "Eng.", type: "text" }
    ],
    fuelings: [
      { key: "id", text: "#", type: "plain" },
      { key: "vehicleId", text: "Vehicle", type: "text" },
      { key: "driverId", text: "Driver", type: "text" },
      { key: "amount", text: "Amount", type: "text" },
      { key: "date", text: "Date", type: "date" }
    ],
  };

  constructor() { }
}
