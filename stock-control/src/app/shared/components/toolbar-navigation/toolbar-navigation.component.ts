import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: [],
})
export class ToolbarNavigationComponent {
  constructor(
    private cookie: CookieService,
    private router: Router,
    private dialogService: DialogService,
  ) {}

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

  handleSellProduct(): void {
    const sellProductAction = ProductEvent.SELL_PRODUCT_EVENT;

    this.dialogService.open(ProductFormComponent, {
      header: sellProductAction,
      width: '70%',
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: sellProductAction },
      },
    });
  }
}
