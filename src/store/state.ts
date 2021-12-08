import { STORAGE_KEY } from "../constants";
import { loadObjectFromStorage, saveObjectToStorage } from "../lib/storage";
import { AppState, AppStateModel, modelInstanceToPlain, plainToModelInstance } from "./models";

export function saveStateToStorage(state: AppState): boolean {
  const model = plainToModelInstance(AppStateModel, state);
  if (model.validate() === false) {
    return false;
  }
  const plain = modelInstanceToPlain(model);
  const isSaved = saveObjectToStorage(plain, STORAGE_KEY, [sessionStorage, localStorage]);
  return isSaved;
}

export function loadStateFromStorage(): AppState | null {
  const arbitrary = loadObjectFromStorage(STORAGE_KEY, [sessionStorage, localStorage]);
  if (arbitrary === null || typeof arbitrary !== "object") {
    return null;
  }
  const model = plainToModelInstance(AppStateModel, arbitrary);
  if (model.validate() === false) {
    return null;
  }
  const plain = modelInstanceToPlain(model) as AppState;
  return plain;
}

export const initialState: AppState = modelInstanceToPlain(new AppStateModel()) as AppState;
