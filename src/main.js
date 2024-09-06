import './styles/style.css'
import SplitType from 'split-type';
import Matter from 'matter-js';
import Lenis from '@studio-freight/lenis'
import { Application } from '@splinetool/runtime';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
console.log("hello local 0509");


let lenis;


//////////////////////CIRCLE Small center LAST SECTION////////////////////
function initCircleCenterAnimation() {
    const circleCenterElements = document.querySelectorAll('.circle-center');
  
    if (circleCenterElements.length === 0) {
      console.error("Éléments .circle-center non trouvés");
      return;
    }
  
    circleCenterElements.forEach(circleCenter => {
      const paragraphs = circleCenter.querySelectorAll('p');
      
      gsap.set(circleCenter, { 
        width: "0vw", 
        height: "0vw",
        opacity: 0,
        transformOrigin: 'center center'
      });
      
      gsap.set(paragraphs, {
        // display: 'none',
        opacity: 0
      });
  
      ScrollTrigger.create({
        trigger: circleCenter,
        start: "top bottom",
        onEnter: () => {
          gsap.to(circleCenter, {
            opacity: 1,
            width: "25vw",
            height: "25vw",
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.delayedCall(0.2, () => {
                gsap.to(paragraphs, {
                  // display: 'flex',
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1
                });
              });
            }
          });
        },
        // onLeaveBack: () => {
        //   gsap.to(circleCenter, {
        //     width: 0,
        //     height: 0,
        //     duration: 1.5,
        //     ease: "power2.inOut"
        //   });
        // }
      });
    });
  }
  
  window.addEventListener("load", () => {
    initCircleCenterAnimation();
  });


//////////////CIRCLE BIG LAST SECTION////////////////////
function initCircleBigAnimation() {
  const blocIa1Elements = document.querySelectorAll('.bloc-ia-1');
  const circleBigElements = document.querySelectorAll('.circle-big');

  if (blocIa1Elements.length === 0 || circleBigElements.length === 0) {
    console.error("Éléments .bloc-ia-1 ou .circle-big non trouvés");
    return;
  }

  circleBigElements.forEach(circleBig => {
    gsap.set(circleBig, { width: 0, height: 0 });
  });

  function updateCircleSize() {
    const vwSize = 60; 
    const vwInPixels = (vwSize / 100) * window.innerWidth;
    const size = Math.min(vwInPixels, window.innerHeight * 0.8); 

    return size;
  }

  blocIa1Elements.forEach((blocIa1, index) => {
    const circleBig = circleBigElements[index];
    if (!circleBig) return;

    ScrollTrigger.create({
      trigger: blocIa1,
      start: "top 80%",
      onEnter: () => {
        const size = updateCircleSize();
        gsap.to(circleBig, {
          width: size,
          height: size,
          duration: 1.5,
          ease: "power2.inOut"
        });
      },
    //   onLeaveBack: () => {
    //     gsap.to(circleBig, {
    //       width: 0,
    //       height: 0,
    //       duration: 1.5,
    //       ease: "power2.in"
    //     });
    //   }
    });
  });
}

window.addEventListener("load", () => {
  initCircleBigAnimation();
});

window.addEventListener("resize", () => {
  const circleBigElements = document.querySelectorAll('.circle-big');
  const size = updateCircleSize();
  
  circleBigElements.forEach(circleBig => {
    gsap.to(circleBig, {
      width: size,
      height: size,
      duration: 0.4,
      ease: "power3.inOut"
    });
  });
});

function updateCircleSize() {
  const vwSize = 60; 
  const vwInPixels = (vwSize / 100) * window.innerWidth;
  const size = Math.min(vwInPixels, window.innerHeight * 0.8); 

  return size;
}



// /////////Load Spline Scene////////////////////
function loadSplineScene() {
  const canvas = document.getElementById('spline-main');
  if (canvas) {
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/Rg-pHNQg8MqkVqvU/scene.splinecode')
      .then(() => {
        gsap.to(canvas, { opacity: 1, duration: 0.5 });
      })
      .catch((error) => {
        console.error('Erreur lors du chargement de la scène Spline:', error);
      });
  } else {
    console.error("Le canvas #spline-main n'a pas été trouvé dans le DOM");
  }
}

function handleResize() {
  const canvas = document.getElementById('spline-main');
  if (canvas) {
    if (canvas.style.opacity !== '1') {
      loadSplineScene();
    }
  }
}

function handleSplineVisibility() {
  const canvas = document.getElementById('spline-main');
  if (canvas) {
    gsap.set(canvas, { opacity: 1 });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const scrollPercentage = self.progress * 100;
        if (scrollPercentage <= 8) {
          gsap.to(canvas, { 
            opacity: 1, 
            duration: 0.3
          });
        } else {
          gsap.to(canvas, { 
            opacity: 0, 
            duration: 0.3
          });
        }
      }
    });
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', () => {
  handleSplineVisibility();
  loadSplineScene();
});
// function loadSplineOrbScene() {
//     const canvas = document.getElementById('spline-orb');
//     if (canvas) {
//       const spline = new Application(canvas);
//       spline.load('https://prod.spline.design/0GVvjgxfzvQ6jYPp/scene.splinecode')
//         .then(() => {
//           console.log('Scène Spline Orb chargée avec succès');
//           canvas.style.display = 'flex';
//         })
//         .catch((error) => {
//           console.error('Erreur lors du chargement de la scène Spline Orb:', error);
//         });
//     } else {
//       console.error("Le canvas #spline-orb n'a pas été trouvé dans le DOM");
//     }
//   }
  
