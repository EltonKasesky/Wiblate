import ThemeColor from "./ThemeColor"

export default function DashboardSettings() {
    return (
        <>
            <section className="box-border flex items-start lg:items-stretch lg:flex-row flex-col w-full lg:h-auto lg:gap-5 gap-3 lg:p-5 p-2">
                <ThemeColor />
            </section>
        </>
    )
}