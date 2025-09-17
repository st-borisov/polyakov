import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
//import gsap from 'gsap';
//import ScrollTrigger from 'gsap/dist/ScrollTrigger.min.js';
//import $ from "jquery";
//import 'jquery-ui/ui/widgets/checkboxradio.js';
//import 'jquery-ui/ui/widgets/selectmenu.js';


/* jquery-ui */
/* $(function () {
	$(".catalog-block-type__list input").checkboxradio();
	$(".select select").selectmenu();
}); */

/* Плавный скролл по ссылкам меню */
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
	smoothLink.addEventListener('click', function (e) {
		e.preventDefault();
		const id = smoothLink.getAttribute('href');

		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
};


/* Код на меню */
const burger = document.querySelector('.header-burger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.header-burger-content-menu a');
if (burger) {
	burger.addEventListener("click", function (e) {
		body.classList.toggle('fixed');
		burger.classList.toggle('fixed');
		header.classList.toggle('fixed');
	});
}

menuLinks.forEach(link => {
	link.addEventListener('click', function () {
		body.classList.remove('fixed');
		burger.classList.remove('fixed');
		header.classList.remove('fixed');
	});
});


/* слайдер */
let pageRem = window.innerWidth / 1920 * 16;
let swiper = null;
let timer = null;

function windowResize() {
	pageRem; // 1rem is 16px
	if (swiper) {
		if (timer) {
			clearTimeout(timer);
		}
		setTimeout(() => {
			swiper.params.spaceBetween;
			swiper.update();
		}, 400);
	}
}

window.addEventListener('resize', windowResize);

const swiper1 = new Swiper('.main-reviews-slider__swiper', {
	modules: [Navigation, Pagination],
	speed: 600,
	slidesPerView: 'auto',
	spaceBetween: pageRem * 2,
	navigation: {
		nextEl: '.main-reviews-slider__next',
		prevEl: '.main-reviews-slider__prev',
	},

	pagination: {
		el: ".main-reviews-slider__pagination",
		type: "progressbar",
	},

	breakpoints: {
		1025: {
			spaceBetween: pageRem * 2,
		},
		577: {
			spaceBetween: pageRem * 3.75,
		},
		0: {
			spaceBetween: pageRem * 7.68,
		}
	}
});

const swiper2 = new Swiper('.main-services-popular__swiper', {
	modules: [Navigation, Pagination],
	speed: 600,
	slidesPerView: 'auto',
	spaceBetween: pageRem * 2,
	navigation: {
		nextEl: '.main-services-popular__next',
		prevEl: '.main-services-popular__prev',
	},

	pagination: {
		el: ".main-services-popular__pagination",
		type: "progressbar",
	},

	breakpoints: {
		1025: {
			spaceBetween: pageRem * 2,
		},
		577: {
			spaceBetween: pageRem * 3.75,
		},
		0: {
			spaceBetween: pageRem * 7.68,
		}
	}
});


/* tabs */
class ItcTabs {
	constructor(target, config) {
		const defaultConfig = {};
		this._config = Object.assign(defaultConfig, config);
		this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
		this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
		this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
		this._eventShow = new Event('tab.itc.change');
		this._init();
		this._events();
	}
	_init() {
		this._elTabs.setAttribute('role', 'tablist');
		this._elButtons.forEach((el, index) => {
			el.dataset.index = index;
			el.setAttribute('role', 'tab');
			this._elPanes[index].setAttribute('role', 'tabpanel');
		});
	}
	show(elLinkTarget) {
		const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
		const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
		const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
		if (elLinkTarget === elLinkActive) {
			return;
		}
		elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
		elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
		elLinkTarget.classList.add('tabs__btn_active');
		elPaneTarget.classList.add('tabs__pane_show');
		this._elTabs.dispatchEvent(this._eventShow);
		elLinkTarget.focus();
	}
	showByIndex(index) {
		const elLinkTarget = this._elButtons[index];
		elLinkTarget ? this.show(elLinkTarget) : null;
	};
	_events() {
		this._elTabs.addEventListener('click', (e) => {
			const target = e.target.closest('.tabs__btn');
			if (target) {
				e.preventDefault();
				this.show(target);
			}
		});
	}
}
const tabs = document.querySelectorAll('.tabs');
for (let i = 0, length = tabs.length; i < length; i++) {
	new ItcTabs(tabs[i]);
}


/* accordion */
const accordions = document.querySelectorAll('.accordion');

class ItcAccordion {
	constructor(target, config) {
		this._el = typeof target === 'string' ? document.querySelector(target) : target;
		const defaultConfig = {
			alwaysOpen: true,
			duration: 350
		};
		this._config = Object.assign(defaultConfig, config);
		this.addEventListener();
	}
	addEventListener() {
		this._el.addEventListener('click', (e) => {
			const elHeader = e.target.closest('.accordion__header');
			if (!elHeader) {
				return;
			}
			if (!this._config.alwaysOpen) {
				const elOpenItem = this._el.querySelector('.accordion__item_show');
				if (elOpenItem) {
					elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
				}
			}
			this.toggle(elHeader.parentElement);
		});
	}
	show(el) {
		const elBody = el.querySelector('.accordion__body');
		if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
			return;
		}
		elBody.style['display'] = 'block';
		const height = elBody.offsetHeight;
		elBody.style['height'] = 0;
		elBody.style['overflow'] = 'hidden';
		elBody.style['transition'] = `height ${this._config.duration}ms ease`;
		elBody.classList.add('collapsing');
		el.classList.add('accordion__item_slidedown');
		elBody.offsetHeight;
		elBody.style['height'] = `${height}px`;
		window.setTimeout(() => {
			elBody.classList.remove('collapsing');
			el.classList.remove('accordion__item_slidedown');
			elBody.classList.add('collapse-body');
			el.classList.add('accordion__item_show');
			elBody.style['display'] = '';
			elBody.style['height'] = '';
			elBody.style['transition'] = '';
			elBody.style['overflow'] = '';
		}, this._config.duration);
	}
	hide(el) {
		const elBody = el.querySelector('.accordion__body');
		if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
			return;
		}
		elBody.style['height'] = `${elBody.offsetHeight}px`;
		elBody.offsetHeight;
		elBody.style['display'] = 'block';
		elBody.style['height'] = 0;
		elBody.style['overflow'] = 'hidden';
		elBody.style['transition'] = `height ${this._config.duration}ms ease`;
		elBody.classList.remove('collapse');
		el.classList.remove('accordion__item_show');
		elBody.classList.add('collapsing');
		window.setTimeout(() => {
			elBody.classList.remove('collapsing');
			elBody.classList.add('collapse-body');
			elBody.style['display'] = '';
			elBody.style['height'] = '';
			elBody.style['transition'] = '';
			elBody.style['overflow'] = '';
		}, this._config.duration);
	}
	toggle(el) {
		el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
	}
}

if (accordions.length > 0) {
	accordions.forEach(accordion => {
		new ItcAccordion(accordion, {
			alwaysOpen: false,
		});
	});
}
