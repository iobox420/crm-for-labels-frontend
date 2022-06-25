import { IArtist } from "@/models/IArtist";
import { IAct } from '../IAct'
import { IRelease } from "@/models/IRelease";
import { ITrack } from '../ITrack'
import { IVideoclip } from "@/models/IVideoclip";
import { IAlbum } from "@/models/IAlbum";

export interface ICurrentArtist extends IArtist {
  acts:IAct[]
  albums:IAlbum[]
  tracks:ITrack[]
  releases:IRelease[]
  videoclips:IVideoclip[]
}
