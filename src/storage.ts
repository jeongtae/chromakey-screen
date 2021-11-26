import { validateSync } from "class-validator";
import { plainToClass, classToPlain } from "class-transformer";
import StorageData, { IStorageData } from "./StorageData";

const STORAGE_KEY = "__chromakey-screen";

export function saveToStorage(data: StorageData): boolean {
  const errors = validateSync(data, { forbidUnknownValues: true });
  if (errors.length > 0) {
    console.log(errors[0]);

    return false;
  }

  const plainData = classToPlain(data);
  const json = JSON.stringify(plainData);
  window.localStorage.setItem(STORAGE_KEY, json);
  return true;
}

export function loadFromStorage(): StorageData {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (json === null) {
    return new StorageData();
  }
  try {
    const plainData: IStorageData = JSON.parse(json);
    const data = plainToClass(StorageData, plainData);
    const errors = validateSync(data);
    if (errors.length > 0) {
      return new StorageData();
    }
    return data;
  } catch {
    return new StorageData();
  }
}
