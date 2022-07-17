import {$, Inputmask, Fancybox} from './common';

// Верхний слайдер
if($('.js-top-slider').length){
	$('.js-top-slider').slick({
		infinite: true,
		dots: true,
		appendArrows: $('.js-top-slider-arr'),
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="6" height="12"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arrow-right" width="6" height="12"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		appendDots: $('.js-top-slider-dots'),
	});
}

// Слайдер работ
if($('.js-works-slider').length){
	$('.js-works-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="6" height="12"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arrow-right" width="6" height="12"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		  ]
	});
}

// Развернуть/Свернуть пункты каталожного меню
if($('.js-sect-menu-arr').length){
	$('.js-sect-menu-arr').on('click', function(e){
		e.preventDefault();
		$(this).closest('.js-sect-menu-item').find('.js-sect-menu-sub').slideToggle(300);
	});
}

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');

// Валидация форм
function errorField(form, event) {
	form.find('.js-form-site-item').removeClass('error');
	form.find('.form-site-msg-error').remove();
	
	form.find('input[type=email]').each(function(){
		mailValid($(this));
	});

	form.find('.js-input-mail').each(function(){
		mailValid($(this));
	});

	function mailValid(elem) {
		var email = $(elem).val().trim();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		if (!pattern.test(email) && (email.length > 1)) {
			$(elem).closest('.js-form-site-item').addClass('error');
			$(elem).attr('placeholder','Укажите корректный E-mail');
		}
	}

	form.find('input,textarea,select').filter('[required]').each(function(){
		if($(this).val().length < 1){
			$(this).closest('.js-form-site-item').addClass('error');

			if($(this).hasClass('js-phone')){
				$(this).attr('placeholder','Укажите ваш номер телефона');
			} else {
				$(this).attr('placeholder','Заполните поле');
			}
		}

		if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
			$(this).closest('.js-form-site-polit').append('<div class="form-site-msg-error">Подтвердите обработку персональных данных</div>')
		}
		if($(this).attr('type') == 'radio' && !$('input[name="'+$(this).attr("name")+'"]').is(':checked')){
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).closest('.js-form-site-item').append('<div class="form-site-msg-error">Заполните поле</div>')
		}
	});

	if(form.find('.js-form-site-item.error').length){
		event.preventDefault();
	}
}

if($('.js-valid-form').length){
	$('.js-valid-form').on('click', '.js-btn-submit', function(e){
		var $form = $(this).closest('form');
		errorField($form, e);
	});

	$('.js-valid-form').on('submit', 'form', function(e){
		var successTitle = $(this).closest('.js-valid-form').data('success');
		var successText = $(this).closest('.js-valid-form').data('text');
		var tempSuccessTitle = $('.js-success-alert-title').text();

		if(successTitle){
			$('.js-success-alert-title').text(successTitle);
		} else {
			$('.js-success-alert-title').text(tempSuccessTitle);
		}

		if(successText == 'none'){
			$('.js-success-alert-text').css('display', 'none');
		} else {
			$('.js-success-alert-text').text(successText);
		}

		Fancybox.close();
		Fancybox.show([{ src: "#msg-success", type: "inline" }]);

		$(this)[0].reset();
		e.preventDefault();
	});
}

// Табуляция
if ($('.js-tabs-page').length) {
	$('.js-tabs-page-list').each(function(){
		$(this).find('.js-tabs-page-item:first').addClass("active");
	});

	$('.js-tabs-page-content').each(function(){
		$(this).find('.js-tabs-page-content-item:first').fadeIn();
	});

	$('.js-tabs-page-left').addClass('inactive');

	$('.js-tabs-page-item').on('click',function(e) {
		e.preventDefault();
		
		if(window.deviceType != 'mobile'){
			var $parent = $(this).parents('.js-tabs-page');
			
			$parent.find('.js-tabs-page-content-item').hide();
			$parent.find('.js-tabs-page-item').removeClass('active');
			
			$(this).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).fadeIn();
		}
	});
	
	$('.js-tabs-page-right').on('click',function(e) { //перелистывание табов влево
		var $parent = $(this).closest('.js-tabs-page');
		var $activeItem = $parent.find('.js-tabs-page-item.active').next();

		$parent.find('.js-tabs-page-left').removeClass('inactive');
		
		if($activeItem.length == 1){
			$parent.find('.js-tabs-page-content-item').hide();
			$parent.find('.js-tabs-page-item').removeClass('active');
			
			$activeItem.addClass("active");
			$parent.find('#' + $activeItem.attr('data-item')).fadeIn();

			if($activeItem.next().length == 0){
				$(this).addClass('inactive');
			}
		}
	});

	$('.js-tabs-page-left').on('click',function(e) {//перелистывание табов вправо
		var $parent = $(this).closest('.js-tabs-page');
		var $activeItem = $parent.find('.js-tabs-page-item.active').prev();

		$parent.find('.js-tabs-page-right').removeClass('inactive');
		
		if($activeItem.length == 1){
			$parent.find('.js-tabs-page-content-item').hide();
			$parent.find('.js-tabs-page-item').removeClass('active');
			
			$activeItem.addClass("active");
			$parent.find('#' + $activeItem.attr('data-item')).fadeIn();

			if($activeItem.prev().length == 0){
				$(this).addClass('inactive');
			}
		}
	});
}

// Открыть/Закрыть мобильное меню
$('.js-open-menu').on('click',function(){
	$('.js-main-menu').addClass('open');
	$('.js-body').addClass('no-scroll');
	$('.js-shadow-site').addClass('active');
});

$('.js-close-menu').on('click',function(){
	$('.js-main-menu').removeClass('open');
	$('.js-body').removeClass('no-scroll');
	$('.js-shadow-site').removeClass('active');
});

$('.js-shadow-site').on('click',function(){
	$('.js-main-menu').removeClass('open');
	$('.js-body').removeClass('no-scroll');
	$('.js-shadow-site').removeClass('active');
});

// Открыть/Закрыть пункты меню
if($('.js-main-menu-arr').length){
	$('.js-main-menu-arr').on('click', function(){
		$(this).toggleClass('active');
		$(this).closest('.js-main-menu-item').children('.js-main-menu-sub').slideToggle(300);
	});
}

// Открыть/Закрыть контакты из шапки
if($('.js-open-contacts').length){
	$('.js-open-contacts').on('click',function(){
		$('.js-header-contacts').addClass('active');
	});

	$('.js-close-contacts').on('click',function(){
		$('.js-header-contacts').removeClass('active');
	});

	$(document).on('click', function (e) {
		if ($(e.target).closest('.js-header-contacts').length) {return;}
		if ($(e.target).closest('.js-open-contacts').length) {return;}
		$('.js-header-contacts').removeClass('active');
	});
}

// Открыть/Закрыть левое меню
if($('.js-left-menu-btn').length){
	$('.js-left-menu-btn').on('click', function(){
		$('.js-left-menu').slideToggle(300);
	});
}

// unwrap block
if($('.js-unwrap-block').length){
	$('.js-unwrap-head').on('click',function(event){
		event.preventDefault();
		var $parent = $(this).parents('.js-unwrap-block');
		
		$parent.toggleClass('opened');
		if($parent.hasClass('opened')){
			$parent.children('.js-unwrap-content').slideDown(400);
		}else{
			$parent.children('.js-unwrap-content').slideUp(400);
		}
	});
}