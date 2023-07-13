var is_bot=0;
jQuery(document).ready(function ($)
{

    $("input, textarea").on("keyup", function() {is_bot++;});
    $(document).scroll(function(){is_bot++;});
    $('.my-form').on("submit", function(e)
    {
        e.preventDefault();
        if(is_bot>3)
        {
            $(this).append("<input type='hidden' name='no_bot' value='1' />");

            var lid = $(this).data("lid");
            try {
                console.log(lid);
                ym('55004221', 'reachGoal', ''+lid+'');
                // yaCounter55004221.reachGoal(lid);
                console.log('end lid');
            }
            catch (e) {}

            var z_form = $(this).serialize();
            var z_form_id = $(this).attr("id");

            $.ajax({
                type: 'POST',
                url: '/includes/send_form.php'+location.search,
                data: z_form,
                success: function(data)
                {
                    console.log(data);

                    if(data=="1")
                    {
                        $.fancybox.close();
                        Swal.fire(
                            {
                                title: 'Спасибо! Заявка успешно отправлена',
                                html: 'Мы свяжемся с Вами',
                                icon: 'success',
                                showCloseButton: true,
                                confirmButtonText: 'Закрыть окно'
                            }
                        );

                        $("#"+z_form_id).find("select, input, button, textarea, .select2").prop('disabled', true);
                        $("#"+z_form_id).find("select, input, button, textarea, .select2").css('opacity', '0.7');
                        // ---
                    }
                    return false;
                },
                error:  function(xhr, str)
                {
                    Swal.fire({
                        title: 'Ошибка!',
                        text: 'Что-то пошло не так',
                        icon: 'error',
                        confirmButtonText: 'Закрыть'
                    });
                    return false;
                }
            });

        }
        return false;
    });
});