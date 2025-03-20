const AboutPage = () => {
  return (
    <div className='bg-slate-300 p-4 lg:w-4/5 mx-auto mt-10 ms: w-ms'>
      <div className="">
        <h1 className="text-center text-2xl">Sobre nosotros</h1>
        <p className="text-center text-slate-500">Bienvenidos a  My Learning !!</p>
        <p className="lg:w-[80%] mx-auto mt-4 p-4 bg-white text-justify">En un mundo en constante cambio, creemos que el aprendizaje no debe detenerse. Fundada en él 2024, nuestra misión es brindar acceso a educación de calidad desde la comodidad de tu hogar, garantizando un acompañamiento y una cantidad de estrategias para tu aprendizaje. Ofrecemos una amplia variedad de cursos virtuales diseñados para potenciar y crear nuevas habilidades y llevar tu conocimiento a otro nivel.</p>
      </div>
      <div>
        <h2 className="text-center text-xl mt-4">Nuestros valores</h2>
        <div className="flex flex-col lg:flex-row justify-evenly mt-4 gap-4">
          <div className="bg-white p-4">
            <p className="text-center text-lg border-b">Compromiso</p>
            <p className="mt-2 text-justify">Nos aseguramos de que cada curso sea impartido por expertos en la materia para garantizar que el estudiante adquiera un conocimiento avanzado.</p>
          </div>
          <div className="bg-white p-4">
            <p className="text-center text-lg border-b">Accesibilidad</p>
            <p className="mt-2 text-justify">Creemos que el conocimiento debe ser accesible para todos, independientemente de su ubicación.</p>
          </div>
          <div className="bg-white p-4">
            <p className="text-center text-lg border-b">Innovación</p>
            <p className="mt-2 text-justify">Nos mantenemos al día con las últimas tendencias educativas y tecnológicas para ofrecerte la mejor experiencia de aprendizaje.</p>
          </div>
        </div>
      </div>
      <div className="w-full border mt-4 mb-4"></div>
      <div className="flex flex-col lg:flex-row justify-evenly mt-4 gap-4">
        <div className="bg-white p-4">
          <p className="text-center text-lg border-b">Nuestro Equipo</p>
          <p className="mt-2 text-justify">Contamos con un equipo apasionado, desde educadores hasta diseñadores de contenido, que trabajan incansablemente para ofrecerte cursos interactivos y efectivos. Cada miembro aporta una parte fundamental para tu aprendizaje, creemos que la unión hace la fuerza para alcanzar grandes objetivos y el objetivo es ayudarte.</p>
        </div>
        <div className="bg-white p-4">
          <p className="text-center text-lg border-b">Únete a Nuestra Comunidad</p>
          <p className="mt-2 text-justify">Te invitamos a explorar nuestros cursos y descubrir cómo podemos ayudarte a alcanzar tus objetivos. Ya sea que estés buscando avanzar en tu carrera, aprender una nueva habilidad o simplemente enriquecer tu conocimiento, en My Learning encontrarás el curso perfecto para ti.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage