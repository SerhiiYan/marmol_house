const ProjectCard = ({ project, onClick }) => {
    return (
      <div
        onClick={() => onClick(project)}
        className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
      >
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{project.title} <span className="text-rose-600">{project.price}</span></h3>
        </div>
      </div>
    )
  }
  
  export default ProjectCard
  