//   // Attendre que la page soit complètement chargée
//   window.addEventListener('load', () => {
//     // Cacher initialement le canvas Spline
//     const splineCanvas = document.getElementById('spline-main');
//     if (splineCanvas) {
//       splineCanvas.style.opacity = '0';
//       splineCanvas.style.transition = 'opacity 1s ease-in-out';
//     }
    
//     // Cacher initialement le canvas Spline Orb
//     const splineOrbCanvas = document.getElementById('spline-orb');
//     if (splineOrbCanvas) {
//       splineOrbCanvas.style.display = 'none';
//     }
  
    // Charger la scène Spline après 300ms
   
    // Charger la scène Spline Orb après 10 secondes
    // setTimeout(loadSplineOrbScene, 10000);
  
// function handleSplineElements() {
//     const splineMob = document.querySelector('.spline-mob');
//     const splineMain = document.querySelector('.spline-main');
//     const breakpoint = 991;
  
//     function updateSplineElements() {
//       const windowWidth = window.innerWidth;
  
//       if (windowWidth <= breakpoint) {
//         // Mobile view
//         if (!document.body.contains(splineMob)) {
//           document.body.appendChild(splineMob);
//         }
//         if (document.body.contains(splineMain)) {
//           splineMain.remove();
//         }
//       } else {
//         // Desktop view
//         if (document.body.contains(splineMob)) {
//           splineMob.remove();
//         }
//         if (!document.body.contains(splineMain)) {
//           document.body.appendChild(splineMain);
//         }
//       }
//     }
  
//     // Initial call
//     updateSplineElements();
  
//     // Add event listener for window resize
//     window.addEventListener('resize', updateSplineElements);
//   }
  
//   // Call the function when the DOM is fully loaded
//   window.addEventListener('load', handleSplineElements);

//////////////////////MATTERJS PARTNAIRS GRAB AND PLAY//////////////////////
const engine = Matter.Engine.create();
const render = Matter.Render.create({
  element: document.getElementById("matter-container"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "transparent",
    pixelRatio: window.devicePixelRatio,
  },
});

let ground, leftWall, rightWall, ceiling;

function createBoundaries() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  ground = Matter.Bodies.rectangle(
    viewportWidth / 2,
    viewportHeight,
    viewportWidth,
    20,
    { isStatic: true, render: { fillStyle: "transparent" } },
  );

  ceiling = Matter.Bodies.rectangle(viewportWidth / 2, 0, viewportWidth, 20, {
    isStatic: true,
    render: { fillStyle: "transparent" },
  });

  leftWall = Matter.Bodies.rectangle(
    0,
    viewportHeight / 2,
    20,
    viewportHeight,
    { isStatic: true, render: { fillStyle: "transparent" } },
  );

  rightWall = Matter.Bodies.rectangle(
    viewportWidth,
    viewportHeight / 2,
    20,
    viewportHeight,
    { isStatic: true, render: { fillStyle: "transparent" } },
  );

  Matter.World.add(engine.world, [ground, ceiling, leftWall, rightWall]);
}

createBoundaries();

function createOrbs() {
  const orbCount = 18;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const minRadius = Math.min(viewportHeight, viewportWidth) * 0.06;
  const maxRadius = Math.min(viewportHeight, viewportWidth) * 0.12;
  const padding = Math.min(viewportHeight, viewportWidth) * 0.05;

  const imageUrls = [
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a8c350e767a5aaf605a173_twin.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a8195d365ae1b90271d81b_pony.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a3a92b28e9986cc27a49c3_yousignsmall%201.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a683bee6046a85bd0f1e96_voodoo2.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc32d9cc6dffc3af2f7_epsor.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc3662062b2ef6a9637_sensitov.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a681d5a0aef487364aa37e_brigad.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc35ec34d7051fef4bc_voggt.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc3a0aef48736497b5d_mojo.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc33d2c836983ab7de4_veesion.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc3c3484ec606da9930_kard.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc371ccd2ba7cd442c6_upciti.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc34499be2c655a7e6b_gamers.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a67fc3574343d34e62cc5f_regate.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a6868fb1e29646c51f123a_z-petit.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a68299574343d34e6487cc_worklif.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a6868fbd3e635cd90fd002_benebono-petit.webp",
    "https://cdn.prod.website-files.com/667ebf1b9f3deeecd914b073/66a68299b2bff46b633b5c8d_ynergie.webp",
  ];

  const specialLogos = ["yousign", "voodoo2", "mojo", "upciti","epsor" ];
  const specialLogoIndexes = imageUrls.reduce((acc, url, index) => {
    if (specialLogos.some((logo) => url.includes(logo))) {
      acc.push(index);
    }
    return acc;
  }, []);

  const shuffledImageUrls = [...imageUrls].sort(() => Math.random() - 0.5);

  const orbPromises = shuffledImageUrls.map((imageUrl, i) => {
    const isSpecialLogo = specialLogoIndexes.includes(
      imageUrls.indexOf(imageUrl),
    );
    const orbRadius = isSpecialLogo
      ? maxRadius
      : Math.random() * (maxRadius - minRadius) + minRadius;

    return createOrbTexture(orbRadius * 2, imageUrl).then((canvas) => {
      const orb = Matter.Bodies.circle(
        Math.random() * (viewportWidth - padding * 2) + padding,
        Math.random() * (viewportHeight - padding * 2) + padding,
        orbRadius,
        {
          restitution: 0.2,
          friction: 0.1,
          frictionAir: 0.03,
          density: 0.001,
          render: {
            sprite: {
              texture: canvas.toDataURL(),
              xScale: 1,
              yScale: 1,
            },
          },
        },
      );

      return orb;
    });
  });

  return Promise.all(orbPromises).then((orbs) => {
    Matter.World.add(engine.world, orbs);
  });
}

