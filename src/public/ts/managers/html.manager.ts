export class HTMLManager {
    private static instance: HTMLManager

    private readonly buttons: { [key: string]: HTMLButtonElement }
    private readonly inputs: { [key: string]: HTMLInputElement }
    private readonly outputs: { [key: string]: HTMLSpanElement }
    private readonly alert: HTMLSpanElement

    // private to prevent direct instantiation
    private constructor() {
        this.alert = document.querySelector("span#alert") as HTMLSpanElement
        this.buttons = {
            "submit": document.querySelector("button#submit-btn") as HTMLButtonElement,
            "reset": document.querySelector("button#reset-btn") as HTMLButtonElement
        }
        this.inputs = {
            "food-quality": document.querySelector("input#food-quality") as HTMLInputElement,
            "service-quality": document.querySelector("input#service-quality") as HTMLInputElement,
            "max-tip": document.querySelector("input#max-tip") as HTMLInputElement,
            "bill": document.querySelector("input#bill") as HTMLInputElement,
        }
        this.outputs = {
            "final-tip-percentage": document.querySelector("span#final-tip-percentage") as HTMLSpanElement,
            "final-bill": document.querySelector("span#final-bill") as HTMLSpanElement,
            "tip-amount": document.querySelector("span#tip-amount") as HTMLSpanElement,
        }

        this.init()
    }

    // Singleton class
    public static get Instance(): HTMLManager {
        if (!HTMLManager.instance)
            HTMLManager.instance = new HTMLManager()

        return HTMLManager.instance
    }

    private startHtml(): void {
        for (let index in this.inputs)
            this.inputs[index].value = "0"
        for (let index in this.outputs)
            this.outputs[index].innerHTML = "..."
        this.alert.innerHTML = ""
    }

    private async submit(): Promise<void> {
        console.log("async submit")
    }

    private addListeners(): void {
        this.buttons["submit"].addEventListener(
            "click", async () => await this.submit()
        )
        this.buttons["reset"].addEventListener(
            "click", () => this.startHtml()
        )
    }

    private init(): void {
        this.startHtml()
        this.addListeners()
    }
}