

const SongItem = ({name , image , description , id}) => {
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff25]">
          <img src={image} alt="image" className="rounded w-[150px] h-[150px]"/>
     <p className="font-bold mt-2 mb-1">{name}</p>
     <p className="font-slate-200 text-sm">{description}</p>
    </div>
  )
}

export default SongItem;