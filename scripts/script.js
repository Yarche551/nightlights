
$(document).ready(function () {

    // wow js
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // slider feedback
    $('.feedback__people').slick({
        // dots: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3,
                    dots: false
                }
            },

            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                }
            },

            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                }
            }
        ]
    });

    // burger button
    $('#burger-menu').on('click', function () {
        $('.menu').addClass('open');
    });

    $('#menu').on("click", "*", function () {
        $('#menu').removeClass('open');
    });

    // кнопка "купить"
    let toBuyButtons = $('.to-buy');
    toBuyButtons.on('click', function () {
        $('.form')[0].scrollIntoView({ 'behavior': 'smooth' });
    })

    // маска для телефона
    $("#phone").mask("+380 (99) 999-99-99");

    // событие для кнопок на выборке
    document.getElementById('red__nightlight').onclick = () => {
        document.getElementById('red__color').checked = true;
    };
    document.getElementById('green__nightlight').onclick = () => {
        document.getElementById('green__color').checked = true;
    };
    document.getElementById('white__nightlight').onclick = () => {
        document.getElementById('white__color').checked = true;
    };


    // валидация
    $('#submit').click(function () {
        let form = $('.form');
        let name = $('#name');
        let phone = $('#phone');
        let color = $('.checkbox:checked');
        let hasError = false;

        let arr = [];
        document.querySelectorAll('.checkbox:checked').forEach(cb => {
            arr.push(cb.value);
        });

        // console.log(arr);


        $('.error-input').hide();

        // ошибки
        if (!name.val().trim()) {
            name.next().show();
            hasError = true;
        }

        if (!phone.val().trim()) {
            phone.next().show();
            hasError = true;
        }

        // заменить условие !redColor.is(':checked') && !greenColor.is(':checked') && !whiteColor.is(':checked')
        // если не сработает
        if (arr.length === 0) {
            $('.color').css('color', 'red');
            hasError = true;
        } else {
            $('.color').css('color', 'black');
        }

        // даные перед отправкой
        let dataToSend = {
            name: name.val().trim(),
            phone: phone.val().trim(),
            color: arr.slice()
        };
        console.log(dataToSend);

        // 0 ошибок 
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: dataToSend
            })
                .done(function (msg) {
                    console.log(msg);

                    if (msg.success) {
                        form.hide();
                        $('.thx').show();
                    } else {
                        $('.thx').hide();
                        form.show();
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                    form[0].reset();
                });
        };
    });
})
