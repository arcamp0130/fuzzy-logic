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
        this.alert.innerHTML = ""

        const foodStr = this.inputs['food-quality'].value
        const serviceStr = this.inputs['service-quality'].value
        const maxTipStr = this.inputs['max-tip'].value
        const billStr = this.inputs['bill'].value || '0'

        // Safety check
        if (foodStr == null || serviceStr == null || maxTipStr == null) {
            this.alert.innerHTML = 'Missing input(s)'
            return
        }

        const food = parseFloat(String(foodStr))
        const service = parseFloat(String(serviceStr))
        const maxTip = parseFloat(String(maxTipStr))
        const bill = parseFloat(String(billStr))

        // Safety check
        if (Number.isNaN(food) || Number.isNaN(service) || Number.isNaN(maxTip) || Number.isNaN(bill)) {
            this.alert.innerHTML = 'All inputs must be numeric'
            return
        }

        // disable submit button
        const submitBtn = this.buttons['submit']
        submitBtn.disabled = true
        const previousLabel = submitBtn.innerText
        submitBtn.innerText = 'Calculating...'

        try {
            // Calling API
            // TODO: safe import of port from .env
            const resp = await fetch(new URL("http://localhost:3030/api/tip/calculate"), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    foodQuality: food,
                    serviceQuality: service,
                    maxTipPercentage: maxTip
                })
            })

            // Extracting JSON from server response
            const json = await resp.json().catch(() => ({}))

            if (!resp.ok) {
                this.alert.innerHTML = json?.message || json?.error || 'Server error'
                return
            }

            // Safety check for json.tip, expecting a number
            const tipPercent = Number(json?.tip ?? 0)

            if (isNaN(tipPercent)) {
                this.alert.innerHTML = 'Invalid tip returned from server'
                return
            }

            // Calculating final payments based on bill
            const tipAmount = (bill * tipPercent) / 100
            const finalBill = bill + tipAmount

            this.outputs['final-tip-percentage'].innerHTML = `${tipPercent.toFixed(2)}%`
            this.outputs['tip-amount'].innerHTML = `$${tipAmount.toFixed(2)}`
            this.outputs['final-bill'].innerHTML = `$${finalBill.toFixed(2)}`
        } catch (err: any) {
            this.alert.innerHTML = err?.message || String(err)
        } finally {
            submitBtn.disabled = false
            submitBtn.innerText = previousLabel
        }
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