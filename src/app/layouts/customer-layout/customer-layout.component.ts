import { AfterViewInit, Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
    
    $('.fixed-plugin').hide(); //ocultando el config a la derecha
    
    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
        // if we are on windows OS we activate the perfectScrollbar function
        document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
        document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    if (window.matchMedia(`(min-width: 960px)`).matches) {
        let ps = new PerfectScrollbar(elemMainPanel);
        ps = new PerfectScrollbar(elemSidebar);
    }

    const window_width = $(window).width();
    let $sidebar = $('.sidebar');
    let $sidebar_responsive = $('body > .navbar-collapse');
    let $sidebar_img_container = $sidebar.find('.sidebar-background');

  //   $sidebar.attr('data-color', 'azure');

    if(window_width > 767){
        if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
            $('.fixed-plugin .dropdown').addClass('open');
        }

    }
  }

  ngAfterViewInit() {
    this.runOnRouteChange();
  }



  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

}
