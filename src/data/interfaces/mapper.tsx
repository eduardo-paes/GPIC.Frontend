export interface Mapper<TSource, TDestination> {
    mapFrom(source: TSource): TDestination;
}
