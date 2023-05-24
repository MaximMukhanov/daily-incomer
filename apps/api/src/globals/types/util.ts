/**
 * @type Modelarize - Превращает тип сгенерированный `PrismaORM` в модель, убирая database specific поля
 * - `updatedAt`
 * - `createdAt`
 * - `id`
 * @param { any } T Сгенерированный `PrismaORM` тип
 */
export type Modelarize<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * @type ExtendObject - Расширяет объект новыми свойствами

 * @param { object } O Расширяемый объект
 * @param { string | number | symbol } K Новый ключ внутри расширяемого объекта
 * @param { unknown } V Данные под новым ключем
 */
export type ExtendObject<
  O extends object,
  K extends string | number | symbol,
  V = unknown
> = O & Record<K, V>;
