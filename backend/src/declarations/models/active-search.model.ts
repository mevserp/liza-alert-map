import {ActiveSearchState} from "../enums/active-search-state.enum";

export namespace ActiveSearchModel {
  export interface View {
    name: string;
    url: string;
    state: ActiveSearchState;
    coordinates: [number, number];
  }
}
