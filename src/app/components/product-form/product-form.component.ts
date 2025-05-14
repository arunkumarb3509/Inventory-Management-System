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

form!: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      minQty: [0, [Validators.required, Validators.min(1)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? Number(idParam) : null;

    if (this.productId) {
      this.productService.getById(this.productId).subscribe(product => {
        this.form.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    const req = this.productId
      ? this.productService.update(this.productId, data)
      : this.productService.create(data);

    req.subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => console.error('Error saving product', err)
    });
  }

}
