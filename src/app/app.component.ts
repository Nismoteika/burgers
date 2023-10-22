import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Product {
  name: string,
  text: string,
  image: string,
  basePrice: number,
  weight: number
}

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

  constructor(private formBuilder: FormBuilder) {
    this.currency = localStorage.getItem("currency") || this.currencies[0].currency;
  }

  productsData: Product[] = [
    {
      name: 'Бургер чеддер & бекон',
      text: `Котлета из говядины криспи, булочка, томат, сыр Чеддер,
        грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус`,
      image: '1.png',
      basePrice: 8,
      weight: 360
    },
    {
      name: 'BBQ с беконом и курицей',
      text: `Булочка бриошь с кунжутом, куриная котлета, сыр чеддер,
        томат, огурец маринованный, лук маринованный, салат Ромен,
        бекон, соус BBQ`,
      image: '2.png',
      basePrice: 7,
      weight: 390
    },
    {
      name: 'Дабл биф бургер',
      text: `Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы,
        свежий томат, бекон, красный лук, соус бургер, горчица`,
      image: '3.png',
      basePrice: 10,
      weight: 420
    },
    {
      name: 'Баварский бургер',
      text: `Булочка для бургера, говяжья котлета, красный лук, сыр,
        охотничья колбаска, соус барбекю, соус сырный, салат айсберг`,
      image: '4.png',
      basePrice: 7,
      weight: 220
    },
    {
      name: 'Бекон чизбургер',
      text: `Булочка для бургера, говяжья котлета, грудинка, помидор,
        огурец маринованный, сыр, сырный соус, кетчуп, зелень`,
      image: '5.png',
      basePrice: 8,
      weight: 220
    },
    {
      name: 'Индиана бургер',
      text: `Булочка для бургера, котлета куриная, грудинка, яйцо,
        огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень`,
      image: '6.png',
      basePrice: 9,
      weight: 320
    },
    {
      name: 'Вегги бургер',
      text: `Булочка для бургера, вегетарианская котлета, красный лук,
        сыр, свежий томат, соус барбекю, соус сырный, салат айсберг`,
      image: '7.png',
      basePrice: 8,
      weight: 280
    },
    {
      name: 'Плаксивый Джо',
      text: `Булочка для бургера, говяжья котлета, грудинка, помидор,
        огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень`,
      image: '8.png',
      basePrice: 7,
      weight: 380
    },
    {
      name: 'Двойной чиз бургер',
      text: `Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар,
        огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень`,
      image: '9.png',
      basePrice: 11,
      weight: 400
    },
    {
      name: 'Фрешбургер',
      text: `Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо,
        салями, соус барбекю, соус сырный, салат айсберг, свежий томат`,
      image: '10.png',
      basePrice: 9,
      weight: 300
    },
    {
      name: 'Цуккини бургер',
      text: `Булочка для бургера, вегетарианская котлета из нута,
        цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень`,
      image: '11.png',
      basePrice: 8,
      weight: 320
    },
    {
      name: 'Двойной бургер чеддар',
      text: `Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный,
        томат, кетчуп, двойной сыр чеддар, горчица, зелень`,
      image: '12.png',
      basePrice: 9,
      weight: 360
    },
  ]

  scrollTo(target: HTMLElement) {
    target.scrollIntoView({behavior: 'smooth'})
  }

  confirmOrder() {
    if(this.form.valid) {
      alert('Спасибо за заказ! Мы скоро свяжемся с вами!')
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

    this.form.patchValue({order: `${product.name} (${this.getProductPrice(product)})`});
  }
}
