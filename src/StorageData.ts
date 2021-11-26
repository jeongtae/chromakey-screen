import { IsHexColor, IsInt, Min, Max } from "class-validator";

export interface IStorageData {
  color: string;
  hue: number;
  saturation: number;
  brightness: number;
}

const $StorageData = Symbol();
export default class StorageData implements IStorageData {
  private readonly [$StorageData]: never;

  constructor(props?: IStorageData) {
    Object.assign(this, props);
  }

  @IsHexColor()
  color: string = "#0f0";

  static readonly minHue = -5;
  static readonly maxHue = 5;
  @IsInt()
  @Min(StorageData.minHue)
  @Max(StorageData.maxHue)
  hue: number = 0;

  static readonly minSaturation = -10;
  static readonly maxSaturation = 0;
  @IsInt()
  @Min(StorageData.minSaturation)
  @Max(StorageData.maxSaturation)
  saturation: number = 0;

  static readonly minBrightness = -10;
  static readonly maxBrightness = 0;
  @IsInt()
  @Min(StorageData.minBrightness)
  @Max(StorageData.maxBrightness)
  brightness: number = 0;
}
