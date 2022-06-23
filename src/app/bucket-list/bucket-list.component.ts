import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Product, ProductService } from '../product.service';
import { UserService } from '../user-service.';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
})
export class BucketListComponent implements OnInit {
  user?: any;
  submitted = false;
  products: Product[] = [];
  sharedWithUser = <any>[];
  productName: string = '';
  id: number = 0;
  constructor(
    private userService: UserService,
    public auth: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.userService.getUser(this.auth.user).subscribe((user) => {
        this.user = user;
      });

      this.productService.shareWithUser(this.auth.user.id).subscribe((swm) => {
        this.sharedWithUser = swm;
      });
      this.productService
        .getProductList()
        .subscribe((p) => (this.products = p));
    }
  }

  handleSubmit() {
    this.submitted = true;
    if (!this.productName) {
      return;
    }
    this.productService.create({ name: this.productName }).subscribe((p) => {
      this.id = p.id as number;
      this.productService
        .createSharedProduct({
          product: 'api/products/' + p.id,
          user: 'api/users/' + this.user.id,
        })
        .subscribe((sP) => {
          this.user.bucketList.push({ ...sP, product: p });
        });
    });
  }

  handleDelete(id: number) {
    const copy = [...this.user.bucketList];
    this.productService.deleteSharedProduct(id).subscribe({
      next() {},
      error(err) {},
    });
  }
}
