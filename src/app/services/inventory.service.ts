import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryTransaction } from '../models/inventoryTransaction';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

constructor(private http: HttpClient) {}

  inward(data: InventoryTransaction): Observable<any> {
    return this.http.post('http://localhost:3000/api/inventory/inward', data);
  }

  outward(data: InventoryTransaction): Observable<any> {
    return this.http.post('http://localhost:3000/api/inventory/outward', data);
  }}