function createOrbTexture(size, imageUrl) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const actualSize = size + 4;
    canvas.width = actualSize;
    canvas.height = actualSize;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(actualSize / 2, actualSize / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = "#f9f4e8";
    ctx.fillRect(0, 0, actualSize, actualSize);

    const gradient = ctx.createRadialGradient(
      actualSize * 0.3,
      actualSize * 0.3,
      0,
      actualSize * 0.5,
      actualSize * 0.5,
      size * 0.5,
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(249, 244, 232, 0.6)");
    gradient.addColorStop(0.8, "rgba(229, 224, 212, 0.8)");
    gradient.addColorStop(1, "rgba(209, 204, 192, 1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, actualSize, actualSize);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      let maxLogoSize = size * 0.7;
      if (imageUrl.includes("benebono-petit") || imageUrl.includes("z-petit")) {
        maxLogoSize *= 0.8;
      }

      let logoWidth, logoHeight;
      if (img.width > img.height) {
        logoWidth = maxLogoSize;
        logoHeight = (img.height / img.width) * maxLogoSize;
      } else {
        logoHeight = maxLogoSize;
        logoWidth = (img.width / img.height) * maxLogoSize;
      }

      const x = (actualSize - logoWidth) / 2;
      const y = (actualSize - logoHeight) / 2;

      ctx.globalAlpha = 0.9;
      ctx.drawImage(img, x, y, logoWidth, logoHeight);
      ctx.globalAlpha = 1.0;

      ctx.strokeStyle = "rgba(229, 224, 212, 1)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(actualSize / 2, actualSize / 2, size / 2 - 1, 0, Math.PI * 2);
      ctx.stroke();

      resolve(canvas);
    };
    img.onerror = function () {
      resolve(canvas);
    };
    img.src = imageUrl;
  });
}

function updateCanvasDimensions() {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  render.canvas.width = viewportWidth;
  render.canvas.height = viewportHeight;
  render.options.width = viewportWidth;
  render.options.height = viewportHeight;

  Matter.World.remove(engine.world, [ground, leftWall, rightWall, ceiling]);
  createBoundaries();

  // Mettre à jour la position des orbes
  const orbs = Matter.Composite.allBodies(engine.world);
  orbs.forEach((orb) => {
    if (orb.label !== "boundary") {
      Matter.Body.setPosition(orb, {
        x: Math.max(
          orb.circleRadius,
          Math.min(viewportWidth - orb.circleRadius, orb.position.x),
        ),
        y: Math.max(
          orb.circleRadius,
          Math.min(viewportHeight - orb.circleRadius, orb.position.y),
        ),
      });
      Matter.Body.setVelocity(orb, { x: 0, y: 0 });
    }
  });
}

window.addEventListener("resize", updateCanvasDimensions);

let isMouseDown = false;
render.canvas.addEventListener("mousedown", () => (isMouseDown = true));
render.canvas.addEventListener("mouseup", () => (isMouseDown = false));

render.canvas.addEventListener("wheel", (event) => {
  if (!isMouseDown) {
    event.preventDefault();
    const scrollAmount = event.deltaY;
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo(0, currentScrollTop + scrollAmount);
  }
});

const matterContainer = document.getElementById("matter-container");

const mouseConstraint = Matter.MouseConstraint.create(engine, {
  element: render.canvas,
  constraint: {
    stiffness: 0.2,
    render: { visible: false },
  },
});

Matter.World.add(engine.world, mouseConstraint);

mouseConstraint.mouse.element.removeEventListener(
  "mousedown",
  mouseConstraint.mouse.mousedown,
);
mouseConstraint.mouse.element.removeEventListener(
  "mouseup",
  mouseConstraint.mouse.mouseup,
);

mouseConstraint.mouse.element.addEventListener("mousedown", (event) => {
  mouseConstraint.mouse.mousedown(event);
  matterContainer.style.cursor = "grabbing";
});

mouseConstraint.mouse.element.addEventListener("mouseup", (event) => {
  mouseConstraint.mouse.mouseup(event);
  matterContainer.style.cursor = "grab";
});

let orbsCreated = false;

function handleScroll() {
  matterContainer.addEventListener("mouseenter", () => {
    matterContainer.style.cursor = "grab";
  });

  matterContainer.addEventListener("mouseleave", () => {
    matterContainer.style.cursor = "auto";
  });

  matterContainer.addEventListener("mousedown", () => {
    matterContainer.style.cursor = "grabbing";
  });

  matterContainer.addEventListener("mouseup", () => {
    matterContainer.style.cursor = "grab";
  });

  const containerRect = matterContainer.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.5; 


  if (containerRect.top <= triggerPoint && !orbsCreated) {
    orbsCreated = true;
    createOrbs().then(() => {
      console.log("Orbes créées lors du scroll");
    });
  }

  if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
    const translateY = Math.min(
      0,
      Math.max(-containerRect.height + window.innerHeight, -window.scrollY),
    );
    Matter.Render.lookAt(render, {
      min: { x: 0, y: -translateY },
      max: { x: window.innerWidth, y: window.innerHeight - translateY },
    });
  }
}

