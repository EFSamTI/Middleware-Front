import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/core/services/authentication';
import { LanguageService } from 'src/app/core/services/language';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  country: any;
  selectedItem!: any;

  // flagvalue: any;
  // valueset: any;
  // countryName: any;
  // cookieValue: any;
  langData?: { text: string, flag: string, lang: string };
  userData: any;
  cartData: any;

  element: any;
  mode: string | undefined;

  total: any;
  subtotal: any = 0;
  totalsum: any;
  taxRate: any = 0.125;
  shippingRate: any = '65.00';
  discountRate: any = 0.15;
  discount: any;
  tax: any;

  notificationList: any;

  @Output() mobileMenuButtonClicked = new EventEmitter();
  deleteid: any;
  totalNotify: number = 0;
  newNotify: number = 0;
  readNotify: number = 0;

  constructor(@Inject(DOCUMENT) private document: any,
    // private eventService: EventService,
    public languageService: LanguageService,
    private authService: AuthenticationService,
    private router: Router,
    public _cookiesService: CookieService) { }

  async ngOnInit(): Promise<void> {
    this.element = document.documentElement;

    this.userData = await this.authService.profile;

    this.cartData = [];
    this.cartData.map((x: any) => {
      x['total'] = (x['qty'] * x['price']).toFixed(2);
      this.subtotal += parseFloat(x['total']);
    })
    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2);


    // Cookies wise Language set
    this.langData = this.languageService.current;

    this.notificationList = [];
    this.notificationList.forEach((element: any) => {
      this.totalNotify += element.items.length;
      if (element.title == 'New') {
        this.newNotify = element.items.length;
      } else {
        this.readNotify = element.items.length;
      }
    });
  }

  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  // Increment Decrement Quantity
  qty: number = 0;
  increment(qty: any, i: any, id: any) {
    this.subtotal = 0;
    if (id == '0' && qty > 1) {
      qty--;
      this.cartData[i].qty = qty;
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2);
    }
    if (id == '1') {
      qty++;
      this.cartData[i].qty = qty;
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2);
    }

    this.cartData.map((x: any) => {
      this.subtotal += parseFloat(x['total']);
    })

    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2);
  }

  removeCart(id: any) {
    // this.removeCartModal?.show()
    // this.deleteid = id;
  }

  confirmDelete() {
    // this.removeCartModal?.hide()

    this.subtotal -= this.cartData[this.deleteid].total;
    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2);
    this.cartData.splice(this.deleteid, 1);
  }

  /**
* Topbar Light-Dark Mode Change
*/
  changeMode(mode: string) {
    this.mode = mode;
    if (mode == 'auto') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.documentElement.setAttribute('data-topbar', 'light');
      document.documentElement.classList.add('mode-auto');
    } else {
      document.documentElement.setAttribute('data-bs-theme', mode);
      document.documentElement.setAttribute('data-topbar', mode);
      document.documentElement.classList.remove('mode-auto');
    }
  }

  /***
  * Language Value Set
  */
  setLanguage(lang: string) {
    this.langData = this.languageService.setLanguage(lang);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open');
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
  * Fullscreen method
  */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  // Search Topbar
  Search() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("search-options") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    var inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add("show");
      searchOptions.classList.remove("d-none");
      var inputVal = input.value.toUpperCase();
      var notifyItem = document.getElementsByClassName("notify-item");

      Array.from(notifyItem).forEach(function (element: any) {
        var notifiTxt = ''
        if (element.querySelector("h6")) {
          var spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase();
          var name = element.querySelector("h6").innerText.toLowerCase();
          if (name.includes(inputVal)) {
            notifiTxt = name;
          } else {
            notifiTxt = spantext;
          }
        } else if (element.getElementsByTagName("span")) {
          notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase();
        }
        if (notifiTxt)
          element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";

      });
    } else {
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
    dropdown.classList.remove("show");
    searchOptions.classList.add("d-none");
    searchInputReponsive.value = "";
  }

  // Remove Notification
  checkedValGet: any[] = [];
  onCheckboxChange(event: any, id: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.notificationList.length; i++) {
      for (var x = 0; x < this.notificationList[i].items.length; x++) {
        if (this.notificationList[i].items[x].state == true) {
          result = this.notificationList[i].items[x].id;
          checkedVal.push(result);
        }
      }
    }
    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? (document.getElementById("notification-actions") as HTMLElement).style.display = 'block' : (document.getElementById("notification-actions") as HTMLElement).style.display = 'none';
  }

  notificationDelete() {
    for (var i = 0; i < this.checkedValGet.length; i++) {
      for (var j = 0; j < this.notificationList.length; j++) {
        for (var x = 0; x < this.notificationList[j].items.length; x++) {
          if (this.notificationList[j].items[x].id == this.checkedValGet[i]) {
            this.notificationList[j].items.splice(x, 1);
          }
        }
      }
    }
    this.calculatenotification();
    // this.removeNotificationModal?.hide();
  }

  calculatenotification() {
    this.totalNotify = 0;
    this.checkedValGet = []
    this.notificationList.forEach((element: any) => {
      this.totalNotify += element.items.length;
      if (element.title == 'New') {
        this.newNotify = element.items.length;
      } else {
        this.readNotify = element.items.length;
      }
    });
    this.checkedValGet.length > 0 ? (document.getElementById("notification-actions") as HTMLElement).style.display = 'block' : (document.getElementById("notification-actions") as HTMLElement).style.display = 'none';
    if (this.totalNotify == 0) {
      document.querySelector('.empty-notification-elem')?.classList.remove('d-none');
    }
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
