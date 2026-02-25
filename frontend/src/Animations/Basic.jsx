import { gsap } from "gsap";

export function Slide_up(target = ".slide_up"){
    return gsap.fromTo(target, {
        opacity : 0,
        y : 100
    } , {
        opacity : 1,
        y : 0,
        duration : 1,
        stagger : 0.2,
        ease : "power3.out"
    });
}

export function Slide_down(target = ".slide_down"){
    return gsap.fromTo(target, {
        opacity : 0,
        y : -100
    } , {
        opacity : 1,
        y : 0,
        duration : 1,
        stagger : 0.2,
        ease : "power3.out"
    });
}

export function Slide_left(target = ".slide_left"){
    return gsap.fromTo(target, {
        opacity : 0,
        x : 100
    } , {
        opacity : 1,
        x : 0,
        duration : 1,
        stagger : 0.2,
        ease : "power3.out"
    });
}

export function Slide_right(target = ".slide_right"){
    return gsap.fromTo(target, {
        opacity : 0,
        x : -100
    } , {
        opacity : 1,
        x : 0,
        duration : 1,
        stagger : 0.2,
        ease : "power3.out"
    });
}

export function Fade_in(target = ".fade_in"){
    return gsap.fromTo(target, {
        opacity : 0,
    } , {
        opacity : 1,
        duration : 1,
        stagger : 0.09,
        ease : "power3.out"
    });
}

export function Fade_out(target = ".fade_out"){
    return gsap.fromTo(target, {
        opacity : 1,
    } , {
        opacity : 0,
        duration : 1,
        stagger : 0.2,
        ease : "power3.out"
    });
}
