export default abstract class BaseRepository<T> {
    protected model: T;

    constructor(model: T) {
        this.model = model;
    }
}