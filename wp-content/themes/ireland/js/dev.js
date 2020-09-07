"use strict"
$(function($){
	
	$('#true_loadmore').click(function(){
		$(this).find('.more-btn').addClass('processing'); 
		var data = {
			'action': 'loadmore',
			'query': true_posts,
			'page' : current_page
		};
		$.ajax({
			url:ajaxurl, 
			data:data, 
			type:'POST', 
			success:function(data){
				if( data ) { 					
					$('.extra-1').remove(); 
					$('.journal-list').append(data);
					addElem(); 
					lazyInit();
                    aos_init();					
					$('.more-btn').removeClass('processing'); 
					current_page++; 
					if (current_page == max_pages) $("#true_loadmore").remove(); 
				} else {
					$('#true_loadmore').remove(); 
				}
			}
		});
	});
});

$(function($){
	
	$('#true_loadmore_works').click(function(){
		$(this).find('.more-btn').addClass('processing'); 
		var data = {
			'action': 'loadmoreworks',
			'query': true_posts,
			'page' : current_page
		}; 
		$.ajax({
			url:ajaxurl, 
			data:data, 
			type:'POST', 
			success:function(data){
				if(data) { 
					//$('.extra-1').remove(); 
					$('.projects-list').append(data);
					addElem(); 
					lazyInit();
                    aos_init();					
					$('.more-btn').removeClass('processing'); 					
					current_page++; 
					if (current_page == max_pages) $("#true_loadmore_works").remove(); 
				} else {
					$('#true_loadmore_works').remove(); 
				}
			}
		});
	});
});


$(document).on('submit', '.for_func', function (e) {
    e.preventDefault(0);
    var formData = new FormData(this);
    formData.append('action', 'price');    

    var error = false;  
    var form = $(this); 

    var firstname = $(form).find('input[name=firstname]').val();
    var lastname = $(form).find('input[name=lastname]').val();
    var email = $(form).find('input[name=email]').val(); 
    var tel = $(form).find('input[name=tel]').val(); 
	var address = $(form).find('input[name=address]').val(); 
    var subject = $(form).find('input[name=subject]').val(); 
    var start = $(form).find('input[name=start]').val(); 
    var description = $(form).find('textarea[name=description]').val(); 
    var price = $(form).find('input[name=price]:checked').val(); 
    var filedocument = $(form).find('input[name=filedocument]').val();   
    var agree = $(form).find('input[name=agree]:checked').val();    

    if(!firstname || firstname.length < 2){
        error = true;
        $(form).find('input[name=firstname]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=firstname]').closest('label').removeClass('error');
        }, 3000);            
    }  

    if(!lastname || lastname.length < 2){
        error = true;
        $(form).find('input[name=lastname]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=lastname]').closest('label').removeClass('error');
        }, 3000);            
    }  
    var test_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(!email || !test_email.test(email)){
        error = true;
        $(form).find('input[name=email]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=email]').closest('label').removeClass('error');
        }, 3000);
    }


    if(!tel || tel.length < 5){
        error = true;
        $(form).find('input[name=tel]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=tel]').closest('label').removeClass('error');
        }, 3000);            
    }  

    if(!address || address.length < 2){
        error = true;
        $(form).find('input[name=address]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=address]').closest('label').removeClass('error');
        }, 3000);            
    }  

    if(!subject || subject.length < 2){
        error = true;
        $(form).find('input[name=subject]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=subject]').closest('label').removeClass('error');
        }, 3000);            
    }  

    if(!start || start.length < 2){
        error = true;
        $(form).find('input[name=start]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=start]').closest('label').removeClass('error');
        }, 3000);            
    }  

    if(!description || description.length < 10){
        error = true;
        $(form).find('textarea[name=description]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('textarea[name=description]').closest('label').removeClass('error');
        }, 3000);            
    }  

    if(!price || price.length < 2){
        error = true;
        $(form).find('input[name=price]').closest('label').addClass('error');
        setTimeout(function () {
            $(form).find('input[name=price]').closest('label').removeClass('error');
        }, 3000);            
    } 


    if(!agree || !agree.length || agree == 'undefined'){
    	error = true;
    	$(form).find('.form-agreement').addClass('error');
    	$(form).find('.form-agreement').addClass('disable');
    	$(form).addClass('disable');        
        setTimeout(function () {           
            $(form).find('.form-agreement').removeClass('error');
            $(form).find('.form-agreement').removeClass('disable');
            $(form).removeClass('disable');
        }, 3000);       
    }
    
    if(!error){
        if(!$(form).find('button').hasClass('disabled')){
            $('.for_func').addClass('disable');



     /*       (function animation() {
   var options = {
      duration: 1000,
      easing: 'linear'
   };

  $('.contact-form')
      .animate({ opacity: '0.3' }, options )
      .animate({ opacity: '1' }, options )
      .animate({ opacity: '0.3' }, options )
      .animate({ opacity: '1' }, options )    
      .animate({ opacity: '0.3' }, options )
      .animate({ opacity: '1' }, options )
      .animate({ opacity: '0.3' }, options )
      .animate({ opacity: '1' },
         $.extend(true, {}, options, {
            complete: function() {
               animation();
            }
         })
      );
})();*/

$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );
$('.contact-form').animate({ opacity: '1' }, 1000 );
$('.contact-form').animate({ opacity: '0.3' }, 1000 );

            //$('.contact-form').animate({      opacity: '0.5'  });

            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'post',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function (data) {                    
                    if(data.success){
                        $(form).get(0).reset();
                        //$('#cv-form').iziModal('close');
                        //$('#success-form').iziModal('open');
                        //$(form).find('button').removeClass('disabled'); 
                        //$('.contact-form').fadeTo(100,1);   

                        formDone();
                        $('.contact-form').stop(true);
                        $('.contact-form').fadeTo(100,1); 
                    }else{
                        $.each(data.error, function (input_name, error) {
                            $(form).find('input[name='+input_name+']').closest('label').addClass('error');
                            $(form).find('select[name='+input_name+']').closest('label').addClass('error');
                            setTimeout(function () {
                                $(form).find('input[name='+input_name+']').closest('label').removeClass('error');
                                $(form).find('select[name='+input_name+']').closest('label').removeClass('error');
                            }, 3000);
                        })
                    }                    
                }
            });
        }else{
            $(form).find('button').removeClass('disabled');
            return false;
        }
    }else{
        $(form).find('button').removeClass('disabled');
        return false;
    }
});


