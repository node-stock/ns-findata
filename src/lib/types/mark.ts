/**
 * 标记集对象
 *
 * @interface
 */
export interface Marks {
  /**
   * 唯一标识id
   */
  id: number[],
  /**
   * K线时间. unix时间戳 (UTC)
   */
  time: string[],
  /**
   * 颜色
   */
  color: string[],
  /**
   * 标记弹出式文字。 支持HTML
   */
  text: string[],
  /**
   * 印在标记上的文字
   */
  label: string[],
  /**
   * label的文字颜色
   */
  labelFontColor: string[],
  /**
   * 标记的最小尺寸 (diameter, pixels)
   */
  minSize: number[]
}

/**
 * 时间刻度标记
 *
 * @interface
 */
export interface TimescaleMark {
  /**
   * 唯一标识id
   */
  id: number,
  /**
   * K线时间. unix时间戳 (UTC)
   */
  time: number,
  /**
   * 颜色 red|green|blue|yellow| ... | #000000
   */
  color: string,
  /**
   * 印在标记上的文字
   */
  label: string,
  /**
   * 提示信息
   */
  tooltip: string[]
}

/**
 * 时间刻度标记集对象
 *
 * @interface
 */
export interface TimescaleMarks {
  /**
  * 时间刻度标记数组
  */
  [index: number]: TimescaleMark
}
