export class HTMLManager {
    private static instance: HTMLManager

    // private to prevent direct instantiation
    private constructor() {}

    // Singleton class
    public static get Instance(): HTMLManager {
        if(!HTMLManager.instance)
            HTMLManager.instance = new HTMLManager()

        return HTMLManager.instance
    }
}