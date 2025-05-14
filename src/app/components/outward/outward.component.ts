import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-outward',
  templateUrl: './outward.component.html',
  styleUrls: ['./outward.component.scss']
})
export class OutwardComponent implements OnInit {

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
    this.inventoryService.outward(this.form.value).subscribe({
      next: () => {
        alert('Stock deducted');
        this.form.reset();
      },
      error: err => alert(err.error.message || 'Error occurred')
    });
  }


}
