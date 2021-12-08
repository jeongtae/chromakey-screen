import {
  Expose,
  instanceToPlain,
  plainToInstance,
  ClassConstructor,
  Transform,
  Type,
} from "class-transformer";
import { IsIn, IsInstance, IsInt, Max, Min, ValidateNested, validateSync } from "class-validator";
import chromakeyColors, { ChromakeyColorName } from "../lib/chromakey-colors";
import createMapTransformFn from "create-map-transform-fn";
import * as CONST from "../constants";

type ValidatableModel<T> = T & {
  validate(): boolean;
};

export function plainToModelInstance<T extends ValidatableModel<U>, U extends object>(
  cls: ClassConstructor<T>,
  plain: Record<string, any>
): T {
  return plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });
}

export function modelInstanceToPlain<T extends ValidatableModel<U>, U extends object>(
  model: T
): Record<string, any> {
  return instanceToPlain(model, {
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });
}

export type NonCustomColorType = ChromakeyColorName;
export type ColorType = NonCustomColorType | "custom";

export const validNonCustomColorTypes: readonly NonCustomColorType[] = Object.keys(
  chromakeyColors
) as NonCustomColorType[];
export const validColorTypes: readonly ColorType[] = [...validNonCustomColorTypes, "custom"];

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface AppState {
  /** Type of current color */
  currentColorType: ColorType;

  /** Relative HSL adjustment values for each non-custom colors */
  nonCustomColorHSLAdjustments: Partial<Record<NonCustomColorType, HSL>>;

  /** HSL of custom color */
  customColorHSL: HSL;

  /** Hexadecimal color code of currently chosen color which applied HSL adjustments */
  currentCalculatedColorHex: string;

  /** Represents UI is hidden or not. */
  isUIHidden: boolean;
}

export class HSLAdjustmentModel implements ValidatableModel<HSL> {
  constructor(plain?: HSL) {
    Object.assign(this, plain);
  }

  validate(): boolean {
    const errors = validateSync(this);
    return errors.length === 0;
  }

  @Expose()
  @IsInt()
  @Min(CONST.HSL_ADJ_HUE_MIN)
  @Max(CONST.HSL_ADJ_HUE_MAX)
  hue: number = 0;

  @Expose()
  @IsInt()
  @Min(CONST.HSL_ADJ_SATURATION_MIN)
  @Max(CONST.HSL_ADJ_SATURATION_MAX)
  saturation: number = 0;

  @Expose()
  @IsInt()
  @Min(CONST.HSL_ADJ_LIGHTNESS_MIN)
  @Max(CONST.HSL_ADJ_LIGHTNESS_MAX)
  lightness: number = 0;
}

export class HSLModel implements ValidatableModel<HSL> {
  constructor(plain?: HSL) {
    Object.assign(this, plain);
  }

  validate(): boolean {
    const errors = validateSync(this);
    return errors.length === 0;
  }

  @Expose()
  @IsInt()
  @Min(0)
  @Max(360)
  hue: number = 0;

  @Expose()
  @IsInt()
  @Min(0)
  @Max(100)
  saturation: number = 0;

  @Expose()
  @IsInt()
  @Min(0)
  @Max(100)
  lightness: number = 0;
}

export class AppStateModel implements ValidatableModel<AppState> {
  validate(): boolean {
    const errors = validateSync(this);
    return errors.length === 0;
  }

  @Expose()
  @IsIn(validColorTypes)
  currentColorType: ColorType = "green";

  @Expose()
  @Transform(createMapTransformFn(HSLAdjustmentModel))
  @IsInstance(Map)
  @ValidateNested({ each: true })
  nonCustomColorHSLAdjustments: Map<ChromakeyColorName, HSLAdjustmentModel> = new Map();

  @Expose()
  @Type(() => HSLModel)
  @IsInstance(HSLModel)
  @ValidateNested()
  customColorHSL: HSLModel = new HSLModel({ hue: 330, saturation: 100, lightness: 40 });

  currentCalculatedColorHex: string = "#000000";

  isUIHidden: boolean = false;
}
