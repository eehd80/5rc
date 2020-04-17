$(document).ready(function () {

    // ------------------------------------------------------- //
    // Custom Scrollbar
    // ------------------------------------------------------ //

    if ($(window).outerWidth() > 992) {
        $("nav.side-navbar").mCustomScrollbar({
            scrollInertia: 200
        });
    }

    // Main Template Color
    var brandPrimary = '#0f4d95';

    // ------------------------------------------------------- //
    // Side Navbar Functionality
    // ------------------------------------------------------ //
    $('#toggle-btn').on('click', function (e) {

        e.preventDefault();

        if ($(window).outerWidth() > 1194) {
            $('nav.side-navbar').toggleClass('shrink');
            $('.page').toggleClass('active');
        } else {
            $('nav.side-navbar').toggleClass('show-sm');
            $('.page').toggleClass('active-sm');
        }
    });

    // ------------------------------------------------------- //
    // Tooltips init
    // ------------------------------------------------------ //    

    $('[data-toggle="tooltip"]').tooltip()

    // ------------------------------------------------------- //
    // Universal Form Validation
    // ------------------------------------------------------ //

    $('.form-validate').each(function() {  
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote),.note-editable.card-block',
            errorPlacement: function (error, element) {
                // Add the `invalid-feedback` class to the error element
                error.addClass("invalid-feedback");
                //console.log(element);
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                } 
                else {
                    error.insertAfter(element);
                }
            }
        });
    });
    // ------------------------------------------------------- //
    // Material Inputs
    // ------------------------------------------------------ //

    var materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function () {
        return $(this).val() !== "";
    }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function () {
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });

    // ------------------------------------------------------- //
    // Jquery Progress Circle
    // ------------------------------------------------------ //
    var progress_circle = $("#progress-circle").gmpc({
        color: brandPrimary,
        line_width: 5,
        percent: 80
    });
    progress_circle.gmpc('animate', 80, 3000);

    // ------------------------------------------------------- //
    // External links to new window
    // ------------------------------------------------------ //

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

    // ------------------------------------------------------ //
    // includeHTML
    // ------------------------------------------------------ //
    includeHTML();


    // ------------------------------------------------------ //
    // DataTable
    // ------------------------------------------------------ //

    $('.tbl-scroll-wrap').each(function(){
        
        var $this = $(this),
            $thead = $this.find('thead'),
            theadClone = $thead.clone()
            tbodyClone = $this.find('colgroup').clone();

        $this.append('<div class="tbl-clone-wrap"><table class="tbl-g tbl-clone table"></table></div>');

        $this.find('.tbl-clone').prepend(theadClone).prepend(tbodyClone);
    });




    // ------------------------------------------------------ //
    // summernote
    // ------------------------------------------------------ //

    // $('.summernote').summernote({
    //     toolbar: [
    //       ['style', ['bold', 'italic', 'underline', 'clear']]
    //     ],
    //     placeholder: 'Leave a comment ...',
    //     callbacks: {
    //         onKeydown: function (e) { 
    //             var t = e.currentTarget.innerText; 
    //             if (t.trim().length >= 400) {
    //                 //delete keys, arrow keys, copy, cut, select all
    //                 if (e.keyCode != 8 && !(e.keyCode >=37 && e.keyCode <=40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
    //                 e.preventDefault(); 
    //             } 
    //         },
    //         onKeyup: function (e) {
    //             var t = e.currentTarget.innerText;
    //             $('#maxContentPost').text(400 - t.trim().length);
    //         },
    //         onPaste: function (e) {
    //             var t = e.currentTarget.innerText;
    //             var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
    //             e.preventDefault();
    //             var maxPaste = bufferText.length;
    //             if(t.length + bufferText.length > 400){
    //                 maxPaste = 400 - t.length;
    //             }
    //             if(maxPaste > 0){
    //                 document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
    //             }
    //             $('#maxContentPost').text(400 - t.length);
    //         }
    //     }
    // });

    // ------------------------------------------------------ //
    // datePicker
    // ------------------------------------------------------ //

        $('.input-datepicker > input').datepicker({
            calendarWeeks: false,
            todayHighlight: true,
            autoclose: true,
            format: "yyyy-mm-dd",
            language: "kr",
            widgetPositioning: {
                horizontal: 'left',
                vertical: 'top'
              }
        });


    // ------------------------------------------------------ //
    // inputClose
    // ------------------------------------------------------ //

    $('.int').on('input change', function() {
        var $this = $(this);
        var visible = Boolean($this.val());
        $this.next('.form-control-clear').toggleClass('hidden', !visible);
    }).trigger('propertychange');
    
    $('.form-control-clear').on('click', function() {
        var $this = $(this);
        $this.prev('.int').val('').trigger('change').focus();
        $(this).toggleClass('hidden', true);
    });


    // ------------------------------------------------------ //
    // select-input
    // ------------------------------------------------------ //


    //직접입력 인풋박스 기존에는 숨어있다가
    // $("#selboxDirect").hide();
    // $(".sel-").change(function() {
    //     if($(".sel-").val() == "direct") {
    //         $("#selboxDirect").show();
    //     }  else {
    //         $("#selboxDirect").hide();
    //     }
    // }) 

    // ------------------------------------------------------ //
    // selectpicker
    // ------------------------------------------------------ //

    $('.sel-').selectpicker({
            language: {
                noResults: function (params) {
                    return "No results ... or something else";
                }
            }
        }
    );

    // ------------------------------------------------------ //
    // map-pop
    // ------------------------------------------------------ //
    
    $('.contents-pop').each(function(){

        let $this = $(this),
            toggleBtn = $('.shadow');

        toggleBtn.on('click', function(){
            $this.toggleClass('collapsed');
        })
    })
    




});