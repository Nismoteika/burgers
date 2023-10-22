import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Product } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'burgers';

  currencies = [
    { //base is dollar
        currency: '$',
        coefficient: 1
    },
    {
        currency: '₽',
        coefficient: 80
    },
    {
        currency: 'BYN',
        coefficient: 3
    },
    {
        currency: '€',
        coefficient: 0.9
    },
    {
        currency: '¥',
        coefficient: 6.9
    }
  ]

  currency = this.currencies[0].currency;

  form: FormGroup = this.formBuilder.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required]
  })

  productsData: Product[] = [];

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.currency = localStorage.getItem("currency") || this.currencies[0].currency;
  }

  ngOnInit() {
    this.appService.getData()
      .subscribe((data: Product[]) => this.productsData = data)
  }

  scrollTo(target: HTMLElement) {
    target.scrollIntoView({behavior: 'smooth'})
  }

  confirmOrder() {
    if(this.form.valid) {

      this.appService.sendOrder(this.form.value)
        .subscribe({
          next: (response: any) => {
            alert(response.message);
            this.form.reset();
          },
          error: (response) => {
            alert(response.error.message)
          }
        })
    }
  }

  changeCurrency() {
    const currentCurrency = this.currency
    const currencyIndex = this.currencies.findIndex(({currency}) => currency === currentCurrency)
    const nextCurrencyIndex = currencyIndex + 1 > this.currencies.length - 1
                                ? 0
                                : currencyIndex + 1
    const nextCurrency = this.currencies[nextCurrencyIndex]
    
    this.currency = nextCurrency.currency;
    localStorage.setItem("currency", nextCurrency.currency);
  }

  getProductPrice(product: Product) {
    const currencyIndex = this.currencies.findIndex(({currency}) => currency === this.currency)
    const currencyObject = this.currencies[currencyIndex];
    const productPrice = (currencyObject.coefficient * product.basePrice).toFixed(1);
    return productPrice + ' ' + currencyObject.currency;
  }

  addProductToOrder(product: Product) {
    const makeOrder = document.getElementById('make-order');
    makeOrder!.scrollIntoView({behavior: 'smooth'});

    this.form.patchValue({order: `${product.title} (${this.getProductPrice(product)})`});
  }
}
