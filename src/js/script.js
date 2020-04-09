$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 550,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="src/img/icons/leftArrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="src/img/icons/rightArrow.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });    

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(event){
                event.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal="consultation"]').on('click', function(){
        $('.overlay, #consultation').fadeIn('fast');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        })
    });    

    function validateForms(form){
        $(form).validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                },
            },
    
            messages: {
                name: {
                    required: "Введите свое имя, пользователь",
                    minlength: jQuery.validator.format("Имя должно состоять минимум из {0} символов")
                },
                email: {
                  required: "Пожалуйста, оставьте свою электронную почту",
                  email: "Не верный адрес почты"
                }
              }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    $('input[name=phone]').mask("+(380)999-99-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "src/mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });

        return false;
    });

    // SMooth scroll and pageup

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600)
            $('.pageup').fadeIn();
        else
            $('.pageup').fadeOut();
    });

    $(function(){
        $("a[href='#up'], a[href='#catalog']").click(function(){
                const _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });

        new WOW().init();
    });
});