import { useEffect, useState } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import clsx from 'clsx';
import { navLinks } from '../constants';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32)
        }

        window.addEventListener('scroll', handleScroll);

        return() => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const NavLink = ({ to, label }) => (
        <LinkScroll
        onClick={() => setIsOpen(false)}
        to={to}
        offset={-100}
        spy
        smooth
        activeClass='nav-active'
        className='base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5'>
            {label}
        </LinkScroll>
    )

  return (
    <header className={clsx("fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4", hasScrolled && 'py-2 bg-black-100 backdrop-blur-[8px]')}>
        <div className="container flex h-14 items-center max-lg:px-5">
            <a href="" className="lg:hidden flex-1 cursor-pointer z-2" aria-label="Xora — início">
                <img src="/images/xora.svg" width={115} height={55} alt="Logótipo Xora"/>
            </a>

            <div className={clsx("w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none",)}>
                <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
                    <nav className='max-lg:relative max-lg:z-2 max-lg:my-auto' aria-label="Principal">
                        <ul className="flex max-lg:block max-lg:px-12">
                            <li className="nav-li">
                                <NavLink to={navLinks[0].to} label={navLinks[0].label} />
                                <div className="dot"/>
                                <NavLink to={navLinks[1].to} label={navLinks[1].label} />
                            </li>

                            <li className='nav-logo'>
                                <LinkScroll
                                to='hero'
                                offset={-250}
                                spy
                                smooth
                                className={clsx("max-lg:hidden transition-transform duration-500 cursor-pointer")}
                                aria-label="Voltar ao topo"
                                >
                                    <img src="/images/xora.svg" width={160} height={55} alt="Logótipo Xora" />
                                </LinkScroll>
                            </li>

                            <li className="nav-li">
                                <NavLink to={navLinks[2].to} label={navLinks[2].label} />
                                <div className="dot" />
                                <NavLink to={navLinks[3].to} label={navLinks[3].label} />
                            </li>
                        </ul>
                    </nav>

                    <div className='lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90'>
                        <img src="/images/bg-outlines.svg"
                        width={960}
                        height={380}
                        alt=""
                        aria-hidden="true"
                        className='relative z-2' />
                        <img src="/images/bg-outlines-fill.png"
                        width={960}
                        height={380}
                        alt=""
                        aria-hidden="true"
                        className='absolute inset-0 mix-blend-soft-light opacity-5' />
                    </div>
                </div>
            </div>

            <button
            type="button"
            className="lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(prevState => !prevState)}>
              <img src={`/images/${isOpen ? 'close' : 'magic'}.svg`} alt=""
              className='size-1/2 object-contain'/>
            </button>

        </div>
    </header>
  )
}

export default Header
