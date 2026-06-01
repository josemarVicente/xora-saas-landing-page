import { socials } from '../constants/index.jsx'

const Footer = () => {
  return (
    <footer>
        <div className="container py-10">
            <div className="flex w-full max-md:flex-col">
                <div className="small-compact flex flex-1 flex-wrap items-center justify-center gap-5">
                    <div className="flex items-center justify-center sm:ml-auto">
                        <p className="legal-after relative mr-9 text-p5 transition-all duration-500 hover:text-p1">Política de privacidade
                        </p>
                        <p className='text-p5 transition-all duration-500 hover:text-p1'>Termos de utilização
                        </p>
                    </div>
                </div>
                <ul className='flex flex-1 justify-center gap-3 max-md:mt-10 md:justify-end'>
                    {socials.map(({ id, url, icon, title }) => (
                        <li key={id}>
                            <a href={url} className='social-icon' aria-label={title}>
                                <img src={icon} alt="" className='size-1/3 object-contain' />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
