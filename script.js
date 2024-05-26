const section = document.querySelector('.section'),
    sectionListItem = section.querySelectorAll('.section_list_item'),
    sectionListItemText = section.querySelectorAll('.section_list_item > h1'),
    sectionListFigure = section.querySelectorAll('.section_list_item_figure'),
    sectionMedia = section.querySelectorAll('.section_media');

const clipPath = {
    top: 'polygon(0 0, 100% 0, 100% 0%, 0 0)',
    full: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    bottom: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
};

gsap.set(sectionMedia, { clipPath: clipPath.top });

const initAnimation = () => {
    gsap.set(sectionListItemText, { y: "100%" });

    const tlText = gsap.timeline({ defaults: { duration: 1.45, ease: 'expo.inOut' } });

    tlText
        .to(sectionListItemText, {
            y: '50%',
            stagger: 0.032,
        })
        .from(
            sectionListFigure,
            {
                width: 0,
                stagger: 0.032,
            },
            0.8
        );

    addEventListeners();
};

const addEventListeners = () => {
    sectionListItem.forEach((item, index) => {
        const images = sectionMedia[index]?.children;

        item.addEventListener('mouseenter', () => {
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    gsap.timeline({ defaults: { duration: 0.64, ease: 'expo.inOut', overwrite: true } })
                        .to(sectionMedia[index], {
                            clipPath: clipPath.full,
                        });
                }
            }

            sectionListItem.forEach((otherItem) => {
                otherItem === item ? otherItem.style.color = 'orange' : otherItem.style.opacity = 0.5;
            });
        });

        item.addEventListener('mouseleave', () => {
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    gsap.timeline({ defaults: { duration: 0.64, ease: 'expo.inOut', overwrite: true } })
                        .to(sectionMedia[index], {
                            clipPath: clipPath.bottom,
                            onComplete: () => {
                                gsap.set(sectionMedia[index], { clipPath: clipPath.top });
                            }
                        });
                }
            }

            sectionListItem.forEach((otherItem) => {
                otherItem.style.color = '#181818';
                otherItem.style.opacity = 1;
            });
        });
    });
};

initAnimation();