window.addEventListener("scroll", handleScroll);

let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
Matter.Render.run(render);

function updateEngine() {
  Matter.Engine.update(engine);
  requestAnimationFrame(updateEngine);
}
updateEngine();

window.addEventListener("resize", updateCanvasDimensions);

  //////////////////////GSAP FADEUP LINEUP//////////////////////
  function isMob() {
    return window.innerWidth <= 768;
  }
  
  function animateFadeUp(element) {
    if (isMob()) return;
  
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: "30px",
      },
      {
        duration: 0.8,
        opacity: 1,
        y: "0px",
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
      },
    );
  }

  function animateLetterUp(element) {
    if (isMob()) return;
  
    const split = new SplitType(element, { types: "chars" });
  
    gsap.set(split.chars, {
      opacity: 0,
      x: "20px",
      filter: "blur(10px)",
      transformOrigin: "0% 50%",
    });
  
    gsap.to(split.chars, {
      duration: 0.8,
      opacity: 1,
      y: "0px",
      filter: "blur(0px)",
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    });
  }
  
  
  function animateLineUp(element) {
    if (isMob()) return;
  
    const split = new SplitType(element, { types: "lines" });
  
    if (!split.lines || split.lines.length === 0) {
      console.warn("Aucune ligne trouvée pour l'animation LineUp");
      return;
    }
  
    gsap.set(split.lines, {
      opacity: 0,
      y: "5px",
      transformOrigin: "0% 50%",
    });
  
    gsap.to(split.lines, {
      duration: 0.6,
      opacity: 1,
      y: "0px",
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    });
  }

  
  function animateOrbElastic(element) {
    if (isMob()) return;
  
    gsap.from(element, {
      opacity: 0,
      scale: 0.5,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
      scrollTrigger: {
        trigger: element,
        start: "top 60%",
      },
    });
  }
  
  function initAnimations() {
    if (isMob()) return;
  
    document.querySelectorAll(".line-up").forEach(animateLineUp);
    document.querySelectorAll(".orb-elastic").forEach(animateOrbElastic);
    document.querySelectorAll("[fade-up]").forEach(animateFadeUp);
    document.querySelectorAll('.letter-up').forEach(animateLetterUp);

  }
  
  window.addEventListener("load", initAnimations);
  
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isMob()) {
        initAnimations();
      }
    }, 250);
  });







  const section = document.querySelector('.section.is-marquee');
  const marqueeSection = section.querySelector('.marquee-section');
  const marqueeWrappers = marqueeSection.querySelectorAll('.marquee-wrapper');
  
  const verticalScrollHeight = Math.max(window.innerHeight, window.innerHeight * (0.5 + marqueeWrappers.length * 0.1));
  const horizontalScrollHeight = window.innerHeight; // Réduit à 100vh pour le mouvement horizontal
  const totalScrollHeight = verticalScrollHeight + horizontalScrollHeight;
  
  const tlMarquee = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=' + totalScrollHeight,
      pin: true,
      anticipatePin: 1,
      scrub: 1, 
    }
  });
  
  gsap.set(marqueeWrappers, { y: 50, opacity: 0 });
  tlMarquee.to(marqueeWrappers, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    stagger: 0.1,
    ease: 'power2.out'
  }, 0);
  
  tlMarquee.to(marqueeWrappers, {
    x: (index, target) => {
      const direction = index % 2 === 0 ? -1 : 1;
      return direction * (50 + index * 25) + '%'; 
    },
    ease: 'power2.inOut', 
    duration: 1.2, 
    stagger: {
      each: 0.05,
      from: 'start'
    }
  }, verticalScrollHeight / totalScrollHeight);
  
  gsap.set(section, { height: totalScrollHeight + 'px' });


  const galleryWrapper = document.querySelector('.section.gallery-wrapper');
  const galleryContent = galleryWrapper.querySelector('.gallery__content');
  const galleryItems = galleryContent.querySelectorAll('.gallery__item');
  const lastItem = galleryContent.querySelector('.gallery__item.is-last');
  
  function initGalleryAnimation() {
    const scrollTween = gsap.to(galleryContent, {
      x: () => -(galleryContent.scrollWidth - document.documentElement.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: galleryWrapper,
        start: "top top",
        end: () => `+=${galleryContent.scrollWidth - document.documentElement.clientWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  
    galleryItems.forEach((item) => {
      if (!item.classList.contains("is-last")) {
        const content = item.querySelector(".gallery__item-content");
  
        gsap.set(content, { filter: "blur(10px)" });
  
        ScrollTrigger.create({
          trigger: item,
          containerAnimation: scrollTween,
          start: "left center",
          end: "right center",
          onEnter: () => gsap.to(content, { filter: "blur(0px)", duration: 0.5 }),
          onLeave: () => gsap.to(content, { filter: "blur(10px)", duration: 0.5 }),
          onEnterBack: () => gsap.to(content, { filter: "blur(0px)", duration: 0.5 }),
          onLeaveBack: () => gsap.to(content, { filter: "blur(10px)", duration: 0.5 }),
        });
      }
    });
  
    if (lastItem) {
      const orbs = lastItem.querySelectorAll(".orb-horizontal");
  
      ScrollTrigger.create({
        trigger: lastItem,
        containerAnimation: scrollTween,
        start: "left 80%",
        end: "right 20%",
        onEnter: () => {
          scrollTween.timeScale(0.5); 
          animateOrbs(orbs);
        },
        onEnterBack: () => {
          scrollTween.timeScale(0.5); 
          animateOrbs(orbs);
        },
        onLeave: () => {
          scrollTween.timeScale(1); 
        },
        onLeaveBack: () => {
          scrollTween.timeScale(1);
        },
      });
    }
  }
  
  function animateOrbs(orbs) {
    gsap.set(orbs, { scale: 0.2, opacity: 0 });
  
    gsap.to(orbs, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      stagger: {
        amount: 1.2,
        from: "random",
      },
    });
  }
  
  initGalleryAnimation();


  const navbarForm = document.querySelector('.navbar__form');
  const navbarMenu = document.querySelector('.navbar__menu');
  const linkToSections = document.querySelectorAll('.link-to-section');
  const iconMenu = document.querySelector('.icon-menu');
  
  let isMenuOpen = false;
  
  function toggleMenu() {
    if (isMenuOpen) {
      gsap.to(navbarMenu, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          navbarMenu.style.display = 'none';
        }
      });
      gsap.to(linkToSections, {
        y: -30,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in"
      });
      gsap.to(iconMenu, {
        rotateZ: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    } else {
      navbarMenu.style.display = 'block';
      gsap.fromTo(navbarMenu, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          ease: "back.out(1.5)" 
        }
      );
      gsap.fromTo(linkToSections, 
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.2 
        }
      );
      gsap.to(iconMenu, {
        rotateZ: 180,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
    isMenuOpen = !isMenuOpen;
  }
  
  navbarForm.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });
  
  linkToSections.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });
//////////////////////MARQUEE SCROLL EFFECT//////////////////////
// function isMobile() {
//     return window.innerWidth <= 768;
//   }
  
//   function initCombinedAnimations() {
//     const marqueeWrappers = gsap.utils.toArray(".marquee-wrapper");
//     const galleryContent = document.querySelector(".gallery__content");
//     const galleryItems = gsap.utils.toArray(".gallery__item");
//     const lastItem = document.querySelector(".gallery__item.is-last");
  
//     function initMarqueeAnimation() {
//       if (isMobile()) {
//         marqueeWrappers.forEach((wrapper, index) => {
//           const direction = index % 2 === 0 ? -1 : 1;
//           const moveDistance = direction * 50; 
  
//           gsap.from(wrapper, {
//             y: "100%",
//             opacity: 0,
//             ease: "power2.out",
//             duration: 1,
//             scrollTrigger: {
//               trigger: wrapper,
//               start: "top bottom",
//               end: "top center",
//               scrub: true,
//             },
//           });
  
//           gsap.to(wrapper, {
//             x: `${moveDistance}%`,
//             ease: "none",
//             scrollTrigger: {
//               trigger: ".section.is-marquee",
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 1, 
//             },
//           });
//         });
//       } else {
//         let tlMarquee = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".section.is-marquee",
//             start: "top top",
//             end: "+=500%", 
//             pin: true,
//             scrub: 1,
//             anticipatePin: 1,
//           },
//         });
  
//         marqueeWrappers.forEach((wrapper, index) => {
//           tlMarquee.from(
//             wrapper,
//             {
//               y: "100%",
//               opacity: 0,
//               ease: "power2.out",
//               duration: 3,
//             },
//             index * 1.5
//           );
//         });
  
//         tlMarquee.addLabel("startMarquee", ">");
  
//         marqueeWrappers.forEach((wrapper, index) => {
//           const direction = index % 2 === 0 ? -1 : 1;
//           const moveDistance = direction * 50; 
//           tlMarquee.to(
//             wrapper,
//             {
//               x: `${moveDistance}%`,
//               ease: "none",
//               duration: 20, 
//             },
//             "startMarquee"
//           );
//         });
//       }
//     }
  
//     function initGalleryAnimation() {
//       if (isMobile()) return;
  
//       const scrollTween = gsap.to(galleryContent, {
//         x: () => -(galleryContent.scrollWidth - document.documentElement.clientWidth),
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".gallery-wrapper",
//           start: "top top",
//           end: () => `+=${galleryContent.scrollWidth - document.documentElement.clientWidth}`,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });
  
//       galleryItems.forEach((item) => {
//         if (!item.classList.contains("is-last")) {
//           const content = item.querySelector(".gallery__item-content");
  
//           gsap.set(content, { filter: "blur(10px)" });
  
//           ScrollTrigger.create({
//             trigger: item,
//             containerAnimation: scrollTween,
//             start: "left center",
//             end: "right center",
//             onEnter: () => gsap.to(content, { filter: "blur(0px)", duration: 0.5 }),
//             onLeave: () => gsap.to(content, { filter: "blur(10px)", duration: 0.5 }),
//             onEnterBack: () => gsap.to(content, { filter: "blur(0px)", duration: 0.5 }),
//             onLeaveBack: () => gsap.to(content, { filter: "blur(10px)", duration: 0.5 }),
//           });
//         }
//       });
  
//       if (lastItem) {
//         const orbs = lastItem.querySelectorAll(".orb-horizontal");
  
//         ScrollTrigger.create({
//           trigger: lastItem,
//           containerAnimation: scrollTween,
//           start: "left 80%",
//           end: "right 20%",
//           onEnter: () => {
//             scrollTween.timeScale(0.5); // Ralentir le scroll
//             animateOrbs(orbs);
//           },
//           onEnterBack: () => {
//             scrollTween.timeScale(0.5); // Ralentir le scroll
//             animateOrbs(orbs);
//           },
//           onLeave: () => {
//             scrollTween.timeScale(1); // Rétablir la vitesse normale
//           },
//           onLeaveBack: () => {
//             scrollTween.timeScale(1); // Rétablir la vitesse normale
//           },
//         });
//       }
//     }
  
//     function animateOrbs(orbs) {
//       gsap.set(orbs, { scale: 0.2, opacity: 0 });
  
//       gsap.to(orbs, {
//         scale: 1,
//         opacity: 1,
//         duration: 1.5,
//         ease: "elastic.out(1, 0.3)",
//         stagger: {
//           amount: 1.2,
//           from: "random",
//         },
//       });
//     }
  
//     initMarqueeAnimation();
//     initGalleryAnimation();
//   }
  
//   initCombinedAnimations();

  
  
//   window.addEventListener("resize", () => {
//     ScrollTrigger.getAll().forEach((st) => st.kill());
//     gsap.killTweensOf("*");

//     setTimeout(() => {
//       initCombinedAnimations();
//     }, 100);
//   });

  


// // // //////////////////////LOADER///////////////////////
// console.log("Avant DOMContentLoaded");

function disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  
  function enableScroll() {
    document.body.style.overflow = '';
  }
window.addEventListener("load", () => {
    disableScroll();


    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Body = Matter.Body,
      Vector = Matter.Vector;
  
    var engine = Engine.create();
    var loader = document.querySelector(".loader");
    var loaderRect = loader.getBoundingClientRect();
  
    var render = Render.create({
      element: loader,
      engine: engine,
      options: {
        width: loaderRect.width,
        height: loaderRect.height,
        wireframes: false,
        background: "transparent",
      },
    });
  
    var ground = Bodies.rectangle(
      loaderRect.width / 2,
      loaderRect.height,
      loaderRect.width,
      50,
      { isStatic: true, render: { fillStyle: "transparent" } },
    );
    var leftWall = Bodies.rectangle(
      0,
      loaderRect.height / 2,
      50,
      loaderRect.height,
      { isStatic: true, render: { fillStyle: "transparent" } },
    );
    var rightWall = Bodies.rectangle(
      loaderRect.width,
      loaderRect.height / 2,
      50,
      loaderRect.height,
      { isStatic: true, render: { fillStyle: "transparent" } },
    );
  
    var isMobile = window.innerWidth <= 768;
    var baseOrbSize = 12.5 * 16;
    var orbSize = isMobile ? baseOrbSize * 0.35 : baseOrbSize;
    var specialOrbSize = baseOrbSize;
    var numOrbs = isMobile ? 20 : 14;
  
    var orbs = [];
    var specialOrb;
  
    function createSpecialOrb() {

      specialOrb = Bodies.circle(
        loaderRect.width / 2,
        loaderRect.height / 2,
        specialOrbSize / 2,
        {
          isStatic: true,
          restitution: 0.8,
          friction: 0.005,
          render: {
            fillStyle: "#2c2b2b",
            strokeStyle: "#2c2b2b",
            lineWidth: 1,
          },
        },
      );
      specialOrb.isSpecial = true;
    }
  
    var lineWrapper = document.querySelector(".line-wrapper");
    var orbFake = document.querySelector(".orb-fake");
    gsap.set(orbFake, { scale: 0, opacity: 0 });
  
    gsap.fromTo(
      lineWrapper,
      { width: "0%" },
      {
        duration: 2.1,
        width: "100%",
        ease: "power2.out",
        onComplete: function () {
          gsap.fromTo(
            orbFake,
            { scale: 0, opacity: 0 },
            {
              duration: 0.8,
              scale: 1,
              opacity: 1,
              ease: "power1.inOut",
              transformOrigin: "center center",
              onComplete: function () {
                createSpecialOrb();
                Composite.add(engine.world, [
                  ground,
                  leftWall,
                  rightWall,
                  specialOrb,
                ]);
  
                for (var i = 0; i < numOrbs; i++) {
                  var orb = Bodies.circle(
                    Math.random() * (loaderRect.width - orbSize) + orbSize / 2,
                    -orbSize * (i + 1),
                    orbSize / 2,
                    {
                      restitution: 0.9,
                      friction: 0.005,
                      render: {
                        fillStyle: "#2c2b2b",
                        strokeStyle: "#2c2b2b",
                        lineWidth: 1,
                      },
                    },
                  );
                  orbs.push(orb);
                }

                Composite.add(engine.world, orbs);
                var runner = Matter.Runner.create();
                Matter.Runner.run(runner, engine);
                Render.run(render);
  
                setTimeout(expandSpecialOrb, 4500);
              },
            },
          );
        },
      },
    );
  
    function expandSpecialOrb() {
      var center = {
        x: loaderRect.width / 2,
        y: loaderRect.height / 2,
      };
  
      var maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
  
      gsap.to(specialOrb, {
        duration: 1.1,
        circleRadius: maxRadius,
        ease: "power2.inOut",
        onUpdate: function () {
          Matter.Body.setVertices(
            specialOrb,
            Matter.Vertices.create(
              Matter.Bodies.circle(center.x, center.y, specialOrb.circleRadius)
                .vertices,
            ),
          );
        },
        onComplete: function () {
          Render.stop(render);
          Engine.clear(engine);
          gsap.to(loader, {
            duration: 0.4,
            opacity: 0,
            onComplete: function () {
              loader.style.display = "none";
              enableScroll();
            },
          });
        },
      });
    }
  
    function animate() {
      requestAnimationFrame(animate);
      Engine.update(engine);
    }
    requestAnimationFrame(animate);
  });




//////////////////////CALL FORM ON CLICK//////////////////////
window.addEventListener("load", () => {
    const callForms = document.querySelectorAll(".call-form");
    const overlayBlur = document.querySelector(".overlay-blur");
    const formCircle = document.querySelector(".form-circle");
    const formContact = document.querySelector(".form-contact");
    let isOpen = false;
  
    gsap.set(overlayBlur, {
      opacity: 0,
      display: "none",
    });
  
    gsap.set(formCircle, {
      opacity: 0,
      scale: 0.2,
    });
  
    gsap.set(formContact, {
      opacity: 0,
    });
  
    function showOverlay() {
      if (isOpen) return;
      isOpen = true;
  
      overlayBlur.style.display = "flex";
      gsap.to(overlayBlur, {
        duration: 0.6,
        opacity: 1,
        ease: "power3.out",
        onComplete: showFormCircle,
      });
    }
    function showFormCircle() {
      gsap.timeline()
        .to(formCircle, {
          duration: 0.6,
          opacity: 1.3,
          scale: 1,
          ease: "elastic.out(1, 0.4)",
        })
        .to(formCircle, {
          duration: 0.125, 
          scale: 1,
          ease: "none",
        })
        .to(formCircle, {
          duration: 0.8, 
          scale: 10,
          ease: "power3.inOut",
          onComplete: showFormContact,
        })
        .to(formCircle, {
          duration: 0.8, 
          scale: 10,
          ease: "power3.inOut",
        })
        .add(showFormContact, "-=0.4");
    }
    function showFormContact() {
      gsap.to(formContact, {
        duration: 0.6,
        opacity: 1,
        ease: "power2.out",
      });
    }
  
    function hideOverlay() {
      if (!isOpen) return;
      isOpen = false;
  
      gsap.to(overlayBlur, {
        duration: 0.6,
        opacity: 0,
        ease: "power3.in",
        onComplete: () => {
          overlayBlur.style.display = "none";
          gsap.set(formCircle, { opacity: 0, scale: 0.2 });
          gsap.set(formContact, { opacity: 0 });
        },
      });
    }
  
    function toggleOverlay() {
      if (isOpen) {
        hideOverlay();
      } else {
        showOverlay();
      }
    }
  
    callForms.forEach((callForm) => {
      callForm.addEventListener("click", toggleOverlay);
    });
  
    overlayBlur.addEventListener("click", (event) => {
      if (event.target === overlayBlur) {
        hideOverlay();
      }
    });
  });
  
//////////////////////BLUR ON JOB HOVER//////////////////////
window.addEventListener("load", () => {
    const jobBlocks = document.querySelectorAll(".job__block");
  
    jobBlocks.forEach((block) => {
      block.style.transition = "filter 0.4s ease";
  
      block.addEventListener("mouseenter", () => {
        jobBlocks.forEach((otherBlock) => {
          if (otherBlock !== block) {
            otherBlock.style.filter = "blur(1.3px)";
          }
        });
      });
  
      block.addEventListener("mouseleave", () => {
        jobBlocks.forEach((otherBlock) => {
          otherBlock.style.filter = "none";
        });
      });
    });
  });


// //////////////////////NAVBAR LOGO COLOR CHANGE ON SCROLL///////////////////////
// const imgNav = document.querySelector(".img-nav");
// const bgWhiteElements = document.querySelectorAll(".bg-white");

// const DARK_COLOR = "black";
// const LIGHT_COLOR = "#F9F4E8";

// function updateImgNavColor() {
//   const imgNavRect = imgNav.getBoundingClientRect();
//   let isOverWhite = false;

//   bgWhiteElements.forEach((element) => {
//     const elementRect = element.getBoundingClientRect();
//     if (
//       imgNavRect.top < elementRect.bottom &&
//       imgNavRect.bottom > elementRect.top &&
//       imgNavRect.left < elementRect.right &&
//       imgNavRect.right > elementRect.left
//     ) {
//       isOverWhite = true;
//     }
//   });

//   if (isOverWhite) {
//     imgNav.style.color = DARK_COLOR;
//   } else {
//     imgNav.style.color = LIGHT_COLOR;
//   }
// }

// updateImgNavColor();

// window.addEventListener("scroll", updateImgNavColor);
// window.addEventListener("resize", updateImgNavColor);


//////////////////////ORBS SHOW ON HOVER PARTNAIRS//////////////////////
const blocks = document.querySelectorAll(".block");
const orb = document.querySelector(".orb-cursor");
const orbLogos = orb.querySelectorAll(".orb-logo");
let currentLogo = null;
let currentAnimation = null;

gsap.set(orbLogos, { opacity: 0, xPercent: 100 });

blocks.forEach((block) => {
  const desc = block.querySelector(".desc");
  const name = block.querySelector(".name");
  const textLink2 = block.querySelector(".text-link-2");

  gsap.set(desc, { height: 0, overflow: "hidden" });

  const mask = document.createElement("div");
  mask.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, transparent 0%, #1f1f1f 0%);
    pointer-events: none;
  `;
  desc.style.position = "relative";
  desc.appendChild(mask);

  const tl = gsap.timeline({ paused: true });

  tl.to(block, {
    height: "20rem",
    duration: 1,
    ease: "power2.out",
  })
    .to(
      desc,
      {
        height: "auto",
        duration: 1,
        ease: "power2.out",
      },
      0,
    )
    .fromTo(
      mask,
      {
        background:
          "linear-gradient(to bottom right, transparent 0%, #1f1f1f 0%)",
      },
      {
        duration: 0.8,
        ease: "power2.inOut",
        background:
          "linear-gradient(to bottom right, transparent 100%, #1f1f1f 100%)",
      },
      0,
    );

  block.addEventListener("mouseenter", () => {
    tl.play();
    showMatchingLogo(name.dataset.name);
  });

  block.addEventListener("mouseleave", () => {
    tl.reverse();
  });

  if (textLink2) {
    textLink2.addEventListener("mouseenter", () => {
      gsap.to(orb, { opacity: 0.2, duration: 0.3 });
    });
    textLink2.addEventListener("mouseleave", () => {
      gsap.to(orb, { opacity: 1, duration: 0.3 });
    });
  }

  desc.addEventListener("mouseenter", () => {
    gsap.to(orb, { opacity: 0.2, duration: 0.3 });
  });
  desc.addEventListener("mouseleave", () => {
    gsap.to(orb, { opacity: 1, duration: 0.3 });
  });
});

function showMatchingLogo(name) {
  const newLogo = Array.from(orbLogos).find(
    (logo) => logo.dataset.name.toLowerCase() === name.toLowerCase(),
  );

  if (newLogo !== currentLogo) {
    if (currentAnimation) {
      currentAnimation.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        currentAnimation = null;
      },
    });

    orbLogos.forEach((logo) => {
      if (logo !== newLogo) {
        tl.to(
          logo,
          {
            xPercent: -100,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          0,
        );
      }
    });

    tl.fromTo(
      newLogo,
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      0.1,
    );

    currentLogo = newLogo;
    currentAnimation = tl;
  }
}


//////////////////////PREFOOTER TEXT BLUR TO 0//////////////////////
window.addEventListener("load", () => {
    const tutorialsTitle = document.querySelector(".tutorials__title");
    const accentElements = tutorialsTitle.querySelectorAll(".is--accent");
  
    function setupAnimation() {
        if (window.innerWidth > 768) {
            gsap.set(accentElements, {
                filter: "blur(10px)",
                opacity: 0,
                y: 40,
            });
        
            ScrollTrigger.create({
                trigger: tutorialsTitle,
                start: "top bottom",
                end: "bottom top", 
                scrub: 1,
                markers: false,
                onUpdate: (self) => {
                    const progress = self.progress;
                    accentElements.forEach((element, index) => {
                        const elementProgress = Math.min(
                            1,
                            Math.max(0, (progress - index * 0.1) / 0.2),
                        );
                        gsap.to(element, {
                            filter: `blur(${10 - 10 * elementProgress}px)`,
                            opacity: 0.5 + 0.5 * elementProgress,
                            y: 40 - 40 * elementProgress,
                            duration: 0.1,
                            overwrite: "auto",
                        });
                    });
            
                    if (progress > 0.8) {
                        accentElements.forEach((element) => {
                            gsap.to(element, {
                                filter: "blur(0px)",
                                opacity: 1,
                                y: 0,
                                duration: 0.1,
                                overwrite: "auto",
                            });
                        });
                    }
                },
                onLeave: () => {
                    accentElements.forEach((element) => {
                        gsap.to(element, {
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                            duration: 0.1,
                        });
                    });
                },
                onEnterBack: () => {
                    accentElements.forEach((element, index) => {
                        gsap.to(element, {
                            filter: "blur(10px)",
                            opacity: 0,
                            y: 40,
                            duration: 0.3,
                            delay: index * 0.1,
                        });
                    });
                },
            });
        } else {
            gsap.set(accentElements, {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
            });
        }
    }

    setupAnimation();

    window.addEventListener("resize", setupAnimation);
});
  
//////////////////////PUSH CARD INTO GRID TEAM//////////////////////
$(document).ready(function () {
    const teamWrapper = $(".team__wrapper");
    const teamCard = $(".team__job.is-push");
  
    function handleTeamCard() {
      if (teamCard.length > 0) {
        teamWrapper.append(teamCard);
      } else {
        const newTeamCard = $("<div>").addClass("team__job is-push");
  
        const imageElement = $("<div>").addClass("team__card-image");
        const imageImg = $("<img>").attr("src", "chemin/vers/limage.jpg").attr("alt", "Description de l'image");
        imageElement.append(imageImg);
        newTeamCard.append(imageElement);
  
        const contentElement = $("<div>").addClass("team__card-content");
        const nameElement = $("<h3>").text("Nom du membre de l'équipe");
        const roleElement = $("<p>").text("Rôle ou description");
        contentElement.append(nameElement, roleElement);
        newTeamCard.append(contentElement);
  
        teamWrapper.append(newTeamCard);
      }
    }
  
    handleTeamCard();
  });




//////////////////////LENIS SCROLL//////////////////////
window.addEventListener("load", () => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);

});