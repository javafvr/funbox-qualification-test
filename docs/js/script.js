'use strict';

window.onload = function() {

// Pattern module
(function(){
	const 	productCards = document.getElementsByClassName('product-card');
	
	let click = false;

	// Функция обрабатывающая события
	function toggleState(e){

		let productCard = getParent(e.target, '.product-card');
		let slogan = productCard.getElementsByTagName('h3');

		//Мышь навели
		if (e.type=='mouseover') {
			if (productCard.classList.contains('product-card--active')){
				slogan[0].innerHTML = 'Котэ не одобряет?';
				slogan[0].classList.add('title-3--active');
				console.dir(slogan);

			}
		}
		
		// Кликнули
		if (e.type=='click'){
			click=true;
		}

		// Мышь убрали с элемента product-card
		if (e.type=='mouseleave'){
			slogan[0].innerHTML = 'Сказочное заморское яство';
			slogan[0].classList.remove('title-3--active');
		}

		// Мышь убрали с элемента product-card после клика
		if (e.type=='mouseleave' && click==true) {
			productCard.classList.toggle('product-card--active');
			click=false;
			
			let footer = getFooter(productCard);
			let descr;
			
			if(getDescr(productCard) == false){
				descr = document.createElement('p');
				descr.className = "footer footer--descr text-center";
				descr.innerHTML = productCard.getAttribute('data-descr');
			} else{
				descr = getDescr(productCard);
			}
					
			// Поведение футера карточки при активном состоянии и наоборот
			if (productCard.classList.contains('product-card--active')){
				footer.hidden = true;
				console.log(getDescr(productCard));
				if(getDescr(productCard) == false){
					footer.parentNode.insertBefore(descr, footer.nextSibling);

				} else{
					descr.hidden = false;
				}
			} else {
				footer.hidden = false;
				descr.hidden = true;
			}
		}
	}

	// Отделный обработчик событий для линка в футере 
	function toggleStateByLink(e){
		e.target.offsetParent.firstElementChild.classList.toggle('product-card--active');
	}

	for (let productCard of productCards) {
		if (productCard.classList.contains('product-card--disabled')) continue;
		productCard.addEventListener("click", toggleState);
		productCard.addEventListener("mouseleave", toggleState);
		productCard.addEventListener("mouseover", toggleState);

		getFooter(productCard).children[0].addEventListener("click", toggleStateByLink);

	}


// Вспомогательные функции

	// Получаем описание если оно есть
	function getDescr(productCard){
		
		let elements = productCard.parentElement.getElementsByTagName('p');
		let result = false;

		for (let element of elements) {
			if (element.classList.contains('footer--descr')) {
				result = element;
			} else{
				continue;
			}

		}

		return result;
	}	

	// Получаем футер карточки
	function getFooter(productCard){
		let elements = productCard.parentElement.getElementsByTagName('p');
		let result = false;

		for (let element of elements) {
			if (element.className == 'footer text-center') {
				result = element;
			} else{
				continue;
			}

		}

		return result;
	}

	// Получаем родителя элемента
	function getParent(elementSelector, parentSelector) {

		let parents = document.querySelectorAll(parentSelector);
		
		for (parent of parents) {
			if (parent.contains(elementSelector)) {
				return parent;
			}
		}
		return null;
	}
})();




};