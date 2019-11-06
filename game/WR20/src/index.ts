import * as Zdog from "zdog";
import Zfont from 'zfont';

window.onload = () => {

    Zfont.init(Zdog)

    let isSpinning = true;
 
    let illo = new Zdog.Illustration({
        element: '.zdog-canvas',
        zoom: 1,
        dragRotate: true,
        // stop spinning when drag starts
        onDragStart: function() {
            isSpinning = false;
        },
        onDragStop: function() {
            isSpinning = true;
        }
    });

    var heart = new Zdog.Group({
        addTo: illo,
        translate: { z: 30 },
    });
    var heartBack = new Zdog.Group({
        addTo: illo,
        translate: { z: 1 },
    })
    let rect = new Zdog.Rect({
        addTo: heart,
        width: 50,
        height: 50,
        color: '#009AA7',
        fill: true
    });
    rect.copy({
        addTo: heartBack,
        translate: { x: 10 },
        color: '#FCC01D'
    })
    
    let leftHeart = new Zdog.Ellipse({
        addTo: heart,
        width: 50,
        height: 50,
        color: '#009AA7',
        fill: true,
        translate: { x: -25 }
    });
    leftHeart.copy({
        addTo: heartBack,
        translate: { x: -15 },
        color: '#FCC01D'
    })
    let topHeart = new Zdog.Ellipse({
        addTo: heart,
        width: 50,
        height: 50,
        color: '#009AA7',
        fill: true,
        translate: { y: -25 }
    });
    topHeart.copy({
        addTo: heartBack,
        translate: { x: 10, y: -25 },
        color: '#FCC01D'
    })

    const myFont = new Zdog.Font({
        src: './assets/font/Poppins.ttf'
      })
    // font
    const font = new Zdog.Text({
        addTo: heart,
        font: myFont,
        fill: true,
        value: '20',
        fontSize: 52,
        color: '#fff',
        translate: { x: -22, y: 22 },
        rotate: { z: -Zdog.TAU/8 }
    });
    const smallFont = new Zdog.Text({
        addTo: heart,
        font: myFont,
        fill: true,
        value: 'Years',
        fontSize: 14,
        color: '#fff',
        translate: { x: -8, y: 28 },
        rotate: { z: -Zdog.TAU/8 }
    });

    font.copy({
        addTo: heartBack,
        scale: { x: -1},
        translate: { x: 34, y: -20 },
    });
    smallFont.copy({
        addTo: heartBack,
        scale: { x: -1 },
        translate: { x: 32, y: -2}
    })
    
    function animate() {
        illo.rotate.y += isSpinning ? 0.03 : 0;
        illo.updateRenderGraph();
        requestAnimationFrame( animate );
    }
    Zdog.waitForFonts().then(() => {
        // Once the fonts are done, start the animation loop
        animate();
    })

};
