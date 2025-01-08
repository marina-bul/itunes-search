import { MediaSearch } from "@/features/MediaSearch/MediaSearch";


export default function Home() {
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full p-8">
        <MediaSearch />
      </div>
    </div>
  );
}
