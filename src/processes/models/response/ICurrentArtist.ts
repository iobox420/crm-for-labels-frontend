import { IArtist } from "@/processes/models/IArtist";
import { IAct } from '../IAct'
import { IRelease } from "@/processes/models/IRelease";
import { ITrack } from '../ITrack'
import { IVideoclip } from "@/processes/models/IVideoclip";
import { IAlbum } from "@/processes/models/IAlbum";

export interface ICurrentArtist extends IArtist {
  acts:IAct[]
  albums:IAlbum[]
  tracks:ITrack[]
  releases:IRelease[]
  videoclips:IVideoclip[]
}
