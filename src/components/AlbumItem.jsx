import { useNavigate } from "react-router-dom";


const AlbumItem = ({image, name, description,id}) => {
  const navigate = useNavigate();
  return (
    <div
    onClick={()=>navigate(`/albums/${id}`)}
    className="min-w-[18px] p-2 px-3 rounded cursor-pointer hover:gb-[#ffffff26]">
      <img src={image} alt="image" className="rounded w-[150px] h-[150px]"/>
      <p className="font-bold mt-2 mb-1 ">{name}</p>
      <p className="text-slate-200 text-sm">{description}</p>
    </div>
  )
}

export default AlbumItem;