//sub

$(document).on('submit', '.for_func_1', function (e) {
    e.preventDefault(0);
    var formData = new FormData(this);
    formData.append('action', 'sub');    

    var error = false;  
    var form = $(this); 
   
    var email = $(form).find('input[name=email]').val();     
    var agree = $(form).find('input[name=agree]:checked').val();  


    var test_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(!email || !test_email.test(email)){
        error = true;
        $(form).addClass('error');
        setTimeout(function () {
            $(form).removeClass('error');
        }, 3000);
    }

    if(!agree || !agree.length || agree == 'undefined'){
    	error = true;
        $(form).find('.form-agreement').addClass('error');
        setTimeout(function () {
            $(form).find('.form-agreement').removeClass('error');
        }, 3000);
    }
    
    if(!error){
        if(!$(form).find('button').hasClass('disabled')){
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: 'post',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function (data) {
                    if(data.success){
                        $(form).get(0).reset();
                        $(form).addClass('done');
                        //$('#cv-form').iziModal('close');
                        //$('#success-form').iziModal('open');
                        $(form).find('button').removeClass('disabled');
                    }else{
                        $.each(data.error, function (input_name, error) {
                            $(form).find('input[name='+input_name+']').closest('label').addClass('error');
                            $(form).find('select[name='+input_name+']').closest('label').addClass('error');
                            setTimeout(function () {
                                $(form).find('input[name='+input_name+']').closest('label').removeClass('error');
                                $(form).find('select[name='+input_name+']').closest('label').removeClass('error');
                            }, 3000);
                        })
                    }                    
                }
            });
        }else{
            $(form).find('button').removeClass('disabled');
            return false;
        }
    }else{
        $(form).find('button').removeClass('disabled');
        return false;
    }
});
