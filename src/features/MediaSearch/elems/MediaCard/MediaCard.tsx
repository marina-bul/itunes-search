'use client'

import Image from "next/image";
import Link from "next/link";

import type { FC } from "react";
import type { IMediaItem } from "@/shared/types/media";

interface MediaItemProps {
  mediaItem: IMediaItem
}

export const MediaItem:FC<MediaItemProps> = ({ mediaItem }) => {

  return (
            <li key={mediaItem.id} className="w-[300px] border border-border rounded-[10px] shadow-lg">
              <Link href={mediaItem.url} target="blank" className="flex gap-4 p-2">
                <div className="w-[100px] h-[150px] shrink-0">
                  <Image 
                    src={mediaItem.image} 
                    alt={mediaItem.name} 
                    width={100} 
                    height={100} 
                  />
                </div>
                <div className="w-full">
                  <p className="mb-4 p-1 text-sm text-right border rounded-[8px] bg-[#fcefe9]">{mediaItem.type}</p>
                  <p className="mb-2 font-medium">{mediaItem.artistName}</p>
                  <p className="mb-4 text-sm">{mediaItem.name}</p>
                  
                </div>
              </Link>
            </li>
  );
}