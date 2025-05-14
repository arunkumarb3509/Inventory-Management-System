import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

form: FormGroup;
submittedData: { name: string; minQty: number }[] = [];

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    name: ['', Validators.required],
    minQty: ['', [Validators.required, Validators.min(1)]]
  });
}

ngOnInit(): void {
  }
  
onSubmit() {
  if (this.form.valid) {
    this.submittedData.push(this.form.value);
    this.form.reset();
  }
}

}
