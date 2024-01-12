const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menu-item");

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({ duration: 0.8, ease: "power3.out" });

function openMenu() {
  menu.classList.toggle("active");
  document.body.classList.toggle("sidebar-open");

  tl.to(menu, {
    x: menu.classList.contains("active") ? "0" : "100%",
  });

  gsap.fromTo(
    menuItems,
    {
      x: 150,
    },
    {
      x: 0,
      duration: 0.2,
      stagger: 0.05,
      ease: "power4.out",
    }
  );
}

const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content")
const tabContentWrapper = document.querySelector(".tab-content-wrapper");

const shiftTabs = (linkId) => {
  allTabs.forEach((tab, i) => {
      
    if (tab.id.includes(linkId)) {
      allTabs.forEach((tabItem) => { 
        tabItem.style = `transform: translateY(-${i*300}px);`;
      });
    }
  });
}

allLinks.forEach((elem) => {
  elem.addEventListener('click', function() {
    const linkId = elem.id;
    const hrefLinkClick = elem.href;

    allLinks.forEach((link, i) => {
      if (link.href == hrefLinkClick){
        link.classList.add("active");
      } else {
        link.classList.remove('active');
      }
    });

    shiftTabs(linkId);
  });
});

//? handle proper selection for initial load
const currentHash = window.location.hash;

let activeLink = document.querySelector(`.tabs a`);

if (currentHash) {
  const visibleHash = document.getElementById(
    `${currentHash.replace('#', '')}`
  );

  if (visibleHash) {
    activeLink = visibleHash;
  }
}

activeLink.classList.toggle('active');

shiftTabs(activeLink.id);



gsap.to(menuBtn, {
  scrollTrigger: {
    trigger: document.documentElement,
    start: 0,
    end: window.innerHeight,
    onLeave: () => {
      gsap.to(menuBtn, { scale: 1 });
    },
    onEnterBack: () => {
      gsap.to(menuBtn, { scale: 0 });
    },
  },
  duration: 0.25,
  ease: "power3.out",
});

menuBtn.addEventListener("click", openMenu);


const button = document.getElementById('avatar-navbar');
const closeButton = document.querySelector('.close-button');
const navigationMenu = document.querySelector('.navigation__menu');

button.addEventListener('click', () => {
    navigationMenu.classList.remove('none');
    navigationMenu.classList.remove('hide');
});

closeButton.addEventListener('click', () => {
    navigationMenu.classList.add('hide');
});


