const links = document.querySelectorAll('a[data-link]')
links.forEach(function(link) {
    link.addEventListener('click', function() {
        const linkBlockId = link.getAttribute('data-link')
        document.getElementById(linkBlockId).scrollIntoView({behavior: 'smooth'})
    })
})

const productButtons = document.querySelectorAll('.product-footer button')
productButtons.forEach(function(productButton) {
    productButton.addEventListener('click', function() {
        document.getElementById('make-order').scrollIntoView({behavior: 'smooth'})
    })
})

const viewMenuButton = document.getElementById('view-menu');
viewMenuButton.addEventListener('click', function() {
    document.getElementById('make-order').scrollIntoView({behavior: 'smooth'})
})

const orderField = document.querySelector('input[name=order]')
const nameField = document.querySelector('input[name=name]')
const phoneField = document.querySelector('input[name=phone]')
const fields = [orderField, nameField, phoneField]
const form = document.getElementById('delivery-block-form')

form.addEventListener('submit', function(event) {
    event.preventDefault()
    let hasError = false;

    fields.forEach(function(field) {
        if(!field.value) {
            field.parentElement.style.background = 'red'
            hasError = true
        } else {
            field.parentElement.style.background = ''
        }
    })

    if(hasError) return;

    fields.forEach(function(field) {
        field.value = '';
    })
    alert('Спасибо за заказ! Мы скоро свяжемся с вами!')
})

const currencies = [
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

const prices = document.querySelectorAll('.product-footer-price')
const changeCurrency = document.getElementById('change-currency-button')

function calculatePrices({currency, coefficient}) {
    prices.forEach(function(price) {
        const dollarsPrice = price.getAttribute('data-base-price')
        const nextPrice = (coefficient * dollarsPrice).toFixed(1)
        price.innerText = nextPrice + ' ' + currency
    })
}

const currentCurrency = localStorage.getItem("currency") || currencies[0].currency;
const currencyIndex = currencies.findIndex(({currency}) => currency === currentCurrency)
changeCurrency.innerText = currentCurrency
calculatePrices(currencies[currencyIndex])

changeCurrency.addEventListener('click', function(event) {
    const currentCurrency = event.target.innerText
    const currencyIndex = currencies.findIndex(({currency}) => currency === currentCurrency)
    const nextCurrencyIndex = currencyIndex + 1 > currencies.length - 1
                                ? 0
                                : currencyIndex + 1
    const nextCurrency = currencies[nextCurrencyIndex]
    
    calculatePrices(nextCurrency)

    localStorage.setItem("currency", nextCurrency.currency);
    event.target.innerText = nextCurrency.currency
})