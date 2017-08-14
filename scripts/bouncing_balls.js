$(document).ready(function () {

    let browser_name = navigator.appName,
        browser_version = navigator.appVersion;
    
    if(browser_name == "Microsoft Internet Explorer") {
        //don't include javascript in page
        return;
    }
    
    console.log("Browser name: " + browser_name);
    console.log("Browser version: " + browser_version);
    
    
    
    
    const floor = 60; //sets from bottom of screen where ball bounces

    for (let i = 1; i <= 5; i++) {
        let ballWrapper = document.createElement("div"),
            ball = document.createElement("div"),
            shadow = document.createElement("div"),
            container = document.getElementById("greeting-container");

        ballWrapper.className = "ball-wrapper";
        ball.className += "ball";
        ball.className += " ball" + i;
        shadow.className = "shadow";

        ballWrapper.appendChild(ball);
        ballWrapper.appendChild(shadow);
        container.appendChild(ballWrapper);
    }

    var Ball = function (jump_height, jump_time, diameter) {
        this.jump_time = jump_time;
        this.diameter = diameter;
        this.jump_height = jump_height;
        this.shadow_min_width = function () {
            return (this.diameter / 2);
        };
        this.shadow_max_width = function () {
            return this.diameter;
        }
    }

    let num_of_balls = 5,
        ball_widths = [];

    for (let i = 1; i <= num_of_balls; i++) {
        let current_ball = $('.ball' + i),
            current_wrapper = current_ball.parent();

        //record ball widths directly from DOM for responsive purposes
        ball_widths.push(current_ball.width());
        //add appropriate widths to wrappers for animation rendering purposes
        current_wrapper.css('width', ball_widths[i - 1]);
    }

    var ball_collection = {
        ball1: new Ball(150, 500, ball_widths[0]),
        ball2: new Ball(115, 500, ball_widths[1]),
        ball3: new Ball(125, 650, ball_widths[2]),
        ball4: new Ball(170, 480, ball_widths[3]),
        ball5: new Ball(222, 520, ball_widths[4])
    }


    // ball and shadow animations -------------------

    $('.ball').each(function () {
        let current_ball = $(this);
        let current_shadow = $(this).next();
        let current_ball_object = ball_collection[$(this).attr('class').split(/\s+/)[1]];

        (function ball_loop() {
            current_ball.animate({
                bottom: current_ball_object.jump_height
            }, current_ball_object.jump_time, "easeOutQuad", function () {
                current_ball.animate({
                    bottom: floor
                }, current_ball_object.jump_time, "easeInQuad", function () {
                    ball_loop();
                })
            })
        })();

        (function shadow_loop() {
            current_shadow.animate({
                width: current_ball_object.shadow_min_width()
            }, current_ball_object.jump_time, "easeOutQuad", function () {
                current_shadow.animate({
                    width: current_ball_object.shadow_max_width()
                }, current_ball_object.jump_time, "easeInQuad", function () {
                    shadow_loop();
                })
            })
        })();

    })

    // wrapper animations --------------------------

    $('.ball-wrapper').each(function (counter) {
        let current_wrapper = $(this);
        let screen_edge = $(window).width() - current_wrapper.children().first().width();
        let transition_time;

        switch (counter) {
            case 0:
                transition_time = 10000;
                break;
            case 1:
                transition_time = 7500;
                break;
            case 2:
                transition_time = 6500;
                break;
            case 3:
                transition_time = 9000;
                break;
            case 4:
                transition_time = 8000;
                break;
            default:
                transition_time = 10000;
        }

        (function wrapper_loop() {
            current_wrapper.animate({
                left: screen_edge
            }, transition_time, "linear", function () {
                current_wrapper.animate({
                    left: 0
                }, transition_time, "linear", function () {
                    wrapper_loop();
                })
            })
        })();

        counter++;
    })


    // enter animation --------------------------
    
    //remove link when there's javascript
    $('.header .btn a').removeAttr("href");

    $('.header .btn').on('click', function () {

        //change button color
        $(this).css({
            'background': '#000',
            'border': '4px solid #000'
        });
        $(this).children('a').css({
            'color': '#FFF'
        })

        //stop animations
        $('.ball-wrapper').stop(true);
        $('.ball').stop(true);
        $('.shadow').stop(true);

        //bring wrapper to center
        $('.ball-wrapper').animate({
            'left': '0',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'width': '100vw'
        }, 1000, 'easeInQuad');

        //bring ball to top
        $('.ball').css("z-index", 75);

        //bring ball to center
        $('.ball').animate({
            'top': '45vh',
            'width': '5vh',
            'height': '5vh'
        }, 1000, 'easeInQuad');

        //enlarge balls
        $('.ball').animate({
            'height': '500vh',
            'width': '500vh',
            'top': '-100vh'
        }, 1000, 'easeInQuad');

        //redirect to home
        setTimeout(function () {
            window.location.href = "http://nikgunawan.com/home.html";
        }, 1400);


    });

});
