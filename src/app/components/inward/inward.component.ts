import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inward',
  templateUrl: './inward.component.html',
  styleUrls: ['./inward.component.scss']
})
export class InwardComponent implements OnInit {

 form!: FormGroup;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {
    this.form = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, Validators.required]
    });
  }
   
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.inventoryService.inward(this.form.value).subscribe(() => {
      alert('Stock added successfully');
      this.form.reset();
    });
  }
  

}
