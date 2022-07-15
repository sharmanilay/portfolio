import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import Intro from './Intro';
import ProjectSummary from './ProjectSummary';
import Profile from './Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition, useAppContext } from 'hooks';
import modernTexture from 'assets/modern.png';
import modernTextureLarge from 'assets/modern-large.png';
import modernTexturePlaceholder from 'assets/modern-placeholder.png';
import dttTexture from 'assets/dtt.png';
import dttTextureLarge from 'assets/dtt-large.png';
import dttTexturePlaceholder from 'assets/dtt-placeholder.png';
import mystgangTexture from 'assets/mystgang.png';
import mystgangTextureLarge from 'assets/mystgang-large.png';
import mystgangTexturePlaceholder from 'assets/mystgang-placeholder.png';

const disciplines = [
  'React',
  'Vue',
  'Express',
  'Sass',
  'Redux',
  'Vuex',
  'NextJs',
  'NuxtJs',
  'Ruby',
  'Python',
];

export default function Home(props) {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectSection = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const about = useRef();
  const matrixRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useAppContext();

  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    let theme = JSON.parse(window.localStorage.getItem('theme'));
    let isDark = theme === 'dark';
    if (matrixRef.current && isDark) {
      let matrixRefTop = matrixRef.current.getBoundingClientRect().top;
      let upperBoundary = projectSection.current.getBoundingClientRect().top;
      let lowerBoundary = projectSection.current.getBoundingClientRect().bottom;
      // console.log(themeId)
      setSticky(matrixRefTop <= 540 && lowerBoundary >= 150 && upperBoundary <= 630);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  useEffect(() => {
    const revealSections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      about,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return function cleanUp() {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [
        intro,
        projectOne,
        projectTwo,
        projectThree,
        projectFour,
        projectFive,
        about,
      ];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  useEffect(() => {
    const { themeId } = theme;
    const isDark = themeId === 'dark';
    if (isDark) {
      let matrix = document.getElementById('matrix');
      let ctx = matrix.getContext('2d');

      //making the canvas full screen
      matrix.height = window.innerHeight;
      matrix.width = window.innerWidth;

      //textToShow characters - taken from the unicode charset
      // let textToShow = "React Vue Nuxt Next TypeScript Ruby on Rails Node Express MongoDb SQL"
      let textToShow =
        '01100111 01100101 01110100 00100000 01100001 00100000 01101000 01101111 01100010 01100010 01111001';
      //converting the string into an array of single characters
      textToShow = textToShow.split('');

      let font_size = 17;
      let columns = matrix.width / font_size; //number of columns for the rain
      //an array of drops - one per column
      let drops = [];
      //x below is the x coordinate
      //1 = y co-ordinate of the drop(same for every drop initially)
      for (let x = 0; x < columns; x++) drops[x] = 1;

      //drawing the characters
      function draw() {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrix.width, matrix.height);

        ctx.fillStyle = 'rgba(229, 9, 20, 0.5)'; //red text
        ctx.font = font_size + 'px arial';
        //looping over drops
        for (let i = 0; i < drops.length; i++) {
          //a random textToShow character to print
          let text = textToShow[Math.floor(Math.random() * textToShow.length)];
          //x = i*font_size, y = value of drops[i]*font_size
          ctx.fillText(text, i * font_size, drops[i] * font_size);

          //sending the drop back to the top randomly after it has crossed the screen
          //adding a randomness to the reset to make the drops scattered on the Y axis
          if (drops[i] * font_size > matrix.height && Math.random() > 0.975) drops[i] = 0;

          //incrementing Y coordinate
          drops[i]++;
        }
      }

      setInterval(draw, 50);
    }
  });

  return (
    <Fragment>
      <Helmet
        title="Nilay Sharma | Software Developer"
        meta={[
          {
            name: 'description',
            content:
              'Portfolio of Nilay Sharma  – a full-stack developer, and creator of web & mobile applications',
          },
        ]}
      ></Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <canvas
        className={classNames('matrix-alive', {
          'position-fixed ': sticky,
          'd-none': !sticky,
        })}
        id="matrix"
        ref={matrixRef}
      ></canvas>
      <div ref={projectSection}>
        <ProjectSummary
          id="project-1"
          sectionRef={projectOne}
          visible={visibleSections.includes(projectOne.current)}
          index={1}
          title="What To Watch"
          description="A straightforward recommendation engine to provide movie suggestions on the basis of user type catering the needs of their content consumption habits"
          buttonText="View More"
          buttonLink="https://getwhattowatch.com/"
          techStack={[
            {
              text: 'React',
              src: 'react',
            },
            {
              text: 'Firebase',
              src: 'firebase',
            },
          ]}
          model={{
            type: 'laptop',
            alt: 'View Project',
            textures: [
              {
                src: modernTexture,
                srcSet: `${modernTexture} 800w, ${modernTextureLarge} 1440w`,
                placeholder: modernTexturePlaceholder,
              },
            ],
          }}
        />
        <ProjectSummary
          id="project-2"
          sectionRef={projectTwo}
          visible={visibleSections.includes(projectTwo.current)}
          index={1}
          title="Astropedia"
          description="An interactive portal to display all the asteroids observed by NASA, provide information related to each one and save specific asteroids for future reading"
          buttonText="View More"
          buttonLink="https://astropedia.netlify.app/"
          techStack={[
            {
              text: 'Vue',
              src: 'vue',
            },
            {
              text: 'Firebase',
              src: 'firebase',
            },
            {
              text: 'NASA API',
              src: 'nasa',
            },
          ]}
          model={{
            type: 'laptop',
            alt: 'View Project',
            textures: [
              {
                src: modernTexture,
                srcSet: `${modernTexture} 800w, ${modernTextureLarge} 1440w`,
                placeholder: modernTexturePlaceholder,
              },
            ],
          }}
        />
        <ProjectSummary
          id="project-3"
          sectionRef={projectThree}
          visible={visibleSections.includes(projectThree.current)}
          index={3}
          title="React Easy Bar Chart"
          description="A lightweight bar chart npm library based on canvas to dynamically create bar chart based on data passed as a prop"
          buttonText="View Project"
          buttonLink="https://www.npmjs.com/package/react-easy-bar-chart"
          techStack={[
            {
              text: 'React',
              src: 'react',
            },
            {
              text: 'HTML',
              src: 'html',
            },
            {
              text: 'CSS',
              src: 'css',
            },
          ]}
          model={{
            type: 'laptop',
            alt: 'DevTech Tools Landing Page',
            textures: [
              {
                src: dttTexture,
                srcSet: `${dttTexture} 800w, ${dttTextureLarge} 1440w`,
                placeholder: dttTexturePlaceholder,
              },
            ],
          }}
        />
        <ProjectSummary
          id="project-4"
          sectionRef={projectFour}
          visible={visibleSections.includes(projectFour.current)}
          index={4}
          title="Color-Barn"
          description="A Machine-Learning backed web portal to remove the background of a given selfie and provide custom background based on the prominent colors in the extracted image."
          buttonText="View Project"
          buttonLink="https://github.com/sharmanilay/color-barn"
          techStack={[
            {
              text: 'React',
              src: 'react',
            },
            {
              text: 'Node',
              src: 'node',
            },
            {
              text: 'Python',
              src: 'python',
            },
          ]}
          model={{
            type: 'laptop',
            alt: 'MystGang Website',
            textures: [
              {
                src: mystgangTexture,
                srcSet: `${mystgangTexture} 800w, ${mystgangTextureLarge} 1440w`,
                placeholder: mystgangTexturePlaceholder,
              },
            ],
          }}
        />
        <ProjectSummary
          id="project-5"
          sectionRef={projectFive}
          visible={visibleSections.includes(projectFive.current)}
          index={5}
          title="Comment Plugin"
          description="A Facebook like comment plugin made using pure Vanilla JavaScript without using any external libraries like React and JQuery."
          buttonText="View Project"
          buttonLink="https://github.com/sharmanilay/comment-plugin"
          techStack={[
            {
              text: 'JavaScript',
              src: 'javascript',
            },
            {
              text: 'HTML',
              src: 'html',
            },
            {
              text: 'CSS',
              src: 'css',
            },
          ]}
          model={{
            type: 'laptop',
            alt: 'MystGang Website',
            textures: [
              {
                src: mystgangTexture,
                srcSet: `${mystgangTexture} 800w, ${mystgangTextureLarge} 1440w`,
                placeholder: mystgangTexturePlaceholder,
              },
            ],
          }}
        />
      </div>
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </Fragment>
  );
}
