import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';


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


/*  */
document.addEventListener("DOMContentLoaded", () => {
	const maxVisible = 10;

	function getWordForm(n) {
		n = Math.abs(n) % 100;
		const n1 = n % 10;
		if (n > 10 && n < 20) return "видов";
		if (n1 > 1 && n1 < 5) return "вида";
		if (n1 === 1) return "вид";
		return "видов";
	}

	// обходим все блоки .types-items
	document.querySelectorAll(".types-items").forEach((block) => {
		const items = block.querySelectorAll(".types-item");
		const btn = block.nextElementSibling?.classList.contains("types-more")
			? block.nextElementSibling
			: null;

		if (!btn) return; // если кнопки рядом нет, пропускаем

		const btnText = btn.querySelector(".types-more-text");
		const total = items.length;

		if (total > maxVisible) {
			const hiddenCount = total - maxVisible;
			btn.style.display = "inline-block";
			btnText.textContent = `Ещё ${hiddenCount} ${getWordForm(hiddenCount)}`;
		}

		btn.addEventListener("click", () => {
			items.forEach(item => item.classList.add("show"));
			btn.style.display = "none";
		});
	});
});