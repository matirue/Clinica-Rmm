import { trigger, transition, style, query, group, animateChild, animate, state } from '@angular/animations';

export const slideInOutAnimation =
// Bienvenido
// MiPerfil
trigger('slideInOutAnimation', [

  // end state styles for route container (host)
  state('*', style({
      // the view covers the whole screen with a semi tranparent background
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // backgroundColor: 'rgba(0, 0, 0, 0.8)'
  })),

  // route 'enter' transition
  transition('void => *', [

      // styles at start of transition
      style({
          top: '100%',

          // start with background opacity set to 0 (invisible)
          // backgroundColor: 'rgba(0, 0, 0, 0)'
      }),

      // animation and styles at end of transition
      animate('1s ease-in-out', style({
          // transition the right position to 0 which slides the content into view
          top: 0,

          // transition the background opacity to 0.8 to fade it in
          // backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }))
  ]),

  // route 'leave' transition
  transition('* => void', [
        style({
          // start with the content positioned off the right of the screen, 
          // -400% is required instead of -100% because the negative position adds to the width of the element
          top: '400%',

          // start with background opacity set to 0 (invisible)
          
      }),
      // animation and styles at end of transition
      animate('1s ease-in-out', style({
          // transition the right position to -400% which slides the content out of view
          position: 'absolute',
          top: 0,

          // transition the background opacity to 0 to fade it out
          // backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
  ])
]);


export const slideTurno =
// Bienvenido
// MiPerfil
trigger('slideTurno', [

  // end state styles for route container (host)
  state('*', style({
      // the view covers the whole screen with a semi tranparent background
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      // backgroundColor: 'rgba(0, 0, 0, 0.8)'
  })),

  // route 'enter' transition
  transition('* =>arriba', [

      // styles at start of transition
      style({
          // start with the content positioned off the right of the screen, 
          // -400% is required instead of -100% because the negative position adds to the width of the element
          top: '400%',

          // start with background opacity set to 0 (invisible)
          // backgroundColor: 'rgba(0, 0, 0, 0)'
      }),

      // animation and styles at end of transition
      animate('1s ease-in-out', style({
          // transition the right position to 0 which slides the content into view
          top: 0,

          // transition the background opacity to 0.8 to fade it in
          // backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }))
  ]),

  // route 'leave' transition
  transition('arriba => *', [
      // animation and styles at end of transition
      animate('1s ease-in-out', style({
          // transition the right position to -400% which slides the content out of view
          position: 'absolute',
          top: '-400%',

          // transition the background opacity to 0 to fade it out
          // backgroundColor: 'rgba(0, 0, 0, 0)'
      }))
  ])
]);