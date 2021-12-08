/** Store a JS object into the Web API storages in given order of the storages.
 * @param object A JS object to store.
 * @param storageKey A name of the key to store/create/update the object.
 * @param storages An array which containing the Web API Storages. If an error occurs in the middle of the array, the object can not be stored in the rest stores of the array.
 * @returns A boolean value which indicates the object is stored to all given stores.
 */
export function saveObjectToStorage(
  object: any,
  storageKey: string,
  storages: Storage[] = [window.localStorage]
): boolean {
  try {
    const jsonText = JSON.stringify(object);
    storages.forEach((storage) => storage?.setItem(storageKey, jsonText));
    return true;
  } catch {
    return false;
  }
}

/** Load an arbitrary JS object from given Web API storages.
 * @param storageKey The name of the key to retrieve the object.
 * @param storages The array which containing the Web API Storages. Earlier item in the array gets higher priority.
 * @returns An arbitrary JS object from given storages. It may be `null` if there is no object stored with given key.
 */
export function loadObjectFromStorage(
  storageKey: string,
  storages: Storage[] = [window.localStorage]
): number | string | Record<string, any> | null {
  for (const storage of storages) {
    try {
      const json = storage?.getItem(storageKey);
      if (json === null) {
        continue;
      }
      const object = JSON.parse(json);
      return object;
    } catch {
      continue;
    }
  }
  return null;
}
