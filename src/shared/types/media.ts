export interface IMediaItem {
  id: number
  name: string
  url: string
  image: string
  artistName: string
  type: string
}

export interface IApiMediaItem {
  wrapperType: string
  artistName: string
  collectionId?: number
  trackId?: number
  artistId?: number
  collectionName?: string
  trackName?: string
  collectionViewUrl?: string
  trackViewUrl?: string
  artistLinkUrl?: string
  artworkUrl100?: string
